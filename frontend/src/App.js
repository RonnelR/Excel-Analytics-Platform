import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import LandingPage from './Pages/LandingPage';
import PageNotFound from './Pages/PageNotFound';
import AdminDashboard from './Pages/Admin Pages/AdminDashboard';
import UserDashboard from './Pages/User Pages/UserDashboard';
import Forgotpassword from './Pages/ForgotPassword';
import UploadFile from './Pages/User Pages/UploadFile';
import UploadedFile from './Pages/User Pages/UploadedFile';
import Private from './Comonents/Layouts/Routes/Private';
import VisualizationPage from './Pages/VisualizationPage';


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

    {/* nested routes for private routes   */}
      <Route path='/dashboard' element={<Private/>} >
      <Route path='user' element={<UserDashboard/>}  />
      <Route path='user/Upload-file' element={<UploadFile/>}  />
 <Route path='user/visualization' element={<VisualizationPage/>}  />
      </Route>

    
      <Route path='/Uploaded-files' element={<UploadedFile/>}  />
      <Route path='/forgot-password' element={<Forgotpassword/>}  />

     </Routes>
     </>
    </div>
  );
}

export default App;
