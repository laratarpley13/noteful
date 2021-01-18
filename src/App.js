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
      fetch("http://localhost:9090/folders"),
      fetch("http://localhost:9090/notes")
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
      })
      .catch(error => {
        console.error({error});
      });
  }

  deleteNote = (e, noteId) => {
    e.preventDefault();
    let notes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes }, () => {
      fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        } 
      }).then(res => res.json())
      .catch(error => {
        console.error({error});
      })
    });
  }

  handleFolderAdd = (e) => {
    e.preventDefault();
    const newFolderId = Math.random().toString(36).slice(2);
    const newFolderName = e.target.folderName.value;
    const folder = {
      id: newFolderId,
      name: newFolderName,
    }
    this.setState(
      {
        folders: [...this.state.folders, folder],
        folderValidation: {disable: true}
      },
      () => {
        fetch("http://localhost:9090/folders", {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder)
        }).then(res => res.json())
        .catch(error => {
          console.error({error})
        })
      }
    );
    console.log(newFolderId);
    console.log(newFolderName);
  }

  handleNoteAdd = (e) => {
    e.preventDefault();
    const newNoteId = Math.random().toString(36).slice(2);
    const newNoteName = e.target.noteName.value.trim();
    const newNoteContent = e.target.noteContent.value;
    const newNoteFolderId = e.target.folderOptions.value;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'T'+time;
    const note = {
      id: newNoteId,
      name: newNoteName,
      modified: dateTime,
      folderId: newNoteFolderId,
      content: newNoteContent
    }
    this.setState(
      {
        notes: [...this.state.notes, note],
        nameValidation: {
          disable: true,
        },
        contentValidation: {
          disable: true,
        }
      },
      () => {
        fetch("http://localhost:9090/notes", {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(note)
        }).then(res => res.json())
        .catch(error => {
          console.error({error})
        })
      }
    );
    console.log(newNoteId);
    console.log(newNoteName);
    console.log(newNoteContent);
    console.log(newNoteFolderId);
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
