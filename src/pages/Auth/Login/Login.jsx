import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { axiosFetch } from '../../../utils';
import { useRecoilState } from 'recoil';
import { userState } from '../../../atoms';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.scss';

const initialState = {
  username: '',
  password: ''
}

const Login = () => {
  const [formInput, setFormInput] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    for(let key in formInput) {
      if(formInput[key] === '') {
        toast.error('Please fill all input fields: ' + key);
        return;
      }
    }

    setLoading(true);
    try {
      const { data } = await axiosFetch.post('/auth/login', formInput);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "😃"
      });
      navigate('/');
    }
    catch ({ response: { data } }) {
      setError(data.message);
      toast.error(data.message, {
        duration: 3000,
      });
    }
    finally {
      setLoading(false);
      setError(null);
    }
  }

  return (
    <div className='login-container'>
      <div className='login-form'>
        <div className="form-wrapper">
          <form onSubmit={handleFormSubmit}>
            <div className="form-header">
              <h1>Sign in</h1>
              <p className="subtitle">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
            
            <div className="input-group">
              <input 
                name='username' 
                placeholder='Enter your username'
                onChange={handleFormInput}
              />
              <FaUser className="input-icon" />
            </div>

            <div className="input-group">
              <input 
                name='password' 
                type='password' 
                placeholder='Enter your password'
                onChange={handleFormInput}
              />
              <FaLock className="input-icon" />
            </div>

            <button disabled={loading} type='submit'>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>

      <div className="login-sidebar">
        <div className="brand">
          <h2>RUHNIX</h2>
          <p>Your Gateway to Professional Services</p>
        </div>
        <div className="welcome-text">
          <h3>Welcome Back!</h3>
          <p>Sign in to access your account and explore our services</p>
        </div>
      </div>
    </div>
  )
}

export default Login