import React, { FunctionComponent } from 'react';

import { classes } from '../../utils';
import { IdNameType } from '../../contexts/ConfigContext';
import Row from '../Row';
import './mood.scss';

export type MoodPropsType = {
    _id: number,
    name: string,
    selected?: boolean, 
    select?: (id: number) => void
}

export const Moods: FunctionComponent<{ 
    moods: IdNameType[],
    setMood: (id: number) => void,
    selected: number
}> = ({
    moods = [],
    setMood,
    selected
}) => (
    <Row>
        {moods.map((m: IdNameType) => (
            <Mood key={m._id} 
                select={setMood} 
                selected={m._id === selected} 
                {...m} 
            />
        ))}
    </Row>
);

export const Mood: FunctionComponent<MoodPropsType> = ({
    _id, 
    name,
    selected = true,
    select
} : MoodPropsType ) => (
    <div className={classes('mood', selected && 'selected')}
        onClick={e => select && select(_id)}>
        <img src={`/images/mood/${_id}.svg`} alt={name} />
    </div>
);

export default Moods;