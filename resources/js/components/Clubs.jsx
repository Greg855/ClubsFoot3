import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                // API may return an array or an object (e.g. { data: [...] }) depending on controller.
                const payload = res.data;
                const list = Array.isArray(payload) ? payload : (payload?.data || []);
                setClubs(list);
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
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center">
                                                {club.image && (
                                                    <div className="me-3 d-none d-md-block">
                                                        <img src={club.image.startsWith('http') ? club.image : `/storage/${club.image}`} alt={club.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="card-title mb-1 fw-bold" style={{ fontSize: '1.15rem' }}>{club.name}</h4>
                                                    <p className="card-text mb-1"><small className="text-muted">{club.city}</small></p>
                                                    <p className="card-text mb-2"><small>Joueurs: {club.joueurs ? club.joueurs.length : 0} • Matches: {club.matches_played ?? 0}</small></p>
                                                </div>

                                                <div className="ms-auto d-flex align-items-center">
                                                    <Link to={`/clubs/${club.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Éditer</Link>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={async () => {
                                                            if (!window.confirm(`Supprimer le club "${club.name}" ?`)) return;
                                                            try {
                                                                const token = localStorage.getItem('token');
                                                                await axios.delete(`/api/clubs/${club.id}`, {
                                                                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                                                                });
                                                                setClubs(prev => prev.filter(c => c.id !== club.id));
                                                            } catch (err) {
                                                                console.error(err);
                                                                alert('Échec de la suppression');
                                                            }
                                                        }}
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Link to={`/clubs/${club.id}`} className="btn btn-primary btn-sm">Voir</Link>
                                            </div>
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
