import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MainPage from './MainPage';
import Folder from './Folder';
import Note from './Note';
import Context from './Context'

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    fetch("http://localhost:9090/folders")
      .then(res => res.json())
      .then(folders => this.setState({ folders }));
    fetch("http://localhost:9090/notes")
      .then(res => res.json())
      .then(notes => this.setState({ notes }));
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
          </main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
