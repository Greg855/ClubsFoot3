import React, { useState } from 'react';
import axios from 'axios';

export default function AddClub() {
    const [form, setForm] = useState({
        name: '',
        city: '',
        matches_played: '',
        matches_won: '',
        matches_lost: '',
        matches_drawn: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        setImageFile(file || null);
        if (!file) {
            setPreviewSrc(null);
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

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const res = await axios.post('/api/clubs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...headers
                }
            });

            window.location.href = '/';
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data.errors || err.response.data);
            } else {
                setErrors({ message: 'Network or server error' });
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="container">
            <h1>Ajouter un club</h1>

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
                    {submitting ? 'Envoi...' : 'Publier'}
                </button>
            </form>
        </div>
    );
}
