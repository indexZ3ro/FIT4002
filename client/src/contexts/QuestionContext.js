import { createContext } from 'react';

// This context will store the ID of the note currently being edited (or null if none)
const QuestionContext = createContext([]);

export default QuestionContext;
