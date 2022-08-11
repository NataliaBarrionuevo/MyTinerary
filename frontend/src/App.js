import './styles/App.css';
import "swiper/css/bundle";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import {Route,Routes} from 'react-router-dom';
import Index from './pages/Index';
import Cities from './pages/Cities';
import Details from './pages/Details';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ScrollToTop from "react-scroll-to-top";
//Para Redux
import { useEffect } from 'react';

import citiesActions from './redux/actions/citiesActions';
import { useDispatch,useSelector} from 'react-redux';

//ALERT:

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usersActions from './redux/actions/usersActions'

//importo acciones de redux

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(citiesActions.getCities());
   //eslint-disable-next-line
  }, []);

  const user = useSelector(store => store.usersReducer.user)
  // console.log(user) 
  useEffect(() => {
      if(localStorage.getItem('token')!== null) {
          const token = localStorage.getItem("token")
          // console.log(token)
          dispatch(usersActions.verifyToken(token))
      }
      //eslint-disable-next-line
  },[])

  return (
    <div className="App">
    
      <header>
             <NavBar/>
        </header>

        <main>
          
          <Routes className="rutas">
               <Route path='/index' element={ <Index/> }/>
               <Route path='/cities' element={ <Cities/> }/>
               <Route path='/' element={ <Index/> }/>
               <Route path='/city/:id' element={ <Details/> }/>
               <Route path='/signup' element={ <SignUp/> }/>
               {/* <Route path='/login' element={ <LogIn/> }/> */}
               {user ? <Route path='/login' element={<Index />} /> : <Route path='/login' element={<LogIn />} />} 

               
                                
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
                  
        </main>
  
        <footer>
             <Footer/>
        </footer>
        <ScrollToTop
         smooth
         color='white'
        />
    
        
    </div>
  );
}


export default App;


