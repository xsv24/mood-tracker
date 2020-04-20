import React, { useState } from 'react';
import { Router } from '@reach/router';
import { ToastProvider } from 'react-toast-notifications'; 

import config from './config';
import { fetcher } from './api';

import Auth from './routes/Auth';
import Entry from './routes/Entry';
import History from './routes/History';
import useFetch from './hooks/useFetch';
import UserContext, { UserType } from './contexts/UserContext';

import './styles/app.scss';

import ConfigContext from './contexts/ConfigContext';
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
      loadConfig();
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
        <ConfigContext.Provider value={{
          ...appConfig,
          loadConfig,
          loading
        }}>
          <header className='App-header'>
          </header>
          <section>
            <ToastProvider>
                <Router>
                    <Auth path='/signin' />
                    <History path='/' />
                    <Entry path='entry' />
                </Router>
            </ToastProvider>
          </section>
        </ConfigContext.Provider>
      </UserContext.Provider>
  );
}

export default App;