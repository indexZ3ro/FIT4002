import { createContext } from 'react';

// This context will store the ID of the note currently being edited (or null if none)
const LocalChangeContext = createContext(null);

export default LocalChangeContext;
