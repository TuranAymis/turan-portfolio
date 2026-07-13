import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://turanaymis.com';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    type?: string;
    structuredData?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    url,
    image,
    type = 'website',
    structuredData: customStructuredData
}) => {
    const { pathname } = useLocation();

    // Build a per-page canonical URL: root stays "/" (no trailing path),
    // other routes become /about, /skills, etc. Strip any trailing slash.
    const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
    const canonicalUrl = `${SITE_ORIGIN}${normalizedPath || '/'}`;

    // Default values
    const defaultTitle = 'Turan Aymis | Software QA Engineer';
    const defaultDescription = 'Portfolio of Turan Aymis, a Software QA Engineer specializing in Test Automation (Selenium, Appium), API Testing, and E2E validation.';
    const defaultKeywords = 'QA Engineer, Yazılım Test Mühendisi, Automation, Selenium, Appium, Turan Aymış, Portfolio';
    const defaultImage = 'https://turanaymis.com/og-preview.png';

    const seoTitle = title || defaultTitle;
    const seoDescription = description || defaultDescription;
    const seoKeywords = keywords || defaultKeywords;
    const seoUrl = url || canonicalUrl;
    const seoImage = image || defaultImage;

    // JSON-LD Structured Data for Person Schema
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Turan Aymis",
        "alternateName": "Turan Aymış",
        "jobTitle": "Software QA Engineer",
        "description": "Software QA Engineer specializing in Test Automation, API Testing, and E2E validation with 7+ years of experience",
        "url": "https://turanaymis.com",
        "image": seoImage,
        "sameAs": [
            "https://www.linkedin.com/in/turan-aymis/",
            "https://github.com/TuranAymis"
        ],
        "knowsAbout": [
            "Test Automation",
            "Selenium WebDriver",
            "Appium",
            "API Testing",
            "Quality Assurance",
            "End-to-End Testing",
            "Java",
            "Python",
            "Postman",
            "Agile Testing"
        ],
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Kocaeli University",
            "sameAs": "https://www.kocaeli.edu.tr/"
        },
        "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "name": "CS50x: Introduction to Computer Science",
            "credentialCategory": "certificate",
            "recognizedBy": {
                "@type": "EducationalOrganization",
                "name": "Harvard University"
            }
        }
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="title" content={seoTitle} />
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />
            <meta name="author" content="Turan Aymis" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={seoUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Turan Aymis Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={seoUrl} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:creator" content="@turanaymis" />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
            {customStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(customStructuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
