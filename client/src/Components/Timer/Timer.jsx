import React, { Component, useState, useEffect } from "react";
import StopWatch from "../../assets/stopwatch.svg";
import "../../css/Timer.css";
import IconsDropdown from "../ACTQuestions/icons_dropdown";
import axios from 'axios';
import ReviewStage from '../ReviewStage/review_stage';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../../firebase'; 


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
      reviewId: "",
    };
    this.timerInterval = null;
    this.apiUrl = process.env.REACT_APP_API_URL; 
  }

  // Function to handle the Firebase Realtime Database listener
  handleFirebaseListener = () => {
    const { projectId, userID } = this.props;
    const reviewsRef = ref(realtimeDb, `Projects/${projectId}/Reviews`);
    const userScoresRef = ref(realtimeDb, `Projects/${projectId}/users/${userID}/scores`);

    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const reviews = [];
      snapshot.forEach((childSnapshot) => {
        const reviewId = childSnapshot.key;
        const reviewData = childSnapshot.val();
        reviews.push({ ...reviewData, id: reviewId });
      });

      // Find the latest review
      const latestReview = reviews.reduce((latest, review) => {
        if (!latest || review.date_time > latest.date_time) {
          return review;
        }
        return latest;
      }, null);

      // Check if the current user's score is null
      const userScoreIsNull = latestReview && latestReview.scores && latestReview.scores[userID] === "null";
      latestReview ? this.setState({ review: userScoreIsNull, reviewId:latestReview.id}) : latestReview
      console.log("latest:", latestReview);
      // Set the latest review in the state
    });

    // Store the unsubscribe function in an instance variable to use it in componentWillUnmount
    this.unsubscribeFirebaseListener = unsubscribe;
  }

  // Call the Firebase listener setup in componentDidMount
  componentDidMount() {
    setTimeout(() => {
      this.handleFirebaseListener();
    }, 1000);
  }

  // Unsubscribe from the Firebase listener in componentWillUnmount
  componentWillUnmount() {
    if (this.unsubscribeFirebaseListener) {
      this.unsubscribeFirebaseListener();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    const { projectId } = this.props;
    if (!this.state.isRunning) {
      this.setState({ isRunning: true }, () => {
        this.timerInterval = setInterval(this.tick, 1000);

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
      });
    }
    this.setState({ isModalOpen: false });
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.timerInterval);
      this.setState({ isRunning: false });
    }
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ minutes: 0, seconds: 0, currentQuestion:"" });
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
        console.log("state removed");
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

  reviewMatrix = async () => {
    // this.setState({review: true})
    this.closeModal();

    try {
      const projectId = this.props.projectId;
      const date_time = new Date().toISOString();

      // add a review
      const response = await axios.post(this.apiUrl + '/api/add-review', { projectId, date_time });
      this.setState({ reviewId: response.data.reviewId });
      console.log('Review added successfully. Review ID:', response.data.reviewId);

    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  render() {
    const { minutes, seconds, isRunning, isModalOpen, timerFinished, currentQuestion, selectedValue, review, reviewId} =
      this.state;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    return (
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
        {review && <ReviewStage reviewId={reviewId} projectId={this.props.projectId} userID={this.props.userID} />}
      </div>
    );
  }
}

export default Timer;
