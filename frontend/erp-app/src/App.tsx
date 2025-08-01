
import './App.css'
import { ProfileProvider } from './contexts/ProfileContext'
import useTokenHandler from './hooks/useTokenHandler'

import { Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import ManageUsers from './pages/super-admin/ManageUsers'
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
    <Routes>
     <Route path="/" element={<Login />} />
     <Route
          path="/dashboard/*"
          element={
            <Dashboard />
          }
        >
        <Route path="manage-users" element={<ManageUsers />} />

        </Route>
    </Routes>
    
    </>
  );
};

export default App
