import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEdit,
  faCamera,
  faEnvelope,
  faPhone,
  faLocationDot,
  faCrown,
  faCheckCircle,
  faChartLine,
  faStar,
  faBriefcase,
  faCalendarAlt,
  faPlus,
  faTrash,
  faAward,
  faCertificate,
  faGraduationCap,
  faHandshake,
  faCode
} from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';

// Reusable Components
const ProfileHeader = ({ user, isEditing, onEditClick, onImageUpload }) => {
  const fileInputRef = useRef(null);
  
  return (
    <div className="profile-header">
      <div className="cover-photo">
        <img src={user.coverImage} alt="Cover" />
        {isEditing && (
          <button className="change-cover" onClick={() => fileInputRef.current?.click()}>
            <FontAwesomeIcon icon={faCamera} /> 
            <span>Change Cover</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => onImageUpload('cover', e)}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </button>
        )}
      </div>
      
      <div className="profile-info">
        <div className="avatar-container">
          <div className="avatar" onClick={isEditing ? () => fileInputRef.current?.click() : undefined}>
            <img src={user.avatar} alt={user.firstName} />
            {user.isPro && <span className="pro-badge"><FontAwesomeIcon icon={faCrown} /></span>}
            {isEditing && (
              <div className="avatar-overlay">
                <FontAwesomeIcon icon={faCamera} />
                <span>Change Photo</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        <div className="user-details">
          <h1>
            {`${user.firstName} ${user.lastName}`}
            {user.isPro && (
              <div className="pro-member-badge">
                <FontAwesomeIcon icon={faCrown} />
                Pro Member
              </div>
            )}
          </h1>
          <p className="username">@{user.username}</p>
          <div className="verification-badges">
            {user.verifications.map((badge, index) => (
              <VerificationBadge key={index} type={badge.type} verified={badge.verified} />
            ))}
          </div>
        </div>

        <button className="edit-profile" onClick={onEditClick}>
          <FontAwesomeIcon icon={faEdit} />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

const VerificationBadge = ({ type, verified }) => (
  <span className={`verification-badge ${verified ? 'verified' : 'pending'}`}>
    <FontAwesomeIcon icon={type === 'Email' ? faEnvelope : type === 'Phone' ? faPhone : faCheckCircle} />
    {`${type} ${verified ? 'Verified' : 'Pending'}`}
  </span>
);

const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <FontAwesomeIcon icon={icon} />
    <div>
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  </div>
);

const mockData = {
  firstName: 'Nimnada',
  lastName: 'Kavishwara',
  username: 'nimnada_nk',
  email: 'nimnada@ruhnix.com',
  phone: '+94 77 123 4567',
  location: 'Colombo, Sri Lanka',
  bio: 'Full-stack developer passionate about creating innovative solutions. Experienced in modern web technologies and cloud platforms.',
  isPro: true,
  avatar: '/default-avatar.jpg',
  coverImage: '/default-cover.jpg',
  stats: {
    rating: 4.9,
    projects: 156,
    views: 1234,
    responseRate: 98
  },
  verifications: [
    { type: 'Email', verified: true },
    { type: 'Phone', verified: true },
    { type: 'ID', verified: false }
  ],
  skills: [
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'AWS', level: 'Advanced' },
    { name: 'Docker', level: 'Intermediate' }
  ],
  achievements: [
    { 
      icon: faStar, 
      title: 'Top Rated Seller',
      description: 'Maintained 4.9+ rating for 6 months'
    },
    { 
      icon: faAward, 
      title: 'Rising Talent',
      description: 'Recognized for exceptional growth'
    },
    { 
      icon: faHandshake, 
      title: 'Quick Responder',
      description: '98% response rate'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon',
      year: '2023',
      icon: faCertificate
    },
    {
      name: 'Full Stack Development',
      issuer: 'University of Ruhuna',
      year: '2022',
      icon: faCode
    }
  ],
  education: [
    {
      institution: 'University of Ruhuna',
      degree: 'BSc in Computer Science',
      year: '2019-2023',
      icon: faGraduationCap
    }
  ]
};

const AchievementsSection = ({ achievements }) => (
  <div className="achievements-section">
    <h3>Achievements & Recognition</h3>
    <div className="achievements-grid">
      {achievements.map((achievement, index) => (
        <div key={index} className="achievement-card">
          <FontAwesomeIcon icon={achievement.icon} className="achievement-icon" />
          <div className="achievement-info">
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = ({ skills, isEditing }) => (
  <div className="skills-section">
    <div className="section-header">
      <h3>Skills & Expertise</h3>
      {isEditing && (
        <button className="add-skill-btn">
          <FontAwesomeIcon icon={faPlus} /> Add Skill
        </button>
      )}
    </div>
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div key={index} className="skill-item">
          <div className="skill-display">
            <span className="skill-name">{skill.name}</span>
            <span className={`skill-level ${skill.level.toLowerCase()}`}>
              {skill.level}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(mockData);

  const handleEditToggle = () => setIsEditing(!isEditing);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle image upload
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <ProfileHeader 
          user={profileData}
          isEditing={isEditing}
          onEditClick={handleEditToggle}
          onImageUpload={handleImageUpload}
        />

        <div className="profile-content">
          <div className="profile-tabs">
            <button 
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FontAwesomeIcon icon={faUser} /> Profile
            </button>
          </div>

          <div className="profile-body">
            <div className="stats-grid">
              <StatCard icon={faStar} label="Rating" value={`${profileData.stats.rating}/5.0`} />
              <StatCard icon={faBriefcase} label="Projects" value={profileData.stats.projects} />
              <StatCard icon={faChartLine} label="Profile Views" value={profileData.stats.views} />
              <StatCard icon={faCheckCircle} label="Response Rate" value={`${profileData.stats.responseRate}%`} />
            </div>

            {isEditing ? (
              <ProfileEditForm 
                data={profileData} 
                onSubmit={(data) => {
                  setProfileData(data);
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <ProfileInfo data={profileData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({ data }) => (
  <div className="profile-info-section">
    <div className="info-grid">
      <div className="info-item">
        <FontAwesomeIcon icon={faUser} />
        <div>
          <h3>Full Name</h3>
          <p>{`${data.firstName} ${data.lastName}`}</p>
        </div>
      </div>
      <div className="info-item">
        <FontAwesomeIcon icon={faEnvelope} />
        <div>
          <h3>Email</h3>
          <p>{data.email}</p>
        </div>
      </div>
      <div className="info-item">
        <FontAwesomeIcon icon={faPhone} />
        <div>
          <h3>Phone</h3>
          <p>{data.phone}</p>
        </div>
      </div>
      <div className="info-item">
        <FontAwesomeIcon icon={faLocationDot} />
        <div>
          <h3>Location</h3>
          <p>{data.location}</p>
        </div>
      </div>
    </div>
    
    <div className="bio-section">
      <h3>About Me</h3>
      <p>{data.bio}</p>
    </div>

    <SkillsSection skills={data.skills} isEditing={false} />
    <AchievementsSection achievements={data.achievements} />
  </div>
);

const ProfileEditForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(data);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [type === 'cover' ? 'coverImage' : 'avatar']: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill({ name: '', level: 'Beginner' });
      setShowAddSkill(false);
    }
  };

  const handleRemoveSkill = (skillName) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.name !== skillName)
    }));
  };

  return (
    <form className="edit-form" onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>About Me</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
        />
      </div>

      <div className="skills-edit-section">
        <div className="section-header">
          <h3>Skills & Expertise</h3>
          <button type="button" className="add-skill-btn" onClick={() => setShowAddSkill(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Skill
          </button>
        </div>

        <div className="skills-grid">
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-edit-item">
              <span className="skill-name">{skill.name}</span>
              <select
                value={skill.level}
                onChange={(e) => {
                  const updatedSkills = [...formData.skills];
                  updatedSkills[index].level = e.target.value;
                  setFormData(prev => ({ ...prev, skills: updatedSkills }));
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button type="button" className="remove-btn" onClick={() => handleRemoveSkill(skill.name)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>

        {showAddSkill && (
          <div className="add-skill-form">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
            />
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <div className="action-buttons">
              <button type="button" className="add-btn" onClick={handleAddSkill}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
              <button type="button" className="cancel-btn" onClick={() => setShowAddSkill(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">Save Changes</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default Profile;
