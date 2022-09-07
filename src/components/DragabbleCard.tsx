import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDragabbledCardProps {
    toDo: string | number;
    index: number;
}

const DragabbleCard = ({ toDo, index }: IDragabbledCardProps) => {
    

    return (
        <Draggable draggableId={String(toDo)} index={index} key={toDo}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                    ref={magic.innerRef}
                >
                {toDo}
                </Card>
            )}
        </Draggable>
    )
}

export default React.memo(DragabbleCard);

const Card = styled.div<{ isDragging: boolean }>`
    background-color: ${(props) => props.isDragging ? "#00a8ff" : props.theme.cardColor};
    box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : null};
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 10px 10px
`;