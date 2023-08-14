import React from 'react';
import '../../index.css';
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
