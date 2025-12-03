import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export default function EditClub({ clubId: propClubId }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        city: '',
        matches_played: 0,
        matches_won: 0,
        matches_lost: 0,
        matches_drawn: 0,
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    function getIdFromPath() {
        if (propClubId) return propClubId;
        const parts = window.location.pathname.split('/').filter(Boolean);
        const idx = parts.indexOf('clubs');
        if (idx !== -1 && parts.length > idx + 1) return parts[idx + 1];
        return parts.length ? parts[parts.length - 1] : null;
    }

    const id = getIdFromPath();

    useEffect(() => {
        let mounted = true;
        async function fetchClub() {
            if (!id) {
                setErrors('Club id not found');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const res = await axios.get(`/api/clubs/${id}`);
                if (!mounted) return;
                const data = res.data;
                setForm({
                    name: data.name || '',
                    city: data.city || '',
                    matches_played: data.matches_played ?? 0,
                    matches_won: data.matches_won ?? 0,
                    matches_lost: data.matches_lost ?? 0,
                    matches_drawn: data.matches_drawn ?? 0,
                });
                // set preview to existing image if available
                if (data.image) {
                    setPreviewSrc(data.image.startsWith('http') ? data.image : `/storage/${data.image}`);
                }
            } catch (err) {
                setErrors(err.response?.data?.error || 'Impossible de charger le club');
            } finally {
                setLoading(false);
            }
        }

        fetchClub();
        return () => { mounted = false };
    }, [id, propClubId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        setImageFile(file || null);
        if (!file) {
            // keep existing preview if any
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setPreviewSrc(ev.target.result);
        reader.readAsDataURL(file);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setErrors(null);

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('city', form.city);
        formData.append('matches_played', form.matches_played);
        formData.append('matches_won', form.matches_won);
        formData.append('matches_lost', form.matches_lost);
        formData.append('matches_drawn', form.matches_drawn);
        if (imageFile) formData.append('image', imageFile);
        // Laravel method override for PUT when sending multipart/form-data
        formData.append('_method', 'PUT');

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.post(`/api/clubs/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...headers
                }
            });

            // Redirect to the club page
            navigate(`/clubs/${id}`);
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data.errors || err.response.data);
            } else {
                setErrors({ message: 'Erreur réseau ou serveur' });
            }
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="container">Chargement...</div>;

    return (
        <div className="container">
            <h1>Modifier le club</h1>

            {errors && (
                <div className="alert alert-danger">
                    <pre style={{ margin: 0 }}>{JSON.stringify(errors, null, 2)}</pre>
                </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Nom du club</label>
                    <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ville</label>
                    <input className="form-control" name="city" value={form.city} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Matches joués</label>
                    <input className="form-control" name="matches_played" value={form.matches_played} onChange={handleChange} type="number" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Matches gagnés</label>
                    <input className="form-control" name="matches_won" value={form.matches_won} onChange={handleChange} type="number" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Matches perdus</label>
                    <input className="form-control" name="matches_lost" value={form.matches_lost} onChange={handleChange} type="number" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Matches nuls</label>
                    <input className="form-control" name="matches_drawn" value={form.matches_drawn} onChange={handleChange} type="number" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image du club</label>
                    <input className="form-control" name="image" type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                {previewSrc && (
                    <div className="mb-3">
                        <label className="form-label">Preview</label>
                        <div>
                            <img src={previewSrc} alt="preview" style={{ maxWidth: '220px', maxHeight: '160px' }} className="img-fluid img-thumbnail" />
                        </div>
                    </div>
                )}

                <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? 'Envoi...' : 'Sauvegarder'}
                </button>
                <Link to={`/clubs/${id}`} className="btn btn-secondary ms-2">Annuler</Link>
            </form>
        </div>
    );
}
