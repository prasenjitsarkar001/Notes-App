import { createContext, useContext, useReducer,useEffect } from 'react';
import { notesReducer } from '../reducers/notesReducer';

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    //    add local-storage
    const initialState = () => {
        const savedState = localStorage.getItem("notesState");
        return savedState
            ? JSON.parse(savedState)
            : {
                title: '',
                text: '',
                notes: [],
                archive: []
            };
    };


    const [{ title, text, notes, archive }, notesDispatch] = useReducer(
        notesReducer,
        {},
        initialState
    );
    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem(
            "notesState",
            JSON.stringify({ title, text, notes, archive })
        );
    }, [title, text, notes, archive]);

    return (
        <NotesContext.Provider value={{ title, text, notes, archive, notesDispatch }}>
            {children}
        </NotesContext.Provider>
    )
}

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes }