import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps, Link } from '@reach/router';

import config from '../config';
import { between } from '../utils';
import useFetch from '../hooks/useFetch';
import ConfigContext, { MoodType } from '../contexts/ConfigContext';

import EntryLog, { EntryLogProps } from '../components/EntryLog';
import Loader from '../components/Loader';
import { ButtonImg } from '../components/Button';
import Container from '../components/Container';
import Col from '../components/Col';
import Row from '../components/Row';
import { Mood } from '../components/Mood';
import Percent from '../components/Percent'

type HistoryHeaderPropsType = {
    moods: MoodType[],
    entries: any[]
};

export const HistoryHeader: FunctionComponent<HistoryHeaderPropsType> = ({
    entries = [],
    moods = []
}) => {

    const total = entries.reduce((total: number, l : EntryLogProps) : number => (
        total + l.mood._id
    ), 0);

    const avg = total && entries.length
        ? (total / entries.length)
        : 0;
    
    const avgMood = avg && moods.find(m => m._id === between(Math.round(avg), 1, moods.length - 1));
    const winningMood = (avg / total * 100).toFixed(1);

    return (
        <Row flex={1}>
            <Col flex={1} align='center'>

                {entries.length > 0 && avgMood && (
                    <>
                        <Percent percent={winningMood} color={avgMood.color} />
                        <Mood {...avgMood} />
                    </>
                )}    
                
                <Link to='/entry' style={{ alignSelf: 'flex-start' }}>
                    <ButtonImg color='secondary' img='/images/add.svg'> 
                        Add New Entry
                    </ButtonImg>
                </Link> 
            </Col>
        </Row>
    );
};

const History: FunctionComponent<RouteComponentProps> = () => {
    const { moods } = useContext(ConfigContext);

    const [ entries, loading ] = useFetch({
        url: `${config.api}/entry`,
        method: 'GET',
        defaultValue: [],
        onMount: true
    });

    return (
        <Loader loading={loading}>
            <Container main>
                <Container>
                    <HistoryHeader moods={moods} entries={entries} />
                </Container>

                {!entries.length && (
                    <h3> Currently no entries ...  </h3>
                )}
                
                {entries.map((entry: EntryLogProps) => (
                    <EntryLog key={entry._id} {...entry} />
                ))}

            </Container>
        </Loader>
    );
};

export default History