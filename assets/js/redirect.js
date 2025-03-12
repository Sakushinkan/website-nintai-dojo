(function() {
    // Controlla se il protocollo è HTTP invece di HTTPS
    if (window.location.protocol !== "https:") {
        window.location.href = "https://" + window.location.hostname + window.location.pathname;
        return;
    }

    // Controlla se il dominio contiene 'www.'
    if (window.location.hostname.startsWith("www.")) {
        window.location.href = "https://" + window.location.hostname.replace("www.", "") + window.location.pathname;
        return;
    }

    // Controlla se l'URL termina con '/index.html'
    if (window.location.pathname.endsWith("/index.html")) {
        window.location.href = window.location.origin + window.location.pathname.replace("/index.html", "/");
    }
})();