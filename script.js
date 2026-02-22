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

    document.querySelectorAll('.feature-card, .metric-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(card);
    });

    // 4. Interactive Playground Logic
    const recData = {
        "morning-focus": { title: "Deep Focus Playlist", desc: { en: "Lo-Fi beats optimized for morning concentration.", ar: "إيقاعات هادئة (Lo-Fi) محسنة للتركيز الصباحي." }, icon: "headphones", color: "var(--accent-glow)" },
        "morning-workout": { title: "High Energy Drive", desc: { en: "120 BPM tracks to match your morning workout pace.", ar: "مقاطع حيوية 120 نبضة لمطابقة إيقاع تمرينك الصباحي." }, icon: "zap", color: "linear-gradient(135deg, #ef4444, #f97316)" },
        "morning-sleep": { title: "Gentle Wake-up", desc: { en: "Acoustic melodies for a smooth transition from sleep.", ar: "ألحان صوتية هادئة لانتقال سلس من مرحلة النوم." }, icon: "sunrise", color: "linear-gradient(135deg, #f59e0b, #eab308)" },

        "evening-focus": { title: "Late Night Code", desc: { en: "Ambient electronic tracks for extended evening focus.", ar: "موسيقى إلكترونية محيطية لتركيز مسائي ممتد." }, icon: "terminal", color: "linear-gradient(135deg, #8b5cf6, #3b82f6)" },
        "evening-workout": { title: "Evening Release", desc: { en: "Heavy bass tracks to release end-of-day stress.", ar: "مقاطع ذات إيقاع قوي لتفريغ توتر نهاية اليوم." }, icon: "flame", color: "linear-gradient(135deg, #ec4899, #f43f5e)" },
        "evening-sleep": { title: "Deep Sleep Cycles", desc: { en: "Binaural delta waves to facilitate REM sleep phases.", ar: "موجات (بكلتا الأذنين) لتسهيل مراحل النوم العميق." }, icon: "cloud-moon", color: "linear-gradient(135deg, #38bdf8, #818cf8)" }
    };

    let selectedTime = "morning";
    let selectedActivity = "focus";

    const timeBtns = document.querySelectorAll('#time-toggle button');
    const activityBtns = document.querySelectorAll('#activity-toggle button');

    const recTitle = document.getElementById('rec-title');
    const recDesc = document.getElementById('rec-desc');
    const recIconBox = document.querySelector('.rec-icon');
    const recIconSvg = document.getElementById('rec-icon-svg');
    const recResult = document.getElementById('rec-result');

    function updateRecommendation() {
        // Simple animation trigger
        recResult.style.transform = 'scale(0.95)';
        recResult.style.opacity = '0.7';

        setTimeout(() => {
            const key = `${selectedTime}-${selectedActivity}`;
            const data = recData[key];

            recTitle.textContent = data.title;
            // Handle language for dynamic description
            recDesc.textContent = currentLang === 'ar' ? data.desc.ar : data.desc.en;

            // Revert animation trigger
            recResult.style.transform = 'scale(1)';
            recResult.style.opacity = '1';

            // Update icon and color
            recIconBox.style.background = data.color;
            recIconSvg.setAttribute('data-lucide', data.icon);
            lucide.createIcons();
        }, 150);
    }

    // Toggle button logic
    function setupToggles(buttons, isTimeToggle) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (isTimeToggle) {
                    selectedTime = btn.getAttribute('data-val');
                } else {
                    selectedActivity = btn.getAttribute('data-val');
                }

                updateRecommendation();
            });
        });
    }

    setupToggles(timeBtns, true);
    setupToggles(activityBtns, false);

    // Listen for language changes to update dynamic playground text
    langBtn.addEventListener('click', () => {
        // The click logic in setLanguage runs first, so currentLang is updated
        setTimeout(updateRecommendation, 50);
    });
});
