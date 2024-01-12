import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className='container flex-grow-1 mb-3'>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
         <Outlet />
        </div>
        <Footer/>
      </div>    
    </>
  )
}

export default observer(App); // Kan nu komma åt mina egenskaper i store

