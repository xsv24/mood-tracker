import React, { FunctionComponent } from 'react';

import Row from './Row';
import Chip from './Chip';
import Container from './Container';
import EntryDate from './Date';
import { Mood, MoodPropsType } from './Mood';

export type Emotion = {
    _id: number,
    name: string
};

export type EntryLogProps = {
    _id: number,
    mood: MoodPropsType,
    emotions: Array<Emotion>,
    comments: string,
    createdAt: Date
};

export const EntryLog: FunctionComponent<EntryLogProps> = ({
    mood,
    comments,
    createdAt,
    emotions
}) => {
    // would normally use moment but for the purposes of this project we will just use js dates.
    const date = new Date(createdAt);
    
    return (
        <Container className='entry'>
            <Row>
                <EntryDate flex={1} date={date} />
                <Mood {...mood} />
            </Row>
            
            {emotions.map(emotion => (
                <Chip key={emotion._id}> { emotion.name } </Chip>
            ))}

            <div style={{ paddingTop: 15 }}>
                {comments}
            </div>
        </Container>
    );
};

export default EntryLog;