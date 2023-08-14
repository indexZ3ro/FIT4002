import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from "axios";
import '../../index.css';
import { realtimeDb } from "../../firebase";
import QuestionContext from "../../contexts/QuestionContext";
import { onValue, ref } from "firebase/database";
import ACTQuestions from './act_questions';

const ACTQuestionsContainer = ({ questions, setQuestions }) => {
    return (
        <div className='act-questions-container'>
            {questions.map((question) => (
                <ACTQuestions key={question.id} id={question.id} text={question.text} type={question.type}/>
            ))}
        </div>
    );
}

export default ACTQuestionsContainer;
