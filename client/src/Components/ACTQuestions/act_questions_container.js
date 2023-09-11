import React from "react";
import "../../index.css";
import ACTQuestions from "./act_questions";

const ACTQuestionsContainer = ({ questions }) => {
  const selectedQuestion = questions.find(
    (question) => question.status === "active"
  );
  return (
    <div>
      {selectedQuestion && (
        <ACTQuestions
          key={selectedQuestion.id}
          id={selectedQuestion.id}
          text={selectedQuestion.text}
          type={selectedQuestion.type}
        />
      )}
    </div>
  );
};

export default ACTQuestionsContainer;
