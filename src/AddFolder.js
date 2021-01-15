import React from 'react';

export default function AddFolder(props) {
    return(
        <section className="add-folder">
            <h2>Create a New Folder</h2>
            <form className='add-folder-form' onSubmit={e => {
                props.history.push('/');
                props.handleFolderAdd(e)}
            }>
                <label htmlFor='folderName'>Folder Name: </label>
                <input type='text' id='folderName' name='folderName' />
                <input type='submit' value="Add" />
            </form>
        </section>
    )
}