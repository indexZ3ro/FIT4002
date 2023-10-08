import React, { useState, useRef, useEffect } from "react";
import heart from "../../assets/Heart.png";
import camera from "../../assets/Camera.png";
import hook from "../../assets/Hook.png";

const dropdownItems = [
    { value: "1", imageSource: heart },
    { value: "2", imageSource: camera },
    { value: "3", imageSource: hook },
    { value: "4", imageSource: camera },
];

const IconsDropdown = ({ selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const outsideClickRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !outsideClickRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="custom-dropdown-container" ref={outsideClickRef}>
            <div className="selected-option" onClick={toggleDropdown}>
                {selectedValue ? (
                    <img
                        src={dropdownItems.find(item => item.value === selectedValue).imageSource}
                        alt={`Selected option: ${selectedValue}`}
                        className="selected-image"
                    />
                ) : (
                    "Select an option"
                )}
            </div>
            {isOpen && (
                <div className="dropdown-options" ref={dropdownRef}>
                    {dropdownItems.map((item) => (
                        <div
                            key={item.value}
                            className="dropdown-option"
                            onClick={() => {
                                onSelect(item.value);
                                setIsOpen(false);
                            }}
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

export default IconsDropdown;
