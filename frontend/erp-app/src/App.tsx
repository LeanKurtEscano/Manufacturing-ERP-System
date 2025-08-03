
import './App.css'
import { ProfileProvider } from './contexts/ProfileContext'
import useTokenHandler from './hooks/useTokenHandler'

import { Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import ManageUsers from './pages/super-admin/ManageUsers'
import ManageProducts from './pages/inventory-manager/ManageProducts'
import { ProductProvider } from './contexts/ProductContext'
function App() {
 

  return (
    <ProductProvider>
 <ProfileProvider>
      <Main />
    </ProfileProvider>

    </ProductProvider>
   
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
         <Route path="manage-products" element={<ManageProducts />} />

        </Route>
    </Routes>
    
    </>
  );
};

export default App
