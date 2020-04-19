import React, { FunctionComponent, useState, FormEvent, useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';

import { fetcher } from '../api';
import config from '../config';
import ConfigContext from '../contexts/ConfigContext';
import useSelector from '../hooks/useSelector';

import Moods from '../components/Mood';
import Emotions from '../components/Emotions';
import Button from '../components/Button';
import Container from '../components/Container';
import Loading from '../components/Loader';

interface EntryProps extends RouteComponentProps {
    user: string
}

// I would usually use a library such as Formik or create my own form library to handle validation and submission
// For the case of this project I have just done it manually

const Entry: FunctionComponent<EntryProps> = () => {
    const navigate = useNavigate();
    const { moods, emotions } = useContext(ConfigContext);

    const [ mood, setMood ] = useState(4);
    const [ loading, setLoading ] = useState(false);
    const [ comments, setComments ] = useState('');
    const [ emotionOpts, { toggle, selected } ] = useSelector(emotions);

    function onSubmit(e: FormEvent) {
        e.preventDefault();

        setLoading(true);

        fetcher(`${config.api}/entry`, 'POST', {
            mood,
            emotions: selected.map(s => s._id),
            comments: comments.trim()
        })
            .then((res) => {
                console.log(res)
                 navigate('/')
            })
            .catch(() => alert('An error processing a request'))
            .finally(() => setLoading(false))
    }


    return (
        <Container main>
            <Loading loading={loading} />
            <h2>Mood</h2>

            <form onSubmit={onSubmit}> 
                <Container>
                    <Moods moods={moods} setMood={setMood} selected={mood} />
                </Container>
                <Container>
                    <Emotions emotions={emotionOpts} toggle={toggle} />
                </Container>

                <Container>
                    <textarea 
                        placeholder='Enter optional comment here...'
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        rows={8}
                    />
                </Container>

                <Button type='submit' disabled={!selected.length}>
                    Save
                </Button>
            </form>
            
        </Container>
    );
};

export default Entry;