import axios from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

    // Only proceed if dropped in a valid area
    if (!destination) return;

    if (destination.droppableId === "folder" && source.droppableId === "battleChipList") {
      // Copy the chip from the battleChipList to the folder
      const chipToCopy = battleChips[source.index];
      const updatedFolderContents = [...folderContents, chipToCopy];
      setFolderContents(updatedFolderContents);
    }

    // Add logic for other drag and drop scenarios if needed
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="folder-page">
        <Droppable droppableId="battleChipList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="battle-chip-list">
              {/* Map over your battle chips here and wrap each in a Draggable component */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="folder">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="folder">
              {/* Map over the chips in the folder here and wrap each in a Draggable component */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default FolderPage;
