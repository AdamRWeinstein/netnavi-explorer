import './App.css'
import { Routes, Route } from 'react-router-dom';
import Map from './components/Map'
import NavBar from './components/NavBar'
import CharacterPage from './components/CharacterPage';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/character/:name" element={<CharacterPage />} />
      </Routes>
    </>
  )
}

export default App;