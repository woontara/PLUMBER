import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const isUrgent = job.isUrgent;

    const goToDetail = () => {
        navigate(`/job/${job.id}`);
    };

    return (
        <div
            className="card"
            onClick={goToDetail}
            style={{
                marginBottom: '1rem',
                borderLeft: isUrgent ? '4px solid var(--secondary)' : '1px solid var(--slate-100)',
                cursor: 'pointer'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                        <MapPin size={16} color="var(--slate-500)" />
                        <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{job.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--slate-500)', fontSize: '0.875rem' }}>
                        <Clock size={14} />
                        <span>{job.timePosted}</span>
                        {isUrgent && (
                            <span style={{
                                backgroundColor: '#fef3c7',
                                color: '#d97706',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                marginLeft: '0.5rem'
                            }}>
                                URGENT
                            </span>
                        )}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        ₩{job.price.toLocaleString()}
                    </div>
                </div>
            </div>

            <p style={{ color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: '1.5' }}>
                {job.description}
            </p>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    goToDetail();
                }}
                className="btn btn-primary btn-full"
            >
                <span>View Details</span>
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default JobCard;
