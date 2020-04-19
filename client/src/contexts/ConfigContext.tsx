import React from 'react';

export type IdNameType = {
    _id: number,
    name: string
};

export interface MoodType extends IdNameType {
    color: string
};

export type ConfigType = {
    moods: MoodType[],
    emotions: IdNameType[]
};

const ConfigContext = React.createContext<ConfigType>({
    moods: [],
    emotions: []
});

export default ConfigContext;