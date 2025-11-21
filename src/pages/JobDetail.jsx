import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, Camera, ArrowLeft, DollarSign, Navigation, Image as ImageIcon } from 'lucide-react';
import { requestPayment } from '../utils/payment';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('available'); // available, accepted, started, completed
    const [report, setReport] = useState({ description: '', cost: '' });

    // Mock job data
    const job = {
        id,
        title: 'Leaking pipe in kitchen',
        location: 'Gangnam-gu, Seoul (Samsung-dong 123-45)',
        customerName: 'Kim Cheol-su',
        customerPhone: '010-9876-5432',
        price: 150000,
        description: 'Water is flooding the floor. Need immediate assistance. Parking available behind the building.',
        timePosted: '10 mins ago',
        isUrgent: true
    };

    const handleAccept = () => setStatus('accepted');
    const handleStart = () => setStatus('started');

    const handlePayment = () => {
        requestPayment(job, (success, response) => {
            if (success) {
                setStatus('completed');
                alert(`Payment Successful! Paid: ₩${response.paid_amount}`);
            }
        });
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();
        setStatus('completed');
    };

    if (status === 'completed') {
        return (
            <div className="mobile-container" style={{ textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <CheckCircle size={80} color="var(--secondary-color)" style={{ marginBottom: '1.5rem', alignSelf: 'center' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Job Completed!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Payment received.<br />Great work!
                </p>
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-full" style={{ padding: '1rem' }}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="mobile-container" style={{ backgroundColor: 'var(--surface-color)' }}>
            {/* Map Header (30% height) */}
            <div style={{ height: '30vh', position: 'relative', backgroundColor: '#E2E8F0' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={48} color="#94A3B8" />
                </div>

                {/* Back Button */}
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-md)',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={24} color="var(--primary-color)" />
                    </button>
                </div>

                {/* Navigation FAB */}
                <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
                    <button
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            border: 'none',
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-md)',
                            cursor: 'pointer'
                        }}
                    >
                        <Navigation size={24} color="white" />
                    </button>
                </div>
            </div>

            {/* Info Body */}
            <div style={{ padding: '1.5rem', paddingBottom: '100px' }}>
                {/* Photos */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem' }}>
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#F1F5F9',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ImageIcon size={24} color="#94A3B8" />
                        </div>
                    ))}
                </div>

                {/* Title */}
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                    {job.title}
                </h1>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <MapPin size={20} color="var(--text-secondary)" />
                    <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{job.location}</span>
                </div>

                {/* Description */}
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Request Details</h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                    {job.description}
                </p>

                {/* Price */}
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <span className="text-price" style={{ fontSize: '2rem' }}>
                        ₩ {job.price.toLocaleString()}
                    </span>
                </div>

                {/* Customer Info (Visible after accept) */}
                {status !== 'available' && (
                    <div className="card" style={{ borderLeft: '4px solid var(--primary-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{job.customerName}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>{job.customerPhone}</div>
                        </div>
                        <a href={`tel:${job.customerPhone}`} className="btn btn-secondary" style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}>
                            <Phone size={24} />
                        </a>
                    </div>
                )}

                {/* Reporting Section */}
                {status === 'started' && (
                    <div className="card">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Job Report</h3>
                        <form onSubmit={handleSubmitReport}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Final Cost</label>
                                <input type="number" defaultValue={job.price} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Work Description</label>
                                <textarea rows="3" placeholder="Describe what was done..."></textarea>
                            </div>
                            <button type="button" onClick={handlePayment} className="btn btn-primary btn-full" style={{ backgroundColor: '#6366f1', padding: '1rem' }}>
                                <DollarSign size={20} style={{ marginRight: '0.5rem' }} />
                                Request Payment (1 KRW)
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Sticky Bottom Action */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxWidth: '480px',
                margin: '0 auto',
                padding: '1rem',
                backgroundColor: 'white',
                borderTop: '1px solid var(--border-color)',
                zIndex: 100
            }}>
                {status === 'available' && (
                    <button onClick={handleAccept} className="btn btn-primary btn-full" style={{ height: '56px', fontSize: '1.1rem' }}>
                        Accept Job
                    </button>
                )}
                {status === 'accepted' && (
                    <button onClick={handleStart} className="btn btn-secondary btn-full" style={{ height: '56px', fontSize: '1.1rem' }}>
                        Start Job (Arrived)
                    </button>
                )}
                {status === 'started' && (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: '600' }}>
                        Job in Progress...
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetail;
