import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Bell } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener for pending jobs
        const q = query(
            collection(db, 'jobs'),
            where('status', '==', 'Pending'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJobs(jobList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching jobs: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAcceptJob = (jobId) => {
        navigate(`/job/${jobId}`);
    };

    return (
        <div className="mobile-container">
            {/* Header */}
            <header className="app-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Job Board</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', opacity: 0.9 }}>
                        <MapPin size={14} />
                        <span>Seoul, Gangnam-gu</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Bell size={24} />
                        <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', backgroundColor: 'var(--alert-color)', borderRadius: '50%' }}></span>
                    </div>
                </div>
            </header>

            {/* Online Status Toggle */}
            <div className="container" style={{ marginTop: '-1rem', position: 'relative', zIndex: 10 }}>
                <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>You are Online</span>
                    <div style={{ width: '48px', height: '24px', backgroundColor: 'var(--success-color)', borderRadius: '12px', position: 'relative' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                    </div>
                </div>

                {/* Filter Chips */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    {['All Jobs', 'Near Me', 'High Pay', 'Urgent'].map((filter, index) => (
                        <button key={index} style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: index === 0 ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: index === 0 ? 'white' : 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            fontSize: '0.875rem'
                        }}>
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Job List */}
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Available Jobs ({jobs.length})
                </h2>

                {loading ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <p>No jobs available right now.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '80px' }}>
                        {jobs.map(job => (
                            <div key={job.id} className="card" onClick={() => handleAcceptJob(job.id)} style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        backgroundColor: '#E0F2FE',
                                        color: '#0284C7',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {job.type || 'Repair'}
                                    </span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={14} />
                                        Just now
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                    {job.type} at {job.location}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                    <MapPin size={16} />
                                    <span>{job.location}</span>
                                    <span>•</span>
                                    <span>0.5 km</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                        ₩ 50,000 <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>est.</span>
                                    </span>
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
