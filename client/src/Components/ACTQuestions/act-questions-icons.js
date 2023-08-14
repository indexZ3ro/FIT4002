import React, { useState, useRef, useEffect } from 'react';

const dropdownItems = [
  {
    value: '1',
    imageSource: require('../../assets/Hook.png'),
  },
  {
    value: '2',
    imageSource: require('../../assets/Heart.png'),
  },
  {
    value: '3',
    imageSource: require('../../assets/Camera.png'),
  },
  {
    value: '4',
    imageSource: require('../../assets/Camera.png'),
  },
  // Add more items as needed
];

const ACTQuestionsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('1');
  const dropdownRef = useRef(null);
  const outsideClickRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (isOpen === true && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
        document.addEventListener('mousedown', handleOutsideClick);
        setIsOpen(false);
      }
    }

    if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
      } else {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="custom-dropdown-container" ref={outsideClickRef}>
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedValue ? (
          <img
            src={
              dropdownItems.find((item) => item.value === selectedValue)
                .imageSource
            }
            alt={`Selected option: ${selectedValue}`}
            className="selected-image"
          />
        ) : (
          'Select an option'
        )}
      </div>
      {isOpen && (
        <div className="dropdown-options" ref={dropdownRef}> 
          {dropdownItems.map((item) => (
            <div
              key={item.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(item.value)}
            >
              <img
                src={item.imageSource}
                alt={`Option: ${item.value}`}
                className="option-image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ACTQuestionsDropdown;
