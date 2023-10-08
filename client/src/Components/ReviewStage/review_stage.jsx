import React from 'react';
import locationPin from '../../assets/locationPin.svg'; // Ensure correct path to your asset

const ReviewStage = ({ onClose }) => { // Added onClose prop to close the modal
    return (
        <div className="timerModal">
            <div className="timerWrap">
                <div class="whiteTextbox">
                    <div className='centreText'>Let's review your matrix.</div>
                    <div className='centreText'>Pick up this pin and place it on the matrix where you think you're currently at.</div>
                </div>
                <img
                    className="reviewPin whiteTextbox"
                    src={locationPin}
                    alt="Review Pin" 
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

export default ReviewStage;
