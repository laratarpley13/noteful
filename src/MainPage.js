import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';

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
                    <Link to={'/addFolder'}><h5>Add Folder</h5></Link>
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
                    <button type='button' className='add-note'>Add Note</button>
                </div>                
            </div>
        )
    }
}

export default MainPage;