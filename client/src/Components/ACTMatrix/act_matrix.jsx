import React, { useContext,useEffect, useState, useRef } from "react";
import "../../css/act-matrix.css";
import Note from "../Note/Note.jsx";
import ACT from "../../assets/ACT.svg";
import Emoji from "../Emoji/Emoji.jsx";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hook from "../../assets/Hook.png";
import Heart from "../../assets/Heart.png";
import Camera from "../../assets/Camera.png";
import arrow from "../../assets/Arrow.svg";
import ScaleContext from "../../contexts/scaleContext";

const ACTMatrix = ({ notes, setNotes, projectId, emojis, setEmojis }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isDragging, setIsDragging] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [localScale,setLocalScale] =  useContext(ScaleContext);
    const [lastMousePosition, setLastMousePosition] = useState(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const handleWheel = (e) => {
        // e.preventDefault();
        let newScale = scale + e.deltaY * -0.001;
        newScale = Math.min(Math.max(0.125, newScale), 4);
        setScale(newScale);
        setLocalScale(newScale)
    };

    const handleMouseDown = (e) => {
        if (e.button === 1) {
            e.preventDefault();
            setIsDragging(true);
            setLastMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = (e) => {
        if (e.button === 1) {
            setIsDragging(false);
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const dx = (e.clientX - lastMousePosition.x) / scale;
            const dy = (e.clientY - lastMousePosition.y) / scale;
            setPosition({ x: position.x + dx, y: position.y + dy });
            setLastMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    useEffect(() => {
        if (canvasRef.current) {
            const x = position.x * scale;
            const y = position.y * scale;
            canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
    }, [position, scale]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                axios
                    .get(
                        apiUrl + `/api/checkUserAccess/${projectId}/${user.uid}`
                    )
                    .then((response) => {
                        // If the user should not have access, remove them from the matrix.
                        if (!response.data.status) {
                            navigate("/Home");
                        }
                    })
                    .catch((error) => {
                        console.log("Error adding user to Matrix:", error);
                    });
            } else {
                // User is signed out
                // ...
                navigate("/");
                console.log("user is logged out");
            }
        });
    }, []);

    return (
     
        <div
            className={`outer-infinite ${isDragging ? "grabbing" : ""}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div
                id="infiniteCanvas"
                className={`infiniteCanvas ${isDragging ? "grabbing" : ""}`}
                ref={canvasRef}
            >
                <div className="arrow-away ">Away</div>
                <img src={arrow} alt="Arrow X" className="arrow-x-negative" />
                <div className="line-x"></div>
                <div className="towards">Towards</div>
                <img src={arrow} alt="Arrow X" className="arrow-x" />
                <div className="inside">Inside</div>
                <img src={arrow} alt="Arrow Y" className="arrow-y-positive" />
                <div className="line-y"></div>
                <div className="outside">Outside</div>
                <img src={arrow} alt="Arrow Y" className="arrow-y" />

                <div className="grid-container">
                    <div className="quadrant">
                        <img className="act-image top-left" src={Hook} />
                    </div>
                    <div className="quadrant">
                        <img className="act-image top-right" src={Heart} />
                    </div>
                    <div className="quadrant">
                        <img className="act-image bottom-left" src={Camera} />
                    </div>
                    <div className="quadrant">
                        <img className="act-image bottom-right" src={Camera} />
                    </div>
                </div>
                {/* stickynotes */}
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        x={note.x}
                        y={note.y}
                        width={note.width}
                        height={note.height}
                        text={note.text}
                        scale={scale}
                        projectId={projectId}
                        noteColour={note.noteColour}
                        status= {note.status}
                    />
                ))}
                {emojis.map((emoji) => (
                    <Emoji
                        key={emoji.id}
                        id={emoji.id}
                        x={emoji.x}
                        y={emoji.y}
                        width={emoji.width}
                        height={emoji.height}
                        url={emoji.url}
                        scale={scale}
                        projectId={projectId}
                    />
                ))}
            </div>
        </div>

    );
};

export default ACTMatrix;
