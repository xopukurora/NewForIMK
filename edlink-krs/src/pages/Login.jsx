import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Lock, AlertCircle } from 'lucide-react';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'mahasiswa' && password === 'kampus123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <GraduationCap size={60} className="login-logo" />
          <h1>EDLINK</h1>
          <p>Sistem Informasi Akademik</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              <User size={18} />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username kampus"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={18} />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Masuk
          </button>

          <div className="login-hint">
            <p>Demo: username: <strong>mahasiswa</strong> | password: <strong>kampus123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
