import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'job',
        title: 'New Job Available',
        message: 'A new pipe repair job is available in Gangnam-gu.',
        time: '2 mins ago',
        read: false
    },
    {
        id: 2,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance tonight at 2 AM.',
        time: '1 hour ago',
        read: true
    },
    {
        id: 3,
        type: 'payment',
        title: 'Payment Received',
        message: 'You received ₩150,000 for Job #101.',
        time: 'Yesterday',
        read: true
    },
    {
        id: 4,
        type: 'job',
        title: 'Job Canceled',
        message: 'Customer canceled Job #105.',
        time: 'Yesterday',
        read: true
    }
];

const Notifications = () => {
    const navigate = useNavigate();

    const getIcon = (type) => {
        switch (type) {
            case 'job': return <Bell size={20} color="var(--primary-color)" />;
            case 'payment': return <CheckCircle size={20} color="var(--secondary-color)" />;
            case 'system': return <Info size={20} color="var(--text-secondary)" />;
            default: return <AlertCircle size={20} color="var(--alert-color)" />;
        }
    };

    return (
        <div className="mobile-container">
            <header style={{ background: 'var(--surface-color)', padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <ArrowLeft size={24} color="var(--text-primary)" />
                </button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Notifications</h1>
            </header>

            <div className="container" style={{ padding: '1rem' }}>
                {MOCK_NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className="card" style={{
                        marginBottom: '0.75rem',
                        padding: '1rem',
                        display: 'flex',
                        gap: '1rem',
                        backgroundColor: notif.read ? 'var(--surface-color)' : '#f0f9ff',
                        borderLeft: notif.read ? 'none' : '4px solid var(--primary-color)'
                    }}>
                        <div style={{
                            minWidth: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {getIcon(notif.type)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{notif.title}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{notif.time}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                                {notif.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
