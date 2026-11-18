/* Maps is loaded only after Cookiebot reports marketing consent. */
(() => {
    function render() {
        const ready = typeof window.Cookiebot?.renew === 'function';
        const allowed = window.Cookiebot?.consent?.marketing === true;
        document.querySelectorAll('[data-privacy-settings]').forEach(button => {
            button.hidden = !ready;
        });
        document.querySelectorAll('[data-map-src]').forEach(panel => {
            const placeholder = panel.querySelector('.map-placeholder');
            let frame = panel.querySelector('iframe');
            if (allowed && !frame) {
                frame = document.createElement('iframe');
                frame.title = 'Mappa del Nintai Dojo alla palestra Palangela';
                frame.height = '360';
                frame.loading = 'lazy';
                frame.referrerPolicy = 'no-referrer-when-downgrade';
                frame.allowFullscreen = true;
                frame.src = panel.dataset.mapSrc;
                panel.appendChild(frame);
            } else if (!allowed && frame) {
                frame.remove();
            }
            placeholder.hidden = allowed;
        });
    }
    ['CookiebotOnConsentReady', 'CookiebotOnAccept', 'CookiebotOnDecline', 'CookiebotOnDialogInit'].forEach(name => {
        window.addEventListener(name, render);
    });
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-privacy-settings]').forEach(button => {
            button.addEventListener('click', () => window.Cookiebot?.renew());
        });
        render();
    });
})();
