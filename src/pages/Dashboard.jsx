import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bell, Menu, Circle, ChevronDown } from 'lucide-react';

const MOCK_JOBS = [
    {
        id: 1,
        title: 'Leaking pipe in kitchen',
        location: 'Gangnam-gu, Seoul',
        distance: '1.2km',
        price: 150000,
        timePosted: '10 mins ago',
        isUrgent: true
    },
    {
        id: 2,
        title: 'Faucet replacement',
        location: 'Seocho-gu, Seoul',
        distance: '3.5km',
        price: 80000,
        timePosted: '25 mins ago',
        isUrgent: false
    },
    {
        id: 3,
        title: 'Toilet clogged',
        location: 'Songpa-gu, Seoul',
        distance: '5.0km',
        price: 120000,
        timePosted: '1 hour ago',
        isUrgent: false
    }
];

const FILTERS = ['All', 'Urgent', 'Reserved', 'Near Me'];

const Dashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [selectedFilter, setSelectedFilter] = useState(0);

    return (
        <div className="mobile-container">
            {/* Top Navigation (Navy Bg) */}
            <header style={{
                backgroundColor: 'var(--primary-color)',
                padding: '1rem',
                paddingTop: '1.5rem',
                paddingBottom: '1.5rem',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: 'var(--shadow-md)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="white" />
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Gangnam-gu <ChevronDown size={18} />
                    </span>
                </div>

                {/* Status Indicator */}
                <div style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <Circle size={10} fill="var(--secondary-color)" color="var(--secondary-color)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Online</span>
                </div>
            </header>

            {/* Filter Chips */}
            <div style={{
                backgroundColor: 'var(--bg-color)',
                padding: '1rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                display: 'flex',
                gap: '0.5rem'
            }}>
                {FILTERS.map((filter, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedFilter(index)}
                        style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '24px',
                            border: selectedFilter === index ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                            backgroundColor: selectedFilter === index ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: selectedFilter === index ? 'white' : 'var(--primary-color)',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Job List */}
            <div className="container" style={{ paddingTop: 0 }}>
                {jobs.map(job => (
                    <div
                        key={job.id}
                        className="card"
                        onClick={() => navigate(`/job/${job.id}`)}
                        style={{ cursor: 'pointer', border: 'none' }}
                    >
                        {/* Top Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            {job.isUrgent ? (
                                <span className="badge badge-urgent">URGENT</span>
                            ) : (
                                <span></span>
                            )}
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                {job.distance}
                            </span>
                        </div>

                        {/* Middle */}
                        <h3 className="text-title" style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
                            {job.title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <MapPin size={16} />
                            <span style={{ fontSize: '0.9rem' }}>{job.location}</span>
                        </div>

                        {/* Bottom Right */}
                        <div style={{ textAlign: 'right' }}>
                            <span className="text-price">
                                ₩ {job.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
