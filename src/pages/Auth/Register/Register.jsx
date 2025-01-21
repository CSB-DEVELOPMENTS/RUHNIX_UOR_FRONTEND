import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosFetch, generateImageURL } from '../../../utils';
import { Loader } from '../../../components';
import './Register.scss';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaFileAlt, FaImage } from 'react-icons/fa';

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
    <div className="register-container">
      <div className="register-sidebar">
        <div className="brand">
          <h2>RUHNIX</h2>
          <p>Your Gateway to Professional Services</p>
        </div>
        <div className="steps-progress">
          <div className="steps">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`step-indicator ${currentStep >= step ? 'active' : ''}`}>
                <div className="step-number">{step}</div>
                <span>{step === 1 ? 'Account' : step === 2 ? 'Profile' : 'Details'}</span>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="welcome-text">
          <h3>Join Our Community!</h3>
          <p>Create your account and start exploring professional services tailored for you</p>
        </div>
      </div>

      <div className="register-form">
        <div className="form-wrapper">
          {loading ? <Loader size={32} /> : (
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="step step-1">
                  <div className="form-header">
                    <h1>Create Account</h1>
                    <p className="subtitle">Already have an account? <Link to="/login">Sign in</Link></p>
                  </div>

                  <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                      name="email"
                      type="email"
                      value={formInput.email}
                      placeholder="Your Email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                      name="username"
                      type="text"
                      value={formInput.username}
                      placeholder="Choose Username"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                      name="password"
                      type="password"
                      placeholder="Create Password"
                      value={formInput.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="button-group">
                    {formLoading ? <Loader size={20} /> : (
                      <button type="button" onClick={handleNext}>Continue</button>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step step-2">
                  <div className="form-header">
                    <h1>Profile Setup</h1>
                    <p className="subtitle">Let's set up your profile</p>
                  </div>

                  <div className="file-upload-group">
                    <label htmlFor="fileInput" className="file-upload-label">
                      <FaImage className="upload-icon" />
                      <span>Upload Profile Picture</span>
                    </label>
                    <input
                      className="file-upload"
                      type="file"
                      id="fileInput"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                    {image && <div className="file-name">{image.name}</div>}
                  </div>

                  <div className="input-group">
                    <FaPhone className="input-icon" />
                    <input
                      name="phone"
                      type="text"
                      value={formInput.phone}
                      placeholder="+1 (234) 567-8900"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="button-group">
                    <button type="button" className="previous" onClick={handlePrevious}>Back</button>
                    <button type="button" onClick={handleNext}>Continue</button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step step-3">
                  <div className="form-header">
                    <h1>Final Details</h1>
                    <p className="subtitle">Complete your profile setup</p>
                  </div>

                  <div className="switch-group">
                    <label>Activate Seller Account</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="isSeller"
                        checked={formInput.isSeller}
                        onChange={handleChange}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="input-group">
                    <FaFileAlt className="input-icon textarea-icon" />
                    <textarea
                      placeholder="Tell us about yourself..."
                      name="description"
                      value={formInput.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="button-group">
                    <button type="button" className="previous" onClick={handlePrevious}>Back</button>
                    <button type="submit">Create Account</button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
