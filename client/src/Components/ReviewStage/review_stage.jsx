import React from 'react';

const ReviewStage = () => {
  return (
    <div>
      <p>Let's review your matrix. Pick up pin and place it on the matrix where you think you're currently at.</p>
      <img 
        src="../../assets/locationPin.svg"
        alt="Review Pin" 
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default ReviewStage;
