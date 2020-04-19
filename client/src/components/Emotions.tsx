import React, { FunctionComponent } from 'react';

import Chip from './Chip';

type EmotionsProps = {
    emotions: any[],
    toggle: (id: number) => void
}

export const Emotions: FunctionComponent<EmotionsProps> = ({
    emotions,
    toggle
}) => (
    <>
        {emotions.map((emotion, i) => (
            <Chip key={emotion._id} onClick={() => toggle(i)} selected={emotion.selected}>
                {emotion.name}
            </Chip>
        ))}
    </>
);

export default Emotions;