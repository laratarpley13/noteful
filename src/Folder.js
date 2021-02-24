import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Context from './Context';
import PropTypes from 'prop-types';

export default class Folder extends Component {
    static contextType = Context;
    render() {
        const { folders, notes, deleteNote } = this.context
        /* console.log(folders)
        console.log(notes)
        console.log(parseInt(this.props.match.params.folderId)) */
        const filteredNotes = notes.filter(note => note.folderId === parseInt(this.props.match.params.folderId));
        //console.log(filteredNotes)
        return (
            <div className='main-section'>
                <div className='side-bar'>
                    <ul className='folder-list'>
                        {folders.map((folder) => 
                            (folder.id === parseInt(this.props.match.params.folderId))
                                ? <li key={folder.id} id={folder.id}><NavLink to={`/folder/${folder.id}`} activeClassName='active'><h3>{folder.name}</h3></NavLink></li>
                                : <li key={folder.id} id={folder.id}><Link to={`/folder/${folder.id}`}><h3>{folder.name}</h3></Link></li>
                        )}
                    </ul>
                    <button className='add-folder-button' onClick={() => this.props.history.push('/addFolder')}>Add Folder</button>
                </div>
                <div className='notes'>
                    <ul className='notes-list'>
                        {filteredNotes.map((note) => (
                            <li key={note.id} id={note.id}>
                                <Link to={`/note/${note.id}`}><h4>{note.name}</h4></Link>
                                <p>{note.modified}</p>
                                <button type='button' onClick={e => deleteNote(e, note.id)}>Delete Note</button>
                            </li>
                        ))}
                    </ul>
                    <button className='add-note-button' onClick={() => this.props.history.push('/addNote')}>Add Note</button>
                </div>  
            </div>
        );
    }
}

Folder.propTypes = {
    match: PropTypes.object,
}
