import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IToDoState {
    [key: string]: IToDo[];
}

export interface IToDo {
    id: number;
    text: string;
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        To_do: [],
        Doing: [],
        Done: [],
    },
    effects_UNSTABLE: [persistAtom]
});

export const BoardState = atom<string[]>({
    key: "Board",
    default: ['To_do', 'Doing', 'Done'],
    effects_UNSTABLE: [persistAtom]
});

