import React, { useState, useEffect, useRef } from "react";
import "../../css/timer.css";

function Timer() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [duration, setDuration] = useState(30);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    const handleStartClick = () => {
        if (!running) {
            setRunning(true);
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
    };

    const handlePauseClick = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
    };

    const handleStopClick = () => {
        clearInterval(intervalRef.current);
        setTimeLeft(duration);
        setRunning(false);
    };

    const handleResetClick = () => {
        clearInterval(intervalRef.current);
        setTimeLeft(duration);
        setRunning(false);
    };

    const handleDurationChange = (e) => {
        const newDuration = parseInt(e.target.value);
        setDuration(newDuration);
        setTimeLeft(newDuration);
    };

    useEffect(() => {
        if (timeLeft === 0 && running) {
            clearInterval(intervalRef.current);
            setRunning(false);
        }
    }, [timeLeft, running]);

    const calculateTimeFraction = () => {
        return timeLeft / duration;
    };

    const circleDasharray = () => {
        const perimeter = 2 * Math.PI * 40;
        return `${perimeter * calculateTimeFraction()} ${perimeter}`;
    };

    const formatTimeLeft = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="timer-container">
            <div className="timer">
                <svg className="timer-progress" viewBox="0 0 80 80">
                    <circle
                        className="timer-progress-bar"
                        cx="40"
                        cy="40"
                        r="40"
                        style={{ strokeDasharray: circleDasharray() }}
                    />
                </svg>
                <div className="timer-display">{formatTimeLeft()}</div>
                <div className="timer-controls">
                    <label>
                        Duration (in seconds):
                        <input
                            type="number"
                            value={duration}
                            onChange={handleDurationChange}
                        />
                    </label>
                    {running ? (
                        <button onClick={handlePauseClick}>Pause</button>
                    ) : (
                        <>
                            {timeLeft === duration ? null : (
                                <button onClick={handleResetClick}>
                                    Reset
                                </button>
                            )}
                            <button onClick={handleStartClick}>Start</button>
                        </>
                    )}
                    <button onClick={handleStopClick}>Stop</button>
                </div>
            </div>
        </div>
    );
}

export default Timer;
