import React from 'react';

export default function Navbar() {
    const isLoggedIn = window?.laravel?.isLoggedIn ?? false;
    const locale = window?.laravel?.user?.locale || 'en';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-purple py-3">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src="/images/premierleague.webp" width="64" height="56" alt="logo" style={{ marginRight: 12 }} />
                    <span>Premier League</span>
                </a>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <div className="language">
                        <a href="/lang/fr"><img src="/images/fr.png" width="28" height="18" alt="Fr" /></a>
                        <a href="/lang/en" style={{ marginLeft: 6 }}><img src="/images/en.png" width="28" height="18" alt="En" /></a>
                        <a href="/lang/jp" style={{ marginLeft: 6 }}><img src="/images/jp.png" width="28" height="18" alt="Jp" /></a>
                    </div>

                    {!isLoggedIn ? (
                        <>
                            <a className="nav-link text-light" href="/login">Login</a>
                            <a className="nav-link text-light" href="/register">Register</a>
                        </>
                    ) : (
                        <a className="nav-link text-light" href="#" onClick={(e) => { e.preventDefault(); document.getElementById('logout-form')?.submit(); }}>Logout</a>
                    )}

                    <a className="nav-link text-light" href="/apropos">About</a>
                </div>
            </div>
        </nav>
    );
}
