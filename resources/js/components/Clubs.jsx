import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Clubs() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function fetchClubs() {
            try {
                setLoading(true);
                const res = await axios.get('/api/clubs');
                if (!mounted) return;
                setClubs(res.data || []);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'Échec du chargement des clubs');
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchClubs();
        return () => { mounted = false; };
    }, []);

    if (loading) return <div>Chargement des clubs...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container">
            <h1>Clubs</h1>
            {(!clubs || clubs.length === 0) ? (
                <p>Aucun club enregistré.</p>
            ) : (
                <div className="row">
                    {clubs.map(club => (
                        <div key={club.id} className="col-md-6 mb-3">
                            <div className="card h-100">
                                <div className="row g-0">
                                    {club.image && (
                                        <div className="col-auto">
                                            <img src={club.image.startsWith('http') ? club.image : `/storage/${club.image}`} alt={club.name} className="img-fluid rounded-start" style={{ width: 120, height: 120, objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title">{club.name}</h5>
                                            <p className="card-text mb-1"><small className="text-muted">{club.city}</small></p>
                                            <p className="card-text">
                                                <small>Joueurs: {club.joueurs ? club.joueurs.length : 0} • Matches: {club.matches_played ?? 0}</small>
                                            </p>
                                            <a href={`/clubs/${club.id}`} className="btn btn-primary">Voir</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
