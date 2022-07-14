import { createContext, useContext } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useHistory } from 'react-router-dom';
import callAPI from '../../utility';

const IdleTimerContext = createContext({});

export default function IdleTimer ({ children }) {
  const history = useHistory();

  // deconnexion
  function logout(e){
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    localStorage.setItem("user_session", null);
    callAPI('post', '/user/logout', {}, (data) => {
      history.push('/back/login');
    });
  }

  const onPrompt = () => {
    // Fire a Modal Prompt
  }

  const onIdle = () => {
    // Close Modal Prompt
    // Do some idle action like log out your user
    logout();
  }

  const onActive = (event) => {
    // Close Modal Prompt
    // Do some active action
  }

  const onAction = (event) => {
    // Do something when a user triggers a watched event
  }

  const {
    start,
    reset,
    activate,
    pause,
    resume,
    isIdle,
    isPrompted,
    isLeader,
    getTabId,
    getRemainingTime,
    getElapsedTime,
    getLastIdleTime,
    getLastActiveTime,
    getTotalIdleTime,
    getTotalActiveTime
  } = useIdleTimer({
    onPrompt,
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * 15,// milliseconds * seconds * minutes,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange'
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    name: 'idle-timer',
    syncTimers: 0,
    leaderElection: false
  });

  return(
    <IdleTimerContext.Provider value={ { logout } }>
      <>{ children }</>
    </IdleTimerContext.Provider>
  );
}

export const useIdleTimerContext = () => useContext(IdleTimerContext);