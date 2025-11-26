import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Activity, Settings, LogOut, MapPin, AlertCircle } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState([
        { label: 'Total Revenue', value: '₩ 0', icon: DollarSign, color: '#10B981' },
        { label: 'Active Jobs', value: '0', icon: Activity, color: '#3B82F6' },
        { label: 'Online Plumbers', value: '0', icon: Users, color: '#F59E0B' },
    ]);
    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() => {
        // Real-time listener for jobs
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'), limit(10));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Calculate Stats
            const activeJobsCount = jobs.filter(job => job.status === 'Pending' || job.status === 'In Progress').length;
            // Mock revenue calculation (e.g., completed jobs * avg price)
            const completedJobsCount = jobs.filter(job => job.status === 'Completed').length;
            const revenue = completedJobsCount * 50000; // Mock avg price

            setStats([
                { label: 'Total Revenue', value: `₩ ${revenue.toLocaleString()}`, icon: DollarSign, color: '#10B981' },
                { label: 'Active Jobs', value: activeJobsCount.toString(), icon: Activity, color: '#3B82F6' },
                { label: 'Online Plumbers', value: '12', icon: Users, color: '#F59E0B' }, // Mock value for now
            ]);

            setRecentJobs(jobs);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1E293B', color: '#F8FAFC' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#0F172A', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38BDF8' }}>Admin Pro</h1>
                    <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Control Center</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <button style={{ width: '100%', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                <Activity size={20} />
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <button style={{ width: '100%', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', color: '#94A3B8', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                <Users size={20} />
                                <span>Users</span>
                            </button>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <button style={{ width: '100%', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', color: '#94A3B8', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                <Settings size={20} />
                                <span>Settings</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                <button
                    onClick={() => navigate('/')}
                    style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', color: '#EF4444', border: 'none', cursor: 'pointer' }}
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Dashboard Overview</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#94A3B8' }}>Admin User</span>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={20} />
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{ backgroundColor: '#334155', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: `${stat.color}20`, color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>{stat.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div style={{ backgroundColor: '#334155', borderRadius: '1rem', padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Live Job Monitor</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#E2E8F0' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #475569', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', color: '#94A3B8' }}>Type</th>
                                    <th style={{ padding: '1rem', color: '#94A3B8' }}>Location</th>
                                    <th style={{ padding: '1rem', color: '#94A3B8' }}>Status</th>
                                    <th style={{ padding: '1rem', color: '#94A3B8' }}>Plumber</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentJobs.map(job => (
                                    <tr key={job.id} style={{ borderBottom: '1px solid #475569' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AlertCircle size={16} color="#38BDF8" />
                                            {job.type}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={16} color="#94A3B8" />
                                                {job.location}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                backgroundColor: job.status === 'Completed' ? '#059669' : job.status === 'In Progress' ? '#2563EB' : '#D97706',
                                                color: 'white'
                                            }}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{job.plumberId || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
