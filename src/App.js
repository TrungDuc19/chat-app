import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage';
import Login from './pages/login/login';
import AuthProvider from './context/auth-provider';
import AppProvider from './context/app-provider';
import AddRoomModal from './components/add-room-modal/addRoomModal';
import InviteMemberModal from './components/invite-member-modal/invite-member-modal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
