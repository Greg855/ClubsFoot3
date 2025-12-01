import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="app-root">
            <Navbar />
            <header className="hero py-5">
                <div className="container">
                    <h1 className="hero-title">Here are the Premier League teams!</h1>
                    <p className="hero-sub">List of clubs</p>
                </div>
            </header>

            <main className="py-4">
                {children}
            </main>
        </div>
    );
}
