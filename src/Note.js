import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';
import PropTypes from 'prop-types';

export default class Note extends Component {
    static contextType = Context;

    render() {
        const { folders, notes, deleteNote } = this.context;
        const selectedNote = notes.find(note => 
            note.id === parseInt(this.props.match.params.noteId)    
        )
        const mathcingFolder = folders.find(folder => 
            folder.id === selectedNote.folderId    
        )
        return (
            <div className='main-section'>
                <div className='side-bar'>
                    <button
                        className='go-back' 
                        type='button' 
                        onClick={() => {
                            this.props.history.goBack()
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
                        <button type='button' onClick={e => {
                            this.props.history.push('/'); 
                            deleteNote(e, selectedNote.id);
                        }}>
                            Delete Note
                        </button>
                    </div>
                    <p>{selectedNote.content}</p>
                </section>
            </div>
        )
    }
}

Note.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
}
