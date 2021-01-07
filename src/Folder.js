import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Folder(props) {
    const filteredNotes = props.notes.filter(note => note.folderId === props.match.params.folderId);
    return (
        <div className='main-section'>
            <div className='side-bar'>
                <ul className='folder-list'>
                    {props.folders.map((folder) => 
                        (folder.id === props.match.params.folderId)
                            ? <li><NavLink to={`/folder/${folder.id}`} activeClassName='active' style={{textDecoration:'none'}}><h3>{folder.name}</h3></NavLink></li>
                            : <li><Link to={`/folder/${folder.id}`} style={{textDecoration:'none'}}><h3>{folder.name}</h3></Link></li>
                    )}
                </ul>
                <button type='button'>Add Folder</button>
            </div>
            <div className='notes'>
                <ul className='notes-list'>
                    {filteredNotes.map((note) => (
                        <li>
                            <Link to={`/note/${note.id}`} style={{textDecoration:'none'}}><h4>{note.name}</h4></Link>
                            <p>{note.modified}</p>
                            <button type='button'>Delete Note</button>
                        </li>
                    ))}
                </ul>
                <button type='button' className='add-note'>Add Note</button>
            </div>  
        </div>
    );
}