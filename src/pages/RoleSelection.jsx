import { useNavigate } from 'react-router-dom';
import { User, Wrench, ShieldCheck } from 'lucide-react';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        // Navigate to login with role state
        navigate('/login', { state: { role } });
    };

    return (
        <div className="mobile-container" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Welcome</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Choose your role to continue</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Customer Role */}
                <button
                    onClick={() => handleRoleSelect('customer')}
                    className="card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1.5rem',
                        border: '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                    }}
                >
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#E0F2FE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                    }}>
                        <User size={24} color="#0284C7" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Customer</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>I need a plumber</p>
                    </div>
                </button>

                {/* Plumber Role */}
                <button
                    onClick={() => handleRoleSelect('plumber')}
                    className="card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1.5rem',
                        border: '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                    }}
                >
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#DCFCE7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                    }}>
                        <Wrench size={24} color="#059669" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Plumber</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>I am a technician</p>
                    </div>
                </button>

                {/* Admin Role */}
                <button
                    onClick={() => handleRoleSelect('admin')}
                    className="card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1.5rem',
                        border: '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                    }}
                >
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                    }}>
                        <ShieldCheck size={24} color="#475569" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Admin</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>System management</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default RoleSelection;
