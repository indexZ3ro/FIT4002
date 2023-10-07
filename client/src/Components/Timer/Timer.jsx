import React, { Component, useState } from "react";
import StopWatch from "../../assets/stopwatch.svg";
import "../../css/Timer.css";
import IconsDropdown from "../ACTQuestions/icons_dropdown";

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
      selectedValue: "2",
    };

    this.timerInterval = null;
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true }, () => {
        this.timerInterval = setInterval(this.tick, 1000);
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

  render() {
    const { minutes, seconds, isRunning, isModalOpen, timerFinished } =
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Timer;
