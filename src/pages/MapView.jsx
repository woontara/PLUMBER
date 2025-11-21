import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MOCK_JOBS = [
    {
        id: 1,
        location: 'Gangnam-gu, Seoul',
        lat: 37.5172,
        lng: 127.0473,
        price: 150000,
        description: 'Leaking pipe in kitchen.'
    },
    {
        id: 2,
        location: 'Seocho-gu, Seoul',
        lat: 37.4837,
        lng: 127.0324,
        price: 80000,
        description: 'Faucet replacement.'
    },
    {
        id: 3,
        location: 'Songpa-gu, Seoul',
        lat: 37.5145,
        lng: 127.1066,
        price: 120000,
        description: 'Toilet clogged.'
    }
];

const MapView = () => {
    const navigate = useNavigate();

    return (
        <div className="mobile-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ background: 'white', padding: '1rem', borderBottom: '1px solid var(--slate-200)', zIndex: 10 }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Job Map</h1>
            </header>

            <div style={{ flex: 1 }}>
                <MapContainer center={[37.5172, 127.0473]} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {MOCK_JOBS.map(job => (
                        <Marker key={job.id} position={[job.lat, job.lng]}>
                            <Popup>
                                <div style={{ minWidth: '150px' }}>
                                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{job.location}</h3>
                                    <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>{job.description}</p>
                                    <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                        ₩{job.price.toLocaleString()}
                                    </div>
                                    <button
                                        onClick={() => navigate(`/job/${job.id}`)}
                                        className="btn btn-primary btn-full"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapView;
