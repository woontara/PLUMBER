import { NavLink } from 'react-router-dom';
import { Home, Map, Clock, User } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Jobs' },
        { path: '/map', icon: Map, label: 'Map' },
        { path: '/history', icon: Clock, label: 'History' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
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
            {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    style={({ isActive }) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? '600' : '500',
                        gap: '4px'
                    })}
                >
                    <Icon size={24} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
