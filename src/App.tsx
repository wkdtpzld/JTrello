import { DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme } from './theme';
import { useRecoilState } from "recoil";
import { BoardState, toDoState } from "./atoms";
import Board from "./components/Board";
import Trash from './components/Trash';
import BoardForm from "./components/BoardForm";

function App() {

  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(BoardState);
  const GlobalSyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    font-weight: 300;
    line-height: 1;
    background-color: ${props => props.theme.bgColor};
    color: black;
    font-family: 'Source Sans 3', sans-serif;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  `;


  const onDranEnd = (info: DropResult) => { 
    const { destination, source } = info;

    if (!destination?.droppableId) return;

    if (source.droppableId === "board") {
      setBoards((prev) => {
        const boardCopy = [...prev];
        const item = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination.index, 0, item);

        return boardCopy;
      })
    } else if (destination?.droppableId === source.droppableId) {
      setToDos((oldToDos) => {

        const copyToDos = [...oldToDos[source.droppableId]];
        const taskObj = copyToDos[source.index];
        copyToDos.splice(source.index, 1);
        copyToDos.splice(destination?.index, 0, taskObj);

        return {
          ...oldToDos,
          [source.droppableId]: copyToDos
        };
      });
    } else if (destination.droppableId === 'trash'){

      setToDos(allBoard => {

        return {
            ...allBoard,
            [source.droppableId]: [...allBoard[source.droppableId].slice(0, source.index), ...allBoard[source.droppableId].slice(source.index + 1)]
        }
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
        }
      })
    }
    };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalSyle />
      <DragDropContext onDragEnd={onDranEnd}>
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
    </ThemeProvider>
  );
}

export default App;


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