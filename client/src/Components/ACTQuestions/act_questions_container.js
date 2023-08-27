import React from 'react';
import '../../index.css';
import ACTQuestions from './act_questions';

const ACTQuestionsContainer = ({ questions, setQuestions }) => {
    const selectedQuestion = questions.find(question => question.status === "active");
    return (
        <div className='act-questions-container'>
            {selectedQuestion && (
                <ACTQuestions key={selectedQuestion.id} id={selectedQuestion.id} text={selectedQuestion.text} type={selectedQuestion.type}/>
            )

            }
        </div>
    );
}

export default ACTQuestionsContainer;
