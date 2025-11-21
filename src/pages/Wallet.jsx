import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
    const navigate = useNavigate();

    const transactions = Array.from({ length: 10 }).map((_, idx) => ({
        id: idx,
        title: idx % 2 === 0 ? 'Faucet Replacement' : 'Toilet Unclogging',
        date: `2023.10.${20 - idx}`,
        amount: idx % 2 === 0 ? 80000 : 150000
    }));

    return (
        <div className="mobile-container">
            <header style={{
                backgroundColor: 'var(--primary-color)',
                padding: '1rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>My Wallet</h1>
            </header>

            <div className="container">
                {/* Summary Card */}
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, #334155 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Available Balance</span>
                        <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>Withdraw &gt;</span>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', fontFeatureSettings: '"tnum"' }}>
                        ₩ 452,000
                    </div>
                </div>

                {/* Transaction List */}
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>Recent Transactions</h3>
                    {transactions.map((tx) => (
                        <div key={tx.id} style={{
                            padding: '1rem 0',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>{tx.title}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tx.date}</div>
                            </div>
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: 'var(--secondary-color)',
                                fontFeatureSettings: '"tnum"'
                            }}>
                                + {tx.amount.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
