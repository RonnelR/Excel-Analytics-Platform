

import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import LandingPage from './Pages/LandingPage';
import PageNotFound from './Pages/PageNotFound';
import AdminDashboard from './Pages/Admin Pages/AdminDashboard';
import UserDashboard from './Pages/User Pages/UserDashboard';
import Forgotpassword from './Pages/ForgotPassword';
function App() {
  return (
    <div className="App">
     <>
     <Routes>
      <Route path='/login' element={<LoginPage/>}  />
      <Route path='/registraion' element={<RegistrationPage/>}  />
      <Route path='/' element={<LandingPage/>}  />
      <Route path='*' element={<PageNotFound/>}  />
      <Route path='/adminDashboard' element={<AdminDashboard/>}  />
      <Route path='/dashboard' element={<UserDashboard/>}  />
      <Route path='/forgot-password' element={<Forgotpassword/>}  />


     </Routes>
     </>
    </div>
  );
}

export default App;
