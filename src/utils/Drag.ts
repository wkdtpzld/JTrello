import { DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater } from "recoil";
import { IToDoState } from '../atoms';

interface IonDragEnd {
    info: DropResult,
    setBoards: SetterOrUpdater<string[]>,
    setToDos: SetterOrUpdater<IToDoState>
}

export const onDranEnd = ({ info, setBoards, setToDos }:IonDragEnd) => {
    const { destination, source } = info;

    if (!destination?.droppableId) return;

    if (source.droppableId === "board") {
        setBoards((prev) => {
            const boardCopy = [...prev];
            const item = boardCopy.splice(source.index, 1)[0];
            boardCopy.splice(destination.index, 0, item);

            return boardCopy;
        });
    } else if (destination?.droppableId === source.droppableId) {
        setToDos((oldToDos) => {
            const copyToDos = [...oldToDos[source.droppableId]];
            const taskObj = copyToDos[source.index];
            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, taskObj);

            return {
                ...oldToDos,
                [source.droppableId]: copyToDos,
            };
        });
    } else if (destination.droppableId === "trash") {
        setToDos((allBoard) => {
            return {
                ...allBoard,
                [source.droppableId]: [
                ...allBoard[source.droppableId].slice(0, source.index),
                ...allBoard[source.droppableId].slice(source.index + 1),
                ],
            };
        });
    } else if (destination?.droppableId !== source.droppableId) {
        setToDos((allBoard) => {
            const sourceBoard = [...allBoard[source.droppableId]];
            const targetBoard = [...allBoard[destination.droppableId]];

            const taskObj = sourceBoard[source.index];

            sourceBoard.splice(source.index, 1);
            targetBoard.splice(destination.index, 0, taskObj);

            return {
                ...allBoard,
                [source.droppableId]: sourceBoard,
                [destination.droppableId]: targetBoard,
            };
        });
    }
};