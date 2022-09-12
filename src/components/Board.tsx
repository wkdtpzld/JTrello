import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { useForm } from "react-hook-form";
import { BoardState, IToDo, toDoState } from '../atoms';
import { useSetRecoilState, useRecoilState } from 'recoil';

interface IBoardProps {
    toDos: IToDo[],
    boardId: string;
    index: number;
}

interface IAreaProps {
    isDraggingOver: boolean,
    isDraggingFromThis: boolean
}

interface IForm {
    toDo: string;
}

const Board = ({toDos, boardId, index}:IBoardProps) => {

    const setToDos = useSetRecoilState(toDoState);
    const setBoard = useSetRecoilState(BoardState);
    const { register, setValue, handleSubmit } = useForm<IForm>();

    const onValid = ({ toDo }: IForm) => {

        const newToDo = {
            id: Date.now(),
            text: toDo
        }

        setToDos(allBoard => {
            return {
                ...allBoard,
                [boardId]: [...allBoard[boardId], newToDo],
                
            }
        });

        setValue("toDo", "");
    };

    const onDeleteBtn = () => {

        setToDos((prev) => {
            const cp = { ...prev };
            delete cp[boardId];
            return { ...cp };
        });

        setBoard((allBoard) => {
            return allBoard.filter(board => board !== boardId);
        })

    };

    return (
        <Draggable draggableId={boardId} index={index} key={boardId}>
            {(magic) => (
                <Wrapper {...magic.dragHandleProps} {...magic.draggableProps} ref={magic.innerRef}>
                    <Title>
                        {boardId}
                        <DeleteBtn onClick={onDeleteBtn}>Delete</DeleteBtn>
                    </Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", {required: true})}
                            type="text"
                            placeholder={`Add task on ${boardId}`}
                        />
                    </Form>
                    <Droppable droppableId={boardId}>
                    {(magic, snapshot) => (
                        <Area
                            isDraggingOver={snapshot.isDraggingOver}
                            isDraggingFromThis={Boolean(snapshot?.draggingFromThisWith)}
                            {...magic.droppableProps}
                            ref={magic.innerRef}
                        >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard
                                toDoText={toDo.text}
                                index={index}
                                key={toDo.id}
                                toDoId={toDo.id}
                                boardId={boardId} />
                        ))}
                        {magic.placeholder}
                        </Area>
                    )}
                    </Droppable>
                </Wrapper>
            )}
        </Draggable>
        
    );
}

export default Board;

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.cardBgColor};
    padding-top: 10px;
    padding: 10px 0px;
    border-radius: 10px;
    min-height: 200px;
    width: 400px;
    height: 60vh;
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
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
`;

const Form = styled.form`
    input {
        width: 100%;
    }
`

const DeleteBtn = styled.button`
    border: none;
    border-radius: 10px;
    font-size: 15px;
    padding: 5px 10px;
    background-color: #f5f6fa;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: black;
        color: white;
    }
`;