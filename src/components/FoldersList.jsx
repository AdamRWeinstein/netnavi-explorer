import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const FolderPage = () => {
  const [folders, setFolders] = useState([])
  const [newFolderName, setNewFolderName] = useState('');
  const { userCode } = useContext(UserContext)

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(`https://netnavi-explorer-backend-7b5ffe27ba68.herokuapp.com/folders/${userCode}`);
        setFolders(response.data)
      } catch (error) {
        console.error('Error fetching folders: ', error)
      }
    }

    fetchFolders()
  }, [userCode])

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      // Replace this URL with your actual endpoint for folder creation
      const response = await axios.post(`/folders/${userCode}`, { name: newFolderName });
      setFolders([...folders, response.data]);
      setNewFolderName('');
    } catch (error) {
      console.error('Error creating folder: ', error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await axios.delete(`/folders/${userCode}/${folderId}`);
      // Filter out the deleted folder from the folders state
      setFolders(folders.filter(folder => folder._id !== folderId));
    } catch (error) {
      console.error('Error deleting folder: ', error);
    }
  };

  return (
    <>
      <h2>Your Folders</h2>
      {folders.length > 0 ? (
        <ul>
          {folders.map((folder) => (
            <li key={folder._id}>
              <Link to={`/folders/${folder._id}`} className='folder-link'>
                {folder.name}
              </Link>
              { ' ' }
              <span 
                className='delete-x' 
                onClick={() => handleDeleteFolder(folder._id)}
              > [X] </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no folders yet. Create one to get started!</p>
      )}
      <form onSubmit={handleCreateFolder}>
        <input
          type="text"
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          required
        />
        <button type="submit">Create New Folder</button>
      </form>
    </>
  )
}

export default FolderPage
