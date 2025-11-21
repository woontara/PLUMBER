import { useState } from 'react';
import { User, Phone, LogOut, Settings, Shield, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(true);
    const [user, setUser] = useState({
        name: 'Hong Gil-dong',
        phone: '010-1234-5678',
        rating: 4.8,
        jobsCount: 124,
        skills: ['Pipe Repair', 'Faucet Replacement', 'Toilet Unclogging']
    });

    const handleLogout = () => {
        // Mock logout logic
        navigate('/login');
    };

    return (
        <div className="mobile-container">
            <header style={{ background: 'var(--surface-color)', padding: '1rem', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>My Profile</h1>
            </header>

            <div className="container" style={{ padding: '1rem' }}>
                {/* User Info Card */}
                <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-color)',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={40} color="var(--text-secondary)" />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{user.name}</h2>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{user.phone}</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                                <span>{user.rating}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rating</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{user.jobsCount}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Jobs</div>
                        </div>
                    </div>
                </div>

                {/* Status Toggle */}
                <div className="card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Availability Status</div>
                        <div style={{ fontSize: '0.875rem', color: isOnline ? 'var(--secondary-color)' : 'var(--text-secondary)' }}>
                            {isOnline ? 'Online (Receiving Jobs)' : 'Offline'}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        style={{
                            width: '48px',
                            height: '28px',
                            borderRadius: '14px',
                            backgroundColor: isOnline ? 'var(--secondary-color)' : 'var(--border-color)',
                            position: 'relative',
                            border: 'none',
                            transition: 'background-color 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: '2px',
                            left: isOnline ? '22px' : '2px',
                            transition: 'left 0.2s',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}></div>
                    </button>
                </div>

                {/* Menu Items */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <button onClick={() => navigate('/wallet')} className="btn btn-full" style={{ justifyContent: 'flex-start', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', borderRadius: 0, color: 'var(--text-primary)' }}>
                        <DollarSign size={20} style={{ marginRight: '0.5rem' }} />
                        <span>My Wallet</span>
                    </button>
                    <button className="btn btn-full" style={{ justifyContent: 'flex-start', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', borderRadius: 0, color: 'var(--text-primary)' }}>
                        <Settings size={20} style={{ marginRight: '0.5rem' }} />
                        <span>Account Settings</span>
                    </button>
                    <button className="btn btn-full" style={{ justifyContent: 'flex-start', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', borderRadius: 0, color: 'var(--text-primary)' }}>
                        <Shield size={20} style={{ marginRight: '0.5rem' }} />
                        <span>Privacy & Security</span>
                    </button>
                    <button onClick={handleLogout} className="btn btn-full" style={{ justifyContent: 'flex-start', background: 'var(--surface-color)', borderRadius: 0, color: 'var(--alert-color)' }}>
                        <LogOut size={20} style={{ marginRight: '0.5rem' }} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
