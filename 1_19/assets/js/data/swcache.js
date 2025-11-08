const resource = [
    /* --- CSS --- */
    '/1_19/assets/css/style.css',

    /* --- PWA --- */
    '/1_19/app.js',
    '/1_19/sw.js',

    /* --- HTML --- */
    '/1_19/index.html',
    '/1_19/404.html',

    
        '/1_19/spells/',
    
        '/1_19/spellbooks/',
    
        '/1_19/armor/',
    
        '/1_19/curios/',
    
        '/1_19/items/',
    
        '/1_19/blocks/',
    
        '/1_19/structures/',
    
        '/1_19/progression/',
    
        '/1_19/schools/',
    
        '/1_19/gallery/',
    
        '/1_19/developers/',
    
        '/1_19/changelog/',
    

    /* --- Favicons & compressed JS --- */
    
    
        '/1_19/assets/img/favicons/android-chrome-192x192.png',
        '/1_19/assets/img/favicons/android-chrome-512x512.png',
        '/1_19/assets/img/favicons/apple-touch-icon.png',
        '/1_19/assets/img/favicons/favicon-16x16.png',
        '/1_19/assets/img/favicons/favicon-32x32.png',
        '/1_19/assets/img/favicons/favicon.ico',
        '/1_19/assets/img/favicons/mstile-150x150.png',
        '/1_19/assets/js/dist/categories.min.js',
        '/1_19/assets/js/dist/commons.min.js',
        '/1_19/assets/js/dist/misc.min.js',
        '/1_19/assets/js/dist/page.min.js',
        '/1_19/assets/js/dist/post.min.js'
];

/* The request url with below domain will be cached */
const allowedDomains = [
    
        'www.googletagmanager.com',
        'www.google-analytics.com',
    

    '0.0.0.0:4000',

    

    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
    
];

