
import './App.css'
import { ProfileProvider } from './contexts/ProfileContext'
import useTokenHandler from './hooks/useTokenHandler'

import { Route,Routes } from 'react-router-dom'
function App() {
 

  return (
    <ProfileProvider>
      <Main />
    </ProfileProvider>
  )
}

const Main:React.FC = () => {
  useTokenHandler();
  return (
    <>
    
    
    </>
  );
};

export default App
