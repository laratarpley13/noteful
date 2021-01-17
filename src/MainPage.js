import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';
import PropTypes from 'prop-types';

class MainPage extends Component {
    static contextType = Context;
    render() {
        const { folders, notes, deleteNote } = this.context;
        return (
            <div className='main-section'>
                <div className='side-bar'>
                    <ul className='folder-list'>
                        {folders.map((folder) => (
                            <li key={folder.id} id={folder.id}>
                                <Link to={`/folder/${folder.id}` } style={{textDecoration:'none'}}>
                                    <h3>{folder.name}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button className='add-folder-button' onClick={() => this.props.history.push('/addFolder')}>Add Folder</button>
                </div>
                <div className='notes'>
                    <ul className='notes-list'>
                        {notes.map((note) => (
                            <li key={note.id} id={note.id}>
                                <Link to={`/note/${note.id}`} style={{textDecoration:'none'}}><h4>{note.name}</h4></Link>
                                <p>{note.modified}</p>
                                <button type='button' onClick={e => deleteNote(e, note.id)}>Delete Note</button>
                            </li>
                        ))}
                    </ul>
                    <button className='add-note-button' onClick={() => this.props.history.push('/addNote')}>Add Note</button>
                </div>                
            </div>
        )
    }
}

MainPage.propTypes = {
    history: PropTypes.object,
}

export default MainPage;