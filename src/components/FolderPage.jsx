import axios from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FolderPage = () => {
  const [battleChips, setBattleChips] = useState([]);
  const [folderContents, setFolderContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/battlechips')
        console.log(response)
        setBattleChips(response.data)
      } catch (error) {
        console.error("Error getting battle chips: ", error)
      }
    }

    fetchData()
  }, [])

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === "folder" && source.droppableId === "battleChipList") {
      const chipToCopy = battleChips[source.index];
      const updatedFolderContents = [...folderContents, chipToCopy];
      setFolderContents(updatedFolderContents);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="folder-page">
        <Droppable droppableId="battleChipList">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="battle-chip-list"
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

        <Droppable droppableId="folder">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="folder"
            >

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default FolderPage;
