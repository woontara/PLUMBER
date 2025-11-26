import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Phone, Lock, ArrowRight } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [role, setRole] = useState('plumber'); // Default to plumber

    useEffect(() => {
        if (location.state?.role) {
            setRole(location.state.role);
        }
    }, [location]);

    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login logic
        console.log(`Logging in as ${role}...`);
        // if (setIsAuthenticated) setIsAuthenticated(true); // Temporarily disabled

        if (role === 'customer') {
            navigate('/customer/dashboard');
        } else if (role === 'admin') {
            window.location.href = '/admin/dashboard'; // Force navigation
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="mobile-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Sign in as <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{role.toUpperCase()}</span></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="tel"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="010-1234-5678"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '1rem' }}>
                        <span>Login</span>
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
                    <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Register now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
