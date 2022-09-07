import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';

interface IBoardProps {
    toDos: string[] | number[],
    boardId: string;
}

interface IAreaProps {
    isDraggingOver: boolean,
    isDraggingFromThis: boolean
}

const Board = ({toDos, boardId}:IBoardProps) => {

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                <Area 
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot?.draggingFromThisWith)}
                    {...magic.droppableProps}
                    ref={magic.innerRef}>
                        
                    {toDos.map((toDo, index) =>
                        <DragabbleCard toDo={toDo} index={index} key={toDo} />
                    )}
                    {magic.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
        
    )
}

export default Board;

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.cardBgColor};
    padding-top: 10px;
    padding: 10px 0px;
    border-radius: 10px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dcdde1" : props.isDraggingFromThis ? "#718093" : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
`;