import './App.css'
import { Routes, Route } from 'react-router-dom';
import Map from './components/Map'
import NavBar from './components/NavBar'
import CharacterPage from './components/CharacterPage';
import FoldersList from './components/FoldersList'
import FolderPage from './components/FolderPage'
import Shop from './components/Shop'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/character/:name" element={<CharacterPage />} />
        <Route path="/folders" element={<FoldersList />} />
        <Route path="/folders/:folderId" element={<FolderPage />} />
      </Routes>
    </>
  )
}

export default App;