import { atom } from "recoil";

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        To_do: ["1"],
        Doing: ["2","3",],
        Done: ["4","5"]
    }
});