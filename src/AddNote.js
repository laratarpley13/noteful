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
                <label htmlFor='noteName' className='note-name'>Note Name: </label>
                <input type='text' id='noteName' name='noteName' className='note-name' required onChange={e => props.validateName()} />
                <label htmlFor='noteContent' className='note-content'>Note Content: </label>
                <input type='text' id='noteContent' name='noteContent' className='note-content' required onChange={e => props.validateContent()} />
                <label htmlFor='folderOptions' className='folder-options'>Choose a Folder for the Note to go into: </label>
                <select name='folderOptions' id='folderOptions' className='folder-options'>
                    {props.folders.map((folder, i) => 
                        <option key={i} value={folder.id}>{folder.name}</option>    
                    )}
                </select>
                <input type='submit' value="Add" disabled={props.nameValidation.disable || props.contentValidation.disable}/>
            </form>
        </section>
    );
}

AddNote.propTypes = {
    history: PropTypes.object,
    handleNoteAdd: PropTypes.func,
    validateName: PropTypes.func,
    validateContent: PropTypes.func,
    folders: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })),
    nameValidation: PropTypes.object.isRequired,
    contentValidation: PropTypes.object.isRequired,
}