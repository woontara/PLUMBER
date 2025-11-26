import { useNavigate } from 'react-router-dom';
import { Plus, Clock, MapPin, User } from 'lucide-react';

const CustomerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="mobile-container">
            <header style={{ background: 'var(--primary-color)', padding: '1.5rem 1rem', color: 'white' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Hello, Customer!</h1>
                <p style={{ opacity: 0.9 }}>Need a plumber today?</p>
            </header>

            <div className="container" style={{ padding: '1rem', marginTop: '-2rem' }}>
                {/* Request Card */}
                <div className="card" style={{ padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#E0F2FE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: '#0284C7'
                    }}>
                        <Plus size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>New Repair Request</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Find a professional plumber near you</p>
                    <button
                        onClick={() => navigate('/customer/request')}
                        className="btn btn-primary btn-full"
                    >
                        Request Now
                    </button>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>Active Requests</h3>

                {/* Empty State */}
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <Clock size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>No active requests at the moment.</p>
                </div>
            </div>

            {/* Bottom Nav (Customer Specific) */}
            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60px',
                backgroundColor: 'var(--surface-color)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                zIndex: 100,
                maxWidth: '480px',
                margin: '0 auto'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--primary-color)', gap: '4px' }}>
                    <Plus size={24} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Request</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)', gap: '4px' }}>
                    <Clock size={24} />
                    <span style={{ fontSize: '0.75rem' }}>History</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)', gap: '4px' }}>
                    <User size={24} />
                    <span style={{ fontSize: '0.75rem' }}>Profile</span>
                </div>
            </nav>
        </div>
    );
};

export default CustomerDashboard;
