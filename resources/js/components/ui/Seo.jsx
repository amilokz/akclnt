import React from 'react';


export default function Seo({ title, description, path = '', image }) {
    const base = 'https://akclnt.com';
    const url = base + path;
    const img = image || `${base}/og-image.jpg`;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

           
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={img} />

           
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={img} />
        </>
    );
}