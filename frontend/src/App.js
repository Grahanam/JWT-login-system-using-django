import {Route,Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

//pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import Header from './components/Header';

function App() { 
  return (
    <AuthProvider>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} exact/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
