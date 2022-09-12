import Trash from '../components/Trash';
import BoardForm from '../components/BoardForm';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { onDranEnd } from '../utils/Drag';
import { useRecoilState } from 'recoil';
import { toDoState, BoardState } from '../atoms';
import Board from '../components/Board';

const ToDo = () => {

    const [toDos, setToDos] = useRecoilState(toDoState);
    const [boards, setBoards] = useRecoilState(BoardState);

    return (
        <DragDropContext onDragEnd={(info) => onDranEnd({ info, setBoards, setToDos })}>
            <Trash />
            <BoardForm />
            <Wrapper>
                <Droppable droppableId="board" direction="horizontal" type="board">
                    {(magic) => (
                        <Boards ref={magic.innerRef} {...magic.droppableProps}>
                            {boards.map((boardId, index) => (
                                <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} index={index} />
                            ))}
                            {magic.placeholder}
                        </Boards>
                    )}
                </Droppable>
            </Wrapper>
        </DragDropContext>
    )
}

export default ToDo;

const Boards = styled.div`
    display: flex;
    padding: 1rem;
    gap: 1.5rem;
`;

const Wrapper = styled.div`
    display: flex;
    min-width: 480px;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    overflow-x: scroll;
`