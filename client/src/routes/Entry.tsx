import React, { FunctionComponent, useState, useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useToasts } from 'react-toast-notifications';

import { fetcher } from '../api';
import config from '../config';
import ConfigContext from '../contexts/ConfigContext';
import useSelector from '../hooks/useSelector';

import Moods from '../components/Mood';
import Emotions from '../components/Emotions';
import Button from '../components/Button';
import Container from '../components/Container';
import Form from '../components/Form';
import Loading from '../components/Loader';

// I would usually use a library such as Formik or create my own form library to handle validation and submission
// For the case of this project I have just done it manually

const Entry: FunctionComponent<RouteComponentProps> = () => {
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const { moods, emotions, configLoading } = useContext(ConfigContext);

    const [ mood, setMood ] = useState(4);
    const [ loading, setLoading ] = useState(false);
    const [ comments, setComments ] = useState('');
    const [ emotionOpts, { toggle, selected } ] = useSelector(emotions);

    function onSubmit() {
        setLoading(true);

        fetcher(`${config.api}/entry`, 'POST', {
            mood,
            emotions: selected.map(s => s._id),
            comments: comments.trim()
        })
            .then((res) => {
                addToast('Entry Created', { appearance: 'success', autoDismiss: true });
                navigate('/')
            })
            .catch((err) => addToast(err, { appearance: 'error', autoDismiss: true }))
            .finally(() => setLoading(false))
    }
    
    return (
        <Container main>
            <Loading loading={loading || configLoading} />
            <h2>Mood</h2>

            <Form onSubmit={onSubmit}> 
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
            </Form>
            
        </Container>
    );
};

export default Entry;