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
import AdminPrivate from './Comonents/Layouts/Routes/AdminPrivate';
import AllFiles from './Pages/Admin Pages/AllFiles';
import AllUsers from './Pages/Admin Pages/AllUser';
import ProfilePage from './Pages/Profile';
import { Toaster } from "react-hot-toast";



function App() {
  return (

    
      <div className="App">
    
     <>
     <Routes>
      <Route path='/login' element={<LoginPage/>}  />
      <Route path='/registraion' element={<RegistrationPage/>}  />
      <Route path='/' element={<LandingPage/>}  />
      <Route path='*' element={<PageNotFound/>}  />


    {/* nested routes for admin routes   */}
 <Route path='/dashboard' element={<AdminPrivate/>} >
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/All-files' element={<AllFiles/>}/>
      <Route path='admin/All-users' element={<AllUsers/>}/>
      </Route>

    {/* nested routes for user rou`tes   */}
      <Route path='/dashboard' element={<Private/>} >
      <Route path='user' element={<UserDashboard/>}  />
      <Route path='user/Upload-file' element={<UploadFile/>}  />
      <Route path='user/Uploaded-files' element={<UploadedFile/>}  />
      <Route path='user/visualization' element={<VisualizationPage/>}  />
 
      </Route>

   {/* nested routes for profile Page*/}
      <Route path='/profile' element={<Private/>} >
      <Route path='' element={<ProfilePage/>}  />
    
      </Route>

     
  
      <Route path='/forgot-password' element={<Forgotpassword/>}  />

     </Routes>
     </>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
   


    
  );
}

export default App;
