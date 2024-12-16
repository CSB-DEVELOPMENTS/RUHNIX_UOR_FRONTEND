import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosFetch, generateImageURL } from '../../../utils';
import { Loader } from '../../../components';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);  
  const [currentStep, setCurrentStep] = useState(1);
  const progressPercentage = (currentStep / 3) * 100;

  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    phone: '',
    description: '',
    isSeller: false,
  });

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!formInput.username || !formInput.email || !formInput.password) {
        toast.error('Please fill all required fields.');
        return;
      }
      const userExists = await checkUserExistance();
      setFormLoading(false);
      if (userExists) return;
    } else if (currentStep === 2 && (!formInput.phone || formInput.phone.length < 9)) {
      toast.error('Please enter a valid phone number.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const checkUserExistance = async () => {
    setFormLoading(true);
    try {
      const { data } = await axiosFetch.post('/auth/check', { email: formInput.email, username: formInput.username });
      if (data.error) {
        toast.error(data.message);
        return true;
      }
      return false;
    } catch ({ response: { data } }) {
      toast.error(data.message);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(currentStep !== 3) return;
    if (!formInput.description) {
      toast.error('Please provide a description.');
      return;
    }
    setLoading(true);
    try {
      //const url = await generateImageURL(image);
      const { data } = await axiosFetch.post('/auth/register', { ...formInput, image: "tempurl" });
      toast.success('Registration successful!');
      setLoading(false);
      navigate('/login');
    } catch ({ response: { data } }) {
      toast.error(data.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormInput({
      ...formInput,
      [name]: inputValue
    });
  };

  return (
    <div className="register">{loading ? <Loader size={32} /> : (
      <>
      
      <form onSubmit={handleSubmit}>
        {/* Progress Bar */}
      <div className="progress-bar">
      <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
    </div>
        {currentStep === 1 && (
          <div className="step step-1">
            <h1>Create a new account</h1>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formInput.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={formInput.username}
              placeholder="Your Username"
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formInput.password}
              onChange={handleChange}
            />
            <div className="button-group">{formLoading ? <Loader size={20} /> : (
              <button type="button" onClick={handleNext}>Next</button>
              )}
            </div>
            <p>
              Already have an account? <Link to='/login'>Sign in</Link>
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step step-2">
            <h1>Profile Details</h1>
            <label>Profile Picture</label>
            <input
              className="file-upload"
              type="file"
              id="fileInput"
              onChange={(event) => setImage(event.target.files[0])}
            />
            <label htmlFor="fileInput" className="file-upload-label">
              Upload Image
            </label>

            {image && <div className="file-name">{image.name}</div>}

            <label>Phone Number</label>
            <input
              name="phone"
              type="text"
              value={formInput.phone}
              placeholder="+1 1234 567 890"
              onChange={handleChange}
            />
            <div className="button-group">
              <button type="button" className="previous" onClick={handlePrevious}>Previous</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step step-3">
            <h1>Seller Information</h1>
            <label>Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                name="isSeller"
                checked={formInput.isSeller}
                onChange={handleChange}
              />
              <span className="slider round"></span>
            </label>
            <label>Description</label>
            <textarea
              placeholder="A short description of yourself"
              name="description"
              value={formInput.description}
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <div className="button-group">
              <button type="button" className="previous" onClick={handlePrevious}>Previous</button>
              <button type="submit">Finish</button>
            </div>
          </div>
        )}
      </form></>)}
      
    </div>
  );
};

export default Register;
