import React from 'react';
import { Link } from 'react-router-dom';

export default function Note(props) {
    const selectedNote = props.notes.find(note => 
        note.id === props.match.params.noteId    
    )
    const mathcingFolder = props.folders.find(folder => 
        folder.id === selectedNote.folderId    
    )
    return (
        <div className='main-section'>
            <div className='side-bar'>
                <button
                    className='go-back' 
                    type='button' 
                    onClick={() => {
                        props.history.goBack()
                    }}
                >
                    Go Back
                </button>
                <ul className='folder-display'>
                    <li><Link to={`/folder/${mathcingFolder.id}`} style={{textDecoration:'none'}}><h2>{mathcingFolder.name}</h2></Link></li>
                </ul>
            </div>
            <section className='selected-note'>
                <div className='note-info'>
                    <h4>{selectedNote.name}</h4>
                    <p>{selectedNote.modified}</p>
                    <button type='button'>Delete Note</button>
                </div>
                <p>{selectedNote.content}</p>
            </section>
        </div>
    )
}