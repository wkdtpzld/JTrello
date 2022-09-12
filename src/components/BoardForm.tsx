import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { BoardState, toDoState } from '../atoms';

interface IForm {
    board: string;
}

const BoardForm = () => {

    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setBoard = useSetRecoilState(BoardState);
    const setToDos = useSetRecoilState(toDoState);

    const onValid = ({board}:IForm) => {

        const newBoard = board;

        setToDos(allBoard => {
            return {
                ...allBoard,
                [newBoard] : []
            }
        })

        setBoard(allBoard => {
            return [...allBoard, newBoard]
        });
        
        setValue("board", "");
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit(onValid)}>
                <Label htmlFor='board'> Create New Board </Label>
                <Input {...register("board", {required: true})} placeholder={`Add task on`} />
            </Form>
        </FormWrapper>
    )
};

export default BoardForm;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 1rem;
    font-size: 25px;
    font-weight: bold;
`;

const Input = styled.input`
    border-radius: 5px;
    padding: 15px;
    transition: 0.5s;
    border: 3px solid #faf7f7;
    outline: none;

    &:focus {
        border: 3px solid #555;
    }
`