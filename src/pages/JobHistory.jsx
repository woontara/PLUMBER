import { Calendar, DollarSign, ChevronRight } from 'lucide-react';

const MOCK_HISTORY = [
    {
        id: 101,
        date: '2023-10-25',
        location: 'Gangnam-gu, Seoul',
        price: 150000,
        status: 'Completed'
    },
    {
        id: 102,
        date: '2023-10-24',
        location: 'Seocho-gu, Seoul',
        price: 80000,
        status: 'Completed'
    },
    {
        id: 103,
        date: '2023-10-23',
        location: 'Songpa-gu, Seoul',
        price: 120000,
        status: 'Completed'
    },
    {
        id: 104,
        date: '2023-10-22',
        location: 'Gangnam-gu, Seoul',
        price: 200000,
        status: 'Completed'
    }
];

const JobHistory = () => {
    const totalEarnings = MOCK_HISTORY.reduce((sum, job) => sum + job.price, 0);
    const totalJobs = MOCK_HISTORY.length;

    return (
        <div className="mobile-container">
            <header style={{ background: 'var(--surface-color)', padding: '1rem', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Job History</h1>
            </header>

            <div className="container" style={{ padding: '1rem' }}>
                {/* Summary Card */}
                <div className="card" style={{ background: 'var(--primary-color)', color: 'white', marginBottom: '1.5rem', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Total Earnings</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₩{totalEarnings.toLocaleString()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Jobs Done</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalJobs}</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                        This Week (Oct 22 - Oct 28)
                    </div>
                </div>

                <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Recent Jobs</h2>

                {MOCK_HISTORY.map(job => (
                    <div key={job.id} className="card" style={{ marginBottom: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{job.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <Calendar size={14} />
                                <span>{job.date}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>₩{job.price.toLocaleString()}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{job.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobHistory;
