import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Wrench, Droplets, AlertTriangle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const SERVICES = [
    { id: 'pipe', label: 'Pipe Repair', icon: Wrench, color: '#0284C7', bg: '#E0F2FE' },
    { id: 'leak', label: 'Leakage', icon: Droplets, color: '#059669', bg: '#DCFCE7' },
    { id: 'clog', label: 'Clogging', icon: AlertTriangle, color: '#EA580C', bg: '#FFEDD5' },
];

const RequestJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleServiceSelect = (serviceId) => {
        setSelectedService(serviceId);
        setStep(2);
    };

    const handleSubmit = async () => {
        if (!selectedService || !location) return;

        setLoading(true);
        try {
            await addDoc(collection(db, 'jobs'), {
                type: SERVICES.find(s => s.id === selectedService)?.label,
                location: location,
                status: 'Pending',
                createdAt: serverTimestamp(),
                customerPhone: '010-1234-5678', // Mock phone for now
                plumberId: null
            });
            alert('Request submitted! Searching for plumbers...');
            navigate('/customer/dashboard');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to submit request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mobile-container">
            <header style={{ background: 'var(--surface-color)', padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <ArrowLeft size={24} color="var(--text-primary)" />
                </button>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Request Service</h1>
            </header>

            <div className="container" style={{ padding: '1rem' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    <div style={{ flex: 1, height: '4px', background: step >= 1 ? 'var(--primary-color)' : 'var(--border-color)', borderRadius: '2px' }}></div>
                    <div style={{ flex: 1, height: '4px', background: step >= 2 ? 'var(--primary-color)' : 'var(--border-color)', borderRadius: '2px' }}></div>
                    <div style={{ flex: 1, height: '4px', background: step >= 3 ? 'var(--primary-color)' : 'var(--border-color)', borderRadius: '2px' }}></div>
                </div>

                {step === 1 && (
                    <>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>What's the problem?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {SERVICES.map(service => (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceSelect(service.id)}
                                    className="card"
                                    style={{
                                        padding: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        border: selectedService === service.id ? `2px solid ${service.color}` : '2px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        backgroundColor: service.bg,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: service.color
                                    }}>
                                        <service.icon size={24} />
                                    </div>
                                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{service.label}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Where is it?</h2>
                        <div className="input-group">
                            <label className="input-label">Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="text"
                                    className="input-field"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="Enter your address"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ height: '200px', backgroundColor: '#e2e8f0', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Map Placeholder</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary btn-full"
                            disabled={!location}
                        >
                            Request Plumber
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RequestJob;
