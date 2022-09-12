import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { FaTrash } from 'react-icons/fa';
const Trash = () => {

    return (
        <Droppable droppableId='trash'>
            {(magic) => (
                <TrashBox ref={magic.innerRef} {...magic.droppableProps} >
                    <FaTrash size="40" />
                </TrashBox>
            )}
        </Droppable>
    )
}

export default Trash;

const TrashBox = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 30px;
    z-index: 10000000;

    svg {
        
        transition: 0.3s;

        &:hover {
            transform: scale(1.3);
        }
    }
`