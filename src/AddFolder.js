import React from 'react';
import PropTypes from 'prop-types';

export default function AddFolder(props) {
    return(
        <section className="add-folder">
            <h2>Create a New Folder</h2>
            <form className='add-folder-form' onSubmit={e => {
                props.history.push('/');
                props.handleFolderAdd(e)}
            }>
                <label htmlFor='folderName'>Folder Name: </label>
                <input type='text' id='folderName' name='folderName' required onChange={e => props.validateFolderName()} />
                <input type='submit' value="Add" disabled={props.folderValidation.disable}/>
            </form>
        </section>
    )
}

AddFolder.propTypes = {
    history: PropTypes.object,
    handleFolderAdd: PropTypes.func,
    validateFolderName: PropTypes.func,
    folderValidation: PropTypes.object
}