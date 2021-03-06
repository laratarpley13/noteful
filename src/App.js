import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MainPage from './MainPage';
import Folder from './Folder';
import Note from './Note';
import Context from './Context';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import AppError from './appError';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    nameValidation: {
      disable: true
    },
    contentValidation: {
      disable: true
    },
    folderValidation: {
      disable: true
    }
  }

  componentDidMount() {
    Promise.all([
      fetch("https://evening-ocean-23432.herokuapp.com/api/folders"),
      fetch("https://evening-ocean-23432.herokuapp.com/api/notes")
    ])
      .then(([foldersRes, notesRes]) => {
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        
        return Promise.all([foldersRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({folders, notes});
        /* console.log(this.state.folders)
        console.log(this.state.notes) */
      })
      .catch(error => {
        console.error({error});
      });
  }

  deleteNote = (e, noteId) => {
    e.preventDefault();
    let notes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes }, () => {
      fetch(`https://evening-ocean-23432.herokuapp.com/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        } 
      }).then(res => res)
      .catch(error => {
        console.error({error});
      })
    });
  }

  handleFolderAdd = (e) => {
    e.preventDefault();
    const newFolderName = e.target.folderName.value;
    const folder = {
      name: newFolderName,
    }
    this.setState(
      {
        folderValidation: {disable: true}
      }
    );

    //POST the new folder
    fetch("https://evening-ocean-23432.herokuapp.com/api/folders", {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        this.setState({
          folders: [...this.state.folders, data]
        })
      })
      .catch(error => {
        console.error({error})
      })

    console.log(this.state.folders);
  }

  handleNoteAdd = (e) => {
    e.preventDefault();
    const newNoteName = e.target.noteName.value.trim();
    const newNoteContent = e.target.noteContent.value;
    const newNoteFolderId = parseInt(e.target.folderOptions.value);
    console.log(newNoteFolderId)
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'T'+time;
    const note = {
      name: newNoteName,
      modified: dateTime,
      folderid: newNoteFolderId,
      content: newNoteContent
    }
    this.setState(
      {
        nameValidation: {
          disable: true,
        },
        contentValidation: {
          disable: true,
        }
      }
    )
    //POST the new note
    fetch("https://evening-ocean-23432.herokuapp.com/api/notes", {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        this.setState({
          notes: [...this.state.notes, data]
        })
      })
      .catch(error => {
        console.error({error})
      })
    console.log(this.state.notes);
  }

  validateFolderName = () => {
    this.setState({
      folderValidation: {
        disable: false,
      }
    })
  }

  validateName = () => {
    this.setState({
      nameValidation: {
        disable: false,
      }
    })
  } 

  validateContent = () => {
    this.setState({
      contentValidation: {
        disable: false,
      }
    })
  } 

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    }
    return (
      <AppError>
      <Context.Provider value={value}>
        <div className="App">
          <Header />
          <main>
            <Route 
              exact 
              path='/'
              render={(props) => 
                <MainPage 
                  {...props}
                />
              } 
            />
            <Route  
              path='/folder/:folderId' 
              render={(props) => 
                <Folder
                  {...props} 
                />
              } 
            />
            <Route  
              path='/note/:noteId' 
              render={(props) => 
                <Note
                  {...props} 
                />
              } 
            />
            <Route 
              path='/addFolder'
              render={(props) => 
                <AddFolder
                  {...props} 
                  handleFolderAdd={this.handleFolderAdd}
                  validateFolderName={this.validateFolderName}
                  folderValidation={this.state.folderValidation}
                />
              }
            />
            <Route 
              path='/addNote'
              render={(props) => 
                <AddNote
                  {...props}
                  folders={this.state.folders}
                  validateName={this.validateName}
                  validateContent={this.validateContent}
                  nameValidation={this.state.nameValidation}
                  contentValidation={this.state.contentValidation} 
                  handleNoteAdd={this.handleNoteAdd}
                />
              }
            />
          </main>
        </div>
      </Context.Provider>
      </AppError>
    );
  }
}

App.defaultProps = {
  folders: [],
  notes: []
}

export default App;
