import React, { useState, useEffect, useRef } from 'react';
import '../../index.css';

const ACTQuestions = () => {
  const [name, setName] = useState(''); // Renamed state variable from 'Question' to 'name'
  const divRef = useRef();

  useEffect(() => {
    divRef.current.textContent = name;
  }, [name]);

  const handleInput = (e) => {
    setName(e.target.textContent);
  };

  return (
    <div className='act-questions-container'>
      <div className='act-questions-label'>Question:</div>
      <div ref={divRef} className='act-questions' contentEditable onInput={handleInput}></div>
    </div>
  );
}

export default ACTQuestions;
