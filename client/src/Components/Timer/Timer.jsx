import React, { Component, useState, useEffect } from "react";
import StopWatch from "../../assets/stopwatch.svg";
import "../../css/Timer.css";
import IconsDropdown from "../ACTQuestions/icons_dropdown";
import axios from 'axios';
import ReviewStage from '../ReviewStage/review_stage';
import { onValue, ref, set } from "firebase/database";
import { realtimeDb } from "../../firebase";
import { serverTimestamp } from "firebase/database";


class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      isRunning: false,
      isModalOpen: false,
      timerFinished: false,
      currentQuestion: "",
      selectedValue: "1",
      review: false,
    };

    this.timerInterval = null;
    this.apiUrl = process.env.REACT_APP_API_URL; 
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  componentDidMount() {
    this.setupDatabaseListener();
  }

  setupDatabaseListener = () => {
    const { projectId } = this.props;

    var serverTimeOffset = 0;
    const offsetRef = ref(realtimeDb, ".info/serverTimeOffset");
    onValue(offsetRef, (snap) => {
      serverTimeOffset = snap.val();
    });
    const timerRef = ref(realtimeDb, `Projects/${projectId}/timer`);
    onValue(timerRef, (snapshot) => {
      const seconds = snapshot.val().seconds;
      const minutes = snapshot.val().minutes;
      const startAt = snapshot.val().startAt;
      const totalSeconds = seconds + (minutes * 60);
      const { adminAccess } = this.props;

      const timeLeft = (totalSeconds * 1000) - (Date.now() - startAt - serverTimeOffset);

      if( !adminAccess && timeLeft>0 && this.timerInterval == null){
        this.timerInterval = setInterval(() => {
          const timeLeft = (totalSeconds * 1000) - (Date.now() - startAt - serverTimeOffset);
          if (timeLeft < 0) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
          } else {
            if(this.timerInterval){
              this.setState({ minutes: Math.floor(timeLeft / 60000), seconds: Math.floor((timeLeft % 60000) / 1000) });
            }else{
              clearInterval(this.timerInterval);
              this.timerInterval = null;
              this.setState({ minutes: 0, seconds:0});
            }
            
          }
        }, 1000);
      } else if (!adminAccess && timeLeft < 0) {
        // Check if the timer interval is running
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.setState({ minutes: 0, seconds:0});
        } else {
          clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.setState({ minutes: 0, seconds:0});
        }
      }
      


    });
  }

  startTimer = () => {
    const { projectId } = this.props;
    const { adminAccess } = this.props;
    if (!this.state.isRunning) {
      this.setState({ isRunning: true }, () => {
        this.timerInterval = setInterval(this.tick, 1000);

        if(adminAccess){
          const timerRef = ref(realtimeDb, `Projects/${projectId}/timer`);
          set(timerRef,{
            startAt: serverTimestamp(),
            minutes: this.state.minutes,
            seconds: this.state.seconds
          });
        

          // API call to update and activate the question
          axios.post(this.apiUrl + `/api/questionTypeUpdate`, {
            text: this.state.currentQuestion,
            projectId: projectId,
            type: this.state.selectedValue,
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error updating and activating the question:', error);
          });
        }
      });
    }
    this.setState({ isModalOpen: false });
  };

  stopTimer = () => {
    // if (this.state.isRunning) {
      clearInterval(this.timerInterval);
      this.timerInterval = null; // Clear the reference to the interval
      this.setState({ isRunning: false });
    // }
  };
  
  resetTimer = () => {
    const { projectId, adminAccess } = this.props;

    this.stopTimer();
    this.setState({ minutes: 0, seconds: 0, currentQuestion:"" });
  
    if (adminAccess) {
      // Only the admin should update the timer in the database
      const timerRef = ref(realtimeDb, `Projects/${projectId}/timer`);
      set(timerRef, {
        startAt: serverTimestamp(),
        minutes: 0,
        seconds: 0
      });
    }
  };

  tick = () => {
    if (this.state.seconds > 0) {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    } else if (this.state.minutes > 0) {
      this.setState((prevState) => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }));
    } else {
      // Timer has finished
      this.stopTimer();
      this.setState({ timerFinished: true }); // Set a flag for timer finished
    }
  };

  onAnimationEnd = () => {
    // This function will be called when the animation ends
    this.setState({ timerFinished: true }, () => {
      // Set a timeout to reset the timerFinished state after a delay
      setTimeout(() => {
        this.setState({ timerFinished: false });
        // console.log("state removed");
      }, 100);
    });
  };

  handleTimeChange = (event) => {
    const inputTime = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    let newMinutes = 0;
    let newSeconds = parseInt(inputTime, 10);

    if (inputTime.length >= 2) {
      newMinutes = parseInt(inputTime.slice(0, -2), 10);
      newSeconds = parseInt(inputTime.slice(-2), 10);
    }

    this.setState({ minutes: newMinutes, seconds: newSeconds });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  reviewMatrix = () => {
    this.setState({review: true})
    this.closeModal();
  }

  render() {
    const { minutes, seconds, isRunning, isModalOpen, timerFinished, currentQuestion, selectedValue, review} =
      this.state;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    const { adminAccess } = this.props;

    return (
      adminAccess ? (
      <div
        className={`timerContainer ${timerFinished ? "timerFinished" : ""}`}
        onAnimationEnd={this.onAnimationEnd}
      >
        <img src={StopWatch} className="timerIcon"></img>
        <div
          onClick={this.openModal}
          className="timer"
          onAnimationEnd={this.onAnimationEnd}
        >
          {formattedTime}
        </div>

        {isModalOpen && (
          <div className="timerModal">
            <div className="timerWrap">
              <IconsDropdown selectedValue={this.state.selectedValue} onSelect={(newValue) => this.setState({ selectedValue: newValue })}/>
              <textarea
                type="text"
                placeholder="Question Text"
                value={this.state.currentQuestion}
                onChange={(e) => this.setState({ currentQuestion: e.target.value })}
                className="questionInput"
              />
              <input
                type="text"
                placeholder="mm:ss"
                value={formattedTime}
                onChange={this.handleTimeChange}
                className="timerInput"
              />
              <button
                onClick={this.startTimer}
                disabled={isRunning}
                className="timerButton"
              >
                Start
              </button>
              <button onClick={this.closeModal} className="timerButton">
                Close
              </button>
              <button onClick={this.resetTimer} className="timerButton">
                Reset
              </button>
              <button onClick={this.reviewMatrix} className="timerButton">
                Review Matrix
              </button>
            </div>
          </div>
        )}
        {review && <ReviewStage />}
      </div>
      ) : (
        <div
        className={`timerContainer ${timerFinished ? "timerFinished" : ""}`}
        onAnimationEnd={this.onAnimationEnd}
        style={{pointerEvents:"none"}}
      >
        <img src={StopWatch} className="timerIcon"></img>
        <div
          onClick={this.openModal}
          className="timer"
          onAnimationEnd={this.onAnimationEnd}
        >
          {formattedTime}
        </div>

        {isModalOpen && (
          <div className="timerModal">
            <div className="timerWrap">
              <IconsDropdown selectedValue={this.state.selectedValue} onSelect={(newValue) => this.setState({ selectedValue: newValue })}/>
              <textarea
                type="text"
                placeholder="Question Text"
                value={this.state.currentQuestion}
                onChange={(e) => this.setState({ currentQuestion: e.target.value })}
                className="questionInput"
              />
              <input
                type="text"
                placeholder="mm:ss"
                value={formattedTime}
                onChange={this.handleTimeChange}
                className="timerInput"
              />
              <button
                onClick={this.startTimer}
                disabled={isRunning}
                className="timerButton"
              >
                Start
              </button>
              <button onClick={this.closeModal} className="timerButton">
                Close
              </button>
              <button onClick={this.resetTimer} className="timerButton">
                Reset
              </button>
              <button onClick={this.reviewMatrix} className="timerButton">
                Review Matrix
              </button>
            </div>
          </div>
        )}
        {review && <ReviewStage />}
      </div>
      )
    );
  }
}

export default Timer;
