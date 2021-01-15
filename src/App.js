import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MainPage from './MainPage';
import Folder from './Folder';
import Note from './Note';
import Context from './Context';
import AddFolder from './AddFolder';

class App extends Component {
  state = {
    folders: [],
    notes: [],
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
        folders: [...this.state.folders, folder] 
      },
      () => {
        fetch("http://localhost:9090/folders", {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder)
        }).then(res => res.json());
      }
    );
    console.log(newFolderId);
    console.log(newFolderName);
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    }
    return (
      <Context.Provider value={value}>
        <div className="App">
          <Header />
          <main>
            <Route 
              exact 
              path='/' 
              render={() => 
                <MainPage />
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
                />
              }
            />
          </main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
