import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext'

const FolderPage = () => {
  const [battleChips, setBattleChips] = useState([]);
  const [folderContents, setFolderContents] = useState([]);
  const { folderId } = useParams()
  const { userCode } = useContext(UserContext)

  const generateUniqueId = (chipNo) => {
    const uniqueNumber = Date.now() + Math.random();
    const uniqueHex = uniqueNumber.toString(16);
    return `${chipNo}-${uniqueHex}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://netnavi-explorer-backend-7b5ffe27ba68.herokuapp.com/battlechips')
        setBattleChips(response.data)
      } catch (error) {
        console.error("Error getting battle chips: ", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://netnavi-explorer-backend-7b5ffe27ba68.herokuapp.com/folders/${userCode}/${folderId}`);
        const folderData = response.data;
        const chipsWithUniqueId = folderData.battleChips.map(chip => ({
          ...chip,
          uniqueId: generateUniqueId(chip.chipNo)
        }));
        setFolderContents(chipsWithUniqueId)
      } catch (error) {
        console.error("Error getting folder info: ", error)
      }
    }

    fetchData()
  }, [folderId, userCode])

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === "folder" && source.droppableId === "battleChipList") {
      const chipToCopy = { ...battleChips[source.index], uniqueId: generateUniqueId(battleChips[source.index].chipNo) };
      const updatedFolderContents = [...folderContents, chipToCopy];
      setFolderContents(updatedFolderContents);
    } else if (destination.droppableId === "battleChipList" && source.droppableId === "folder") {
      const updatedFolderContents = folderContents.filter(chip => chip.uniqueId !== folderContents[source.index].uniqueId);
      setFolderContents(updatedFolderContents);
    }
  };

  const handleSaveFolder = async () => {
    try {
      const data = { battleChips: folderContents.map(chip => chip._id) }
      await axios.put(`https://netnavi-explorer-backend-7b5ffe27ba68.herokuapp.com/folders/${userCode}/${folderId}`, data);
    } catch (error) {
      console.error('Error updating folder: ', error);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="folder-page">
        <Droppable droppableId="battleChipList">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="battle-chip-container"
            >
              {battleChips.map((chip, index) => (
                <Draggable key={chip.chipNo} draggableId={chip.chipNo} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="battle-chip"
                    >
                      <img src={chip.imagePath} alt={chip.name} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <h2>Battle Chip List</h2>
        {' '}
        <div className='inline-div'>
          <h2>Folder</h2>
          <span
            className='save-folder-link'
            onClick={() => handleSaveFolder()}
          > [SAVE] </span>
        </div>
        <Droppable droppableId="folder">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="folder-container"
            >
              {folderContents.map((chip, index) => (
                <Draggable key={chip.uniqueId} draggableId={chip.uniqueId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="folder-item"
                    >
                      <img src={chip.imagePath} alt={chip.name} />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default FolderPage;
