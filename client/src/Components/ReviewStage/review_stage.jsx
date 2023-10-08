import React, { useState } from 'react';
import locationPin from '../../assets/locationPin.svg';

const ReviewStage = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const startDragging = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setIsModalVisible(false);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDragging);
    };

    const onMouseMove = (e) => {
        const img = document.querySelector('.reviewPin');
        img.style.left = e.pageX - img.width / 2 + 'px';
        img.style.top = e.pageY - img.height / 2 + 'px';
    };

    const stopDragging = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDragging);

        const matrixContainer = document.getElementById('infiniteCanvas');  // get the matrix container by id
        const pin = document.querySelector('.reviewPin');

        const matrixRect = matrixContainer.getBoundingClientRect();  // get the bounding box of the matrix container
        const pinRect = pin.getBoundingClientRect();  // get the bounding box of the pin

        // calculate the position of the pin relative to the matrix container
        const relativeX = pinRect.left - matrixRect.left + (pinRect.width / 2);
        console.log('Relative Position:', { x: relativeX });

        // calculate the horizontal center of the matrix container
        const horizontalCenter = matrixRect.width / 2;
        console.log('X', relativeX - horizontalCenter);
    };

    return (
        <>
            {isModalVisible && (
                <div className="timerModal">
                    <div className="timerWrap">
                        <div className="whiteTextbox">
                            <div className='centreText'>Let's review your matrix.</div>
                            <div className='centreText'>Pick up this pin and place it on the matrix where you feel you're currently at.</div>
                        </div>
                    </div>
                </div>
            )}
            <img
                className="reviewPin whiteTextbox"
                src={locationPin}
                alt="Review Pin"
                style={{
                    cursor: 'grab',
                    position: 'fixed',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)' // Added this to ensure the image is centered
                }}
                onMouseDown={startDragging}
            />
        </>
    );
};

export default ReviewStage;
