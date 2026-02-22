document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Logic
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('current-lang');
    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key]; // innerHTML allows <br> and <span>
            }
        });

        // Update button text
        langText.textContent = lang === 'ar' ? 'English' : 'العربية';

        // Re-render lucide icons if any were overwritten
        lucide.createIcons();
    }

    langBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

    // 2. Copy Code Snippet Logic
    const copyBtn = document.getElementById('copy-btn');
    const codeContent = document.querySelector('code').innerText;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeContent).then(() => {
            // Visual feedback
            const icon = copyBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'check');
            icon.style.color = '#10b981'; // Green color
            lucide.createIcons();

            setTimeout(() => {
                icon.setAttribute('data-lucide', 'copy');
                icon.style.color = 'var(--text-muted)';
                lucide.createIcons();
            }, 2000);
        });
    });

    // 3. Simple scroll reveal animations for features
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(card);
    });
});
