import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPage extends Component {
    render() {
        return (
            <div className='main-section'>
                <div className='side-bar'>
                    <ul className='folder-list'>
                        {this.props.folders.map((folder) => (
                            <li>
                                <Link to={`/folder/${folder.id}` } style={{textDecoration:'none'}}>
                                    <h3>{folder.name}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button type='button'>Add Folder</button>
                </div>
                <div className='notes'>
                    <ul className='notes-list'>
                        {this.props.notes.map((note) => (
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
        )
    }
}

export default MainPage;