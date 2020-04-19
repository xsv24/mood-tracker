import React, { useState } from 'react';
import { Router } from '@reach/router';

import config from './config';
import { fetcher } from './api';

import Auth from './routes/Auth';
import Entry from './routes/Entry';
import History from './routes/History';
import useFetch from './hooks/useFetch';
import UserContext, { UserType } from './contexts/UserContext';

import './styles/App.scss';

import ConfigContext from './contexts/ConfigContext';
import Loader from './components/Loader';
import useMount from './hooks/useMount';

function App() {
  
  const [ user, setUser ] = useState<UserType>({
    user: '',
    token: localStorage.getItem('token') || '',
    setUser: updateUser
  });

  const [ appConfig, loading, loadConfig ] = useFetch({
    url: `${config.api}/config`,
    defaultValue: {
      moods: [],
      emotions: []
    }
  });

  useMount(() => {
    fetcher(`${config.api}/verify`, 'POST')
      .then(() => loadConfig())
      .catch(() => {})
  });

  function updateUser(updatedUser) : void {
    if(updatedUser.token) {
      localStorage.setItem('token', updatedUser.token); 
    }

    setUser({
      ...user,
      ...updatedUser
    });
  }

  return (
      <UserContext.Provider value={{
        setUser: updateUser,
        ...user
      }}>
        <ConfigContext.Provider value={appConfig}>
          <header className='App-header'>
          </header>
          <section>
            <Loader loading={loading}>
              <Router>
                  <Auth path='/signin' />
                  <History path='/' />
                  <Entry user={user.user} path='entry' />
              </Router>
            </Loader>
          </section>
        </ConfigContext.Provider>
      </UserContext.Provider>
  );
}

export default App;