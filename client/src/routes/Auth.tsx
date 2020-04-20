import React, { FunctionComponent, useState, useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router'
import { useToasts } from 'react-toast-notifications';

import Row from '../components/Row';
import Col from '../components/Col';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';

import config from '../config';
import useFetch from '../hooks/useFetch';
import Label from '../components/Label';
import Loader from '../components/Loader';

import UserContext from '../contexts/UserContext';

const Auth: FunctionComponent<RouteComponentProps> = () => {
    const { setUser } = useContext(UserContext);
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const [ res, loading, authenticate  ] = useFetch({
        method: 'POST',
        body: { email, password }
    });

    function onSuccess(user) {
        setUser(user);
        addToast('Logged In', { appearance: 'success', autoDismiss: true });
        navigate('/');
    }

    function onError(err) {
        addToast(err, { appearance: 'error', autoDismiss: true });
    }

    function onLogin() : void {
        authenticate(`${config.api}/signin`, { email, password })
            .then(onSuccess)
            .catch(onError);
    }

    function onRegister() : void {
        authenticate(`${config.api}/signup`, { email, password })
            .then(onSuccess)
            .catch(onError);
    }

    return (
        <Row flex={1} justify="center">

            <Col flex={0.4} 
                justify='flex-start' 
                align='flex-start'
                style={{ minWidth: 120, padding: 10  }}
            >
                
                <h2> LOGIN </h2>

                <Form onSubmit={onLogin}>
                    <Input 
                        name='email' 
                        label='Email'
                        type='email' 
                        value={email} 
                        onChange={setEmail} 
                    />
                    
                    <Input 
                        name='password' 
                        label='Password'
                        type='password'
                        value={password} 
                        onChange={setPassword} 
                    />
                    
                    <Label color={res.error && 'danger'}>
                        {res.error}
                    </Label>

                    <Row style={{width: '100%', paddingTop: '1rem' }}>
                        <Button type='submit' style={{ flex: 1 }}> 
                            Login 
                        </Button>
                        <Button style={{ flex: 1 }} color='secondary' onClick={onRegister}> 
                            Register 
                        </Button>
                    </Row>
                </Form>
            </Col>
            <Loader loading={loading} />
        </Row>
    );
};

export default Auth;