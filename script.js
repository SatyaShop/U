// script.js
(function() {
    // Mendapatkan path URL
    const path = window.location.pathname;

    // Cek apakah path bukan '/' (root) atau 'index.html'
    if (path !== '/' && path !== '/index.html') {
        // Redirect ke halaman utama (index.html)
        window.location.href = '/index.html';
    }

    // Cegah manipulasi DOM (contoh serangan XSS)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Deteksi jika ada perubahan yang mencurigakan
                mutation.removedNodes.forEach(node => {
                    console.warn('Suspicious removal detected:', node);
                });
                mutation.addedNodes.forEach(node => {
                    console.warn('Suspicious addition detected:', node);
                    // Menghapus node yang mencurigakan
                    node.remove();
                });
            }
        });
    });

    // Awasi perubahan di seluruh body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
