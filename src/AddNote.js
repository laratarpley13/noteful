import React from 'react';
import PropTypes from 'prop-types';

export default function AddNote(props) {
    return(
        <section className='add-note'>
            <h2>Create a New Note</h2>
            <form className='add-folder-form' onSubmit={e => {
                props.history.push('/');
                props.handleNoteAdd(e)}
            }>
                <label htmlFor='noteName'>Note Name: </label>
                <input type='text' id='noteName' name='noteName' required onChange={e => props.validateName()} />
                <label htmlFor='noteContent'>Note Content: </label>
                <input type='text' id='noteContent' name='noteContent' />
                <label htmlFor='folderOptions'>Choose a Folder for the Note to go into: </label>
                <select name='folderOptions' id='folderOptions'>
                    {props.folders.map((folder, i) => 
                        <option key={i} value={folder.id}>{folder.name}</option>    
                    )}
                </select>
                <input type='submit' value="Add" disabled={props.nameValidation.disable}/>
            </form>
        </section>
    );
}

AddNote.propTypes = {
    history: PropTypes.object,
    handleNoteAdd: PropTypes.func,
    validateName: PropTypes.func,
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    nameValidation: PropTypes.object.isRequired,
}