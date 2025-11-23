import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setErrors(null);
        try {
            const res = await axios.post('/api/login', form);
            const body = res.data;
            // login controller may return token in body.token or in array first element
            const token = body.token || (Array.isArray(body) && (body[0]?.token || body['0']?.token));
            if (token) {
                localStorage.setItem('token', token);
                window.location.href = '/';
                return;
            }
            setErrors(body.errors || body.message || body);
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data.errors || err.response.data);
            } else {
                setErrors({ message: 'Network error' });
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="container py-4">
            <h1>Login</h1>

            {errors && (
                <div className="alert alert-danger">
                    <pre style={{ margin: 0 }}>{JSON.stringify(errors, null, 2)}</pre>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="form-control" type="email" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" value={form.password} onChange={handleChange} className="form-control" type="password" required />
                </div>

                <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
            </form>
        </div>
    );
}
