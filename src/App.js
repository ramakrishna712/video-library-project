import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter, Route,Routes,Link } from 'react-router-dom';
import { VideoLibraryHome } from './components/video-library-home';
import { Signout } from './components/admin-signout';
import { UserRegister } from './components/user-register';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideo } from './components/admin-add-video';
import { useCookies } from 'react-cookie';
import { EditVideo } from './components/edit-video';
import { AdminDeleteVideo } from './components/delete-video';
import { UserLogin } from './components/user-login';
import { UserDashBoard } from './components/user-dashboard';
import { WatchLater } from './components/watch-later-vidoes';
import { UserLoginError } from './components/user-error';
import { AdminError } from './components/admin-error';

function App() {

  const [cookies] = useCookies('admin-id');
  return (
    <div className="container-fluid bg-light text-dark min-vh-100">
    <BrowserRouter>
    <header className="navbar navbar-expand-lg navbar-dark bg-dark p-3 sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand btn btn-danger d-flex align-items-center" to="/">
      Video<span className="bi bi-play-circle-fill ms-1"></span>Library
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
     
      <div className="ms-auto d-flex justify-content-end">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"type="button"id="loginDropdown"data-bs-toggle="dropdown"aria-expanded="false">
            Login
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
            <li>
              <Link className="dropdown-item" to="/user-login">
                <i className="bi bi-person-fill me-2"></i>User Login
              </Link>
            </li>
            <li>
              {cookies['admin-id'] === undefined ? (
                <Link className="dropdown-item" to="/admin-login">
                  <i className="bi bi-person-fill me-2"></i>Admin Login
                </Link>
              ) : (
                <Signout />
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</header>

    


      <section className='mt-4'>
        <Routes>
          <Route path='/' element={<VideoLibraryHome/>} />
          <Route path='admin-login' element={<AdminLogin/>} />
          <Route path='admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='admin-error' element={<AdminError/>} />
          <Route path='add-video' element={<AddVideo/>} />
          <Route path='edit-video/:id' element={<EditVideo/>} />
          <Route path='delete-video/:id' element={<AdminDeleteVideo/>} />
          <Route path='register-user' element={<UserRegister/>} />
          <Route path='user-login' element={<UserLogin/>} />
          <Route path='user-dashboard' element={<UserDashBoard/>} />
          <Route path='user-error' element={<UserLoginError/>} />
          <Route path='watch-later' element={<WatchLater/>} />
        </Routes>
      </section>
      </BrowserRouter>
      
    </div>
    
   
  );
}

export default App;
