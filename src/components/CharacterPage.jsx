import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterPage = () => {
  const [characterData, setCharacterData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://netnavi-explorer-backend-7b5ffe27ba68.herokuapp.com/character/${name}`);
        setCharacterData(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchData();
  }, [name]);

  return (
    characterData && <>
      <h1>{characterData?.name}</h1>
      <div className='content-container'>
        <div className='character-container'>
          <img
            className='character'
            src={characterData?.characterImagePath}
            alt={characterData?.name}
          />
        </div>
        <div className='navi-container'>
          <img
            className='navi'
            src={characterData?.naviImagePath}
            alt={characterData?.naviName}
          />
        </div>
      </div>
      <div className='description'>{characterData?.description}</div>
    </>
  );
};

export default CharacterPage;
