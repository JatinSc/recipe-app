import './App.css';
import Layout from './components/Layout';
import { Routes as Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import CreateRecipe from './pages/CreateRecipe';
function App() {
  return (
    <ToastContextProvider>
    <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreateRecipe />} />
           
          </Switch>
        </Layout>
    </AuthContextProvider>
    </ToastContextProvider>
  );
}

export default App;
