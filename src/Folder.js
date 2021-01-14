import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Context from './Context';

export default class Folder extends Component {
    static contextType = Context;
    render() {
        const { folders, notes, deleteNote } = this.context
        const filteredNotes = notes.filter(note => note.folderId === this.props.match.params.folderId);
        return (
            <div className='main-section'>
                <div className='side-bar'>
                    <ul className='folder-list'>
                        {folders.map((folder) => 
                            (folder.id === this.props.match.params.folderId)
                                ? <li key={folder.id} id={folder.id}><NavLink to={`/folder/${folder.id}`} activeClassName='active' style={{textDecoration:'none'}}><h3>{folder.name}</h3></NavLink></li>
                                : <li key={folder.id} id={folder.id}><Link to={`/folder/${folder.id}`} style={{textDecoration:'none'}}><h3>{folder.name}</h3></Link></li>
                        )}
                    </ul>
                    <button type='button'>Add Folder</button>
                </div>
                <div className='notes'>
                    <ul className='notes-list'>
                        {filteredNotes.map((note) => (
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
        );
    }
}
