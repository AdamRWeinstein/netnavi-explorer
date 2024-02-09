import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterPage = () => {
  const [characterData, setCharacterData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO update call to backend away from localhost
        console.log(`http://localhost:4000/character/${name}`)
        const response = await axios.get(`http://localhost:4000/character/${name}`); 
        setCharacterData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error adding ride:', error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <img src={characterData?.characterImagePath} alt={characterData?.name} />
      <img src={characterData?.naviImagePath} alt={characterData?.naviName} />
    </div>
  );
};

export default CharacterPage;
