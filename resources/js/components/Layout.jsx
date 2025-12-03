import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
    const { t } = useTranslation();

    useEffect(() => {
        // Load jQuery if not already loaded
        if (!window.jQuery) {
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
            jqueryScript.async = true;
            document.head.appendChild(jqueryScript);
        }

        // Load jQuery UI if not already loaded
        if (!window.jQuery || !window.jQuery.ui) {
            const jqueryUIScript = document.createElement('script');
            jqueryUIScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js';
            jqueryUIScript.async = true;
            document.head.appendChild(jqueryUIScript);
        }
    }, []);

    return (
        <div>
            <Navbar />
            <main className="py-4">
                {children}
            </main>
        </div>
    );
}
