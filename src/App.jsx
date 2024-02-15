import './App.css'
import { Routes, Route } from 'react-router-dom';
import Map from './components/Map'
import NavBar from './components/NavBar'
import CharacterPage from './components/CharacterPage';
import Shop from './components/Shop'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/character/:name" element={<CharacterPage />} />
      </Routes>
    </>
  )
}

export default App;