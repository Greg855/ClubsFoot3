import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();
    return (
        <div className="container py-4">
            <h1>{t('AboutPageHeader')}</h1>

            <h4>{t('AuthorName')}</h4>

            <p>
                <strong>{t('CourseTitle1')}</strong>
                <br />
                {t('CourseTitle2')}
            </p>

            <h5>{t('UsageStepsTitle')}</h5>
            <ol>
                <li>{t('UsageStep1')}</li>
                <li>{t('UsageStep2')}</li>
                <li>{t('UsageStep3')}</li>
                <li>{t('UsageStep4')}</li>
                <li>{t('UsageStep5')}</li>
                <li>{t('UsageStep6')}</li>
            </ol>

            <h5>{t('DBDiagramTitle')}</h5>
            <pre style={{ background: '#f8f9fa', border: '1px solid #ddd', padding: 10, whiteSpace: 'pre-wrap' }}>
{t('DBDiagram')}
            </pre>

            <h5>{t('ReferencesTitle')}</h5>
            <p>{t('References')}</p>

            <a href="/" className="btn btn-secondary">{t('RetourAccueil')}</a>
        </div>
    );
}
