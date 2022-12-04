<script>
// Create an object to hold the library's functions
var library = {};

// Define a function to collect the page data
library.collectPageData = function() {
    // Create an object to hold the data
    var pageData = {
        currentURL: window.location.href,
        hostname: window.location.hostname,
        path: window.location.pathname,
        urlParams: {},
        userAgent: navigator.userAgent,
        browserName: 'Unknown',
        browserVersion: 'Unknown',
        os: 'Unknown',
        utmParams: {},
        pageTitle: document.title,
        metaDescription: '',
        h1Value: '',
        screenWidth: screen.width,
        screenHeight: screen.height
    };

    // Parse the query string to get all of the URL parameters
    var queryString = window.location.search;
    if (queryString) {
        var queryParams = queryString.substring(1).split('&');
        for (var i = 0; i < queryParams.length; i++) {
            var param = queryParams[i].split('=');
            pageData.urlParams[param[0]] = param[1];
        }
    }

     // Parse the user agent to get the browser name and version
    if (pageData.userAgent.indexOf('Chrome') !== -1) {
        pageData.browserName = 'Chrome';
        pageData.browserVersion = pageData.userAgent.substring(pageData.userAgent.indexOf('Chrome') + 7);
        pageData.browserVersion = pageData.browserVersion.substring(0, pageData.browserVersion.indexOf(' '));
    } else if (pageData.userAgent.indexOf('Safari') !== -1) {
        pageData.browserName = 'Safari';
        pageData.browserVersion = pageData.userAgent.substring(pageData.userAgent.indexOf('Version') + 8);
        pageData.browserVersion = pageData.browserVersion.substring(0, pageData.browserVersion.indexOf(' '));
    } else if (pageData.userAgent.indexOf('Firefox') !== -1) {
        pageData.browserName = 'Firefox';
        pageData.browserVersion = pageData.userAgent.substring(pageData.userAgent.indexOf('Firefox') + 8);
    } else if (pageData.userAgent.indexOf('MSIE') !== -1) {
        pageData.browserName = 'Internet Explorer';
        pageData.browserVersion = pageData.userAgent.substring(pageData.userAgent.indexOf('MSIE') + 5);
        pageData.browserVersion = pageData.browserVersion.substring(0, pageData.browserVersion.indexOf(';'));
    }

    // Parse the user agent to get the operating system
    if (pageData.userAgent.indexOf('Windows') !== -1) {
        pageData.os = 'Windows';
    } else if (pageData.userAgent.indexOf('Mac') !== -1)
{
    pageData.os = 'Mac';
} else if (pageData.userAgent.indexOf('X11') !== -1) {
    pageData.os = 'UNIX';
} else if (pageData.userAgent.indexOf('Linux') !== -1) {
    pageData.os = 'Linux';
}

// Capture any UTMs and their values
if (queryString) {
    var queryParams = queryString.substring(1).split('&');
    for (var i = 0; i < queryParams.length; i++) {
        var param = queryParams[i].split('=');
        if (param[0].startsWith('utm_')) {
            pageData.utmParams[param[0]] = param[1];
        }
    }
}

// Get the page title, meta description, and first h1 value
pageData.metaDescription = document.querySelector('meta[name="description"]').getAttribute('content');
pageData.h1Value = document.querySelector('h1').innerHTML;

// Return the page data
return pageData;
</script>
