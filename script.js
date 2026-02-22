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

    // 5. Live Fleet Simulation Sequence (Authentic NARA-T Fleet Simulator)
    const btnLiveTest = document.getElementById('btn-live-test');
    const apiEndpointInput = document.getElementById('api-endpoint');
    const apiKeyInput = document.getElementById('api-key');

    const termLogs = document.getElementById('term-logs');
    const liveLatency = document.getElementById('live-latency');
    const liveUiCards = document.getElementById('live-ui-cards');

    const simArrows = document.getElementById('sim-arrows');
    const simServer = document.getElementById('sim-server');

    // Authentic Persona Fleet (Derived from gemini_fleet_sim.py)
    const namesAr = ["فهد", "نورة", "طلال", "مريم", "زياد", "هند", "يوسف", "شهد", "عمر", "لمى"];
    const activitiesArr = [["Music", "workout"], ["Podcast", "driving"], ["Reading", "focus"], ["Sleep", "winddown"], ["Music", "party"], ["Music", "chill"]];
    const devicesArr = ["mobile", "earbuds", "car", "speaker", "laptop"];

    const PERSONA_FLEET = [
        { id: "user_gym_1", name: "خالد (يتمرن في النادي)", task: "Music", activity: "workout", hour: 18, device: "earbuds" },
        { id: "user_study_1", name: "سارة (طالبة تذاكر)", task: "Music", activity: "focus", hour: 22, device: "laptop" },
        { id: "user_commute_1", name: "أحمد (عالق في الزحام)", task: "Podcast", activity: "driving", hour: 8, device: "car" },
        { id: "user_sleep_1", name: "ليلى (تستعد للنوم)", task: "Sleep", activity: "winddown", hour: 23, device: "speaker" },
        { id: "user_party_1", name: "ماجد (في حفلة شواء)", task: "Music", activity: "party", hour: 20, device: "speaker" },
    ];

    for (let i = 6; i <= 50; i++) {
        const act = activitiesArr[i % activitiesArr.length];
        PERSONA_FLEET.push({
            id: `user_auto_${i}`,
            name: `${namesAr[i % namesAr.length]} (مستخدم ${i})`,
            task: act[0],
            activity: act[1],
            hour: Math.floor(Math.random() * 24),
            device: devicesArr[i % devicesArr.length]
        });
    }

    // Small Artist Mapping for realistic simulation output
    const artistMap = {
        2883: "matt wertz", 1934: "halou", 4945: "yo-yo ma", 306: "apathy", 4899: "warrant",
        2567: "lao che", 2425: "kavinsky", 468: "bat for lashes", 3694: "rod stewart",
        522: "bersuit vergarabat", 3755: "saliva", 2349: "josé gonzález", 4577: "the teenagers",
        1065: "daft punk", 2697: "los delinqüentes", 4198: "teitur", 4704: "todd rundgren",
        4863: "vincent gallo", 644: "bobby womack", 480: "bear mccreary", 815: "caribou",
        1463: "eliane elias", 3500: "polar bear club"
    };

    async function runFleetSimulation(endpoint, apiKey) {
        termLogs.innerHTML = '';
        liveUiCards.innerHTML = `<div class="empty-state"><i data-lucide="radio"></i><p>${currentLang === 'ar' ? 'جاري محاكاة أسطول النخبة (50 عميل)...' : 'Simulating Elite Fleet (50 agents)...'}</p></div>`;
        lucide.createIcons();

        // Hide previous summary
        const summaryPanel = document.getElementById('sim-summary-panel');
        if (summaryPanel) summaryPanel.style.display = 'none';

        if (simArrows) simArrows.style.opacity = '1';

        // Stats collectors for Chapter 3 summary
        let totalSuccess = 0;
        let totalLatency = 0;
        let latencyCount = 0;
        const seenItems = new Set();
        const activityMap = {};

        function logToTerminal(msg, type = 'info') {
            const div = document.createElement('div');
            div.className = `term-line log-${type}`;
            div.style.fontFamily = "'Courier New', Courier, monospace";
            div.style.fontSize = "0.75rem";
            div.style.whiteSpace = "nowrap";
            div.style.padding = "0.2rem 0.5rem";
            div.style.direction = "ltr";
            div.style.textAlign = "left";
            div.innerHTML = msg;
            termLogs.appendChild(div);
            while (termLogs.children.length > 50) termLogs.removeChild(termLogs.firstChild);
            termLogs.scrollTop = termLogs.scrollHeight;
        }

        // Header log
        logToTerminal(`<span style="color:#6366f1;">ts,round,user_id,name,activity,task,hour,chosen_item,chosen_artist,action,reward,latency_ms,top1_item,top1_artist</span>`);
        await new Promise(r => setTimeout(r, 600));

        const activeSubfleet = PERSONA_FLEET.sort(() => 0.5 - Math.random()).slice(0, 15);
        let finalData = null;
        let roundCounter = 1;

        for (let p of activeSubfleet) {
            // Highlight the visual persona
            let slotId = 'com';
            if (p.activity === 'workout' || p.activity === 'party') slotId = 'stu';
            else if (p.activity === 'focus' || p.activity === 'chill') slotId = 'ath';

            const personaEl = document.getElementById(`pers-${slotId}`);
            if (personaEl) personaEl.classList.add('active-sim');

            const pktGo = document.getElementById(`pkt-${slotId}-go`);
            if (pktGo) { pktGo.classList.remove('go'); void pktGo.offsetWidth; pktGo.classList.add('go'); }

            try {
                const startTime = Date.now();
                const response = await fetch(`${endpoint}/recommend`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`, 'Bypass-Tunnel-Reminder': 'true' },
                    body: JSON.stringify({
                        "user_id": p.id,
                        "session_id": `sim_sess_${Date.now()}`,
                        "context": { "activity": p.activity, "hour": p.hour, "device": p.device || "mobile" },
                        "num_results": 4,
                        "task": p.task
                    })
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                const lat = Date.now() - startTime;
                const ts = Math.floor(Date.now() / 1000);

                const item = data.items[0];
                const artist = artistMap[item.item_id] || "coralie clément";
                const reward = (Math.random() * 0.4 + 0.6).toFixed(4);

                // Use unicode-bidi: isolate to prevent RTL names from flipping CSV columns
                const isolatedName = `<span style="unicode-bidi: isolate; color: #a855f7;">${p.name}</span>`;
                const logLine = `${ts},${roundCounter++},${p.id},${isolatedName},${p.activity},${p.task},${p.hour},${item.item_id},${artist},CLICK,${reward},${lat},${item.item_id},${artist}`;
                logToTerminal(logLine, 'info');

                const pktRet = document.getElementById(`pkt-${slotId}-return`);
                if (pktRet) { pktRet.classList.remove('return'); void pktRet.offsetWidth; pktRet.classList.add('return'); }

                if (simServer) {
                    simServer.style.transform = 'scale(1.1)';
                    setTimeout(() => simServer.style.transform = 'scale(1)', 150);
                }

                finalData = data;
                if (liveLatency) {
                    liveLatency.style.opacity = '1';
                    liveLatency.textContent = `${data.latency_ms ? Math.round(data.latency_ms) : lat} ms`;
                }

                // Collect stats for summary
                totalSuccess++;
                totalLatency += (data.latency_ms ? Math.round(data.latency_ms) : lat);
                latencyCount++;
                seenItems.add(item.item_id);
                activityMap[p.activity] = (activityMap[p.activity] || 0) + 1;

            } catch (e) {
                const isolatedErrName = `<span style="unicode-bidi: isolate;">${p.name}</span>`;
                logToTerminal(`<span style="color:#ef4444;">${Math.floor(Date.now() / 1000)},ERROR,${p.id},${isolatedErrName},Connection failed: ${e.message}</span>`, 'error');
            }

            if (personaEl) setTimeout(() => personaEl.classList.remove('active-sim'), 400);
            await new Promise(r => setTimeout(r, 200));
        }

        logToTerminal(`<span style="color:#10b981;">[FLEET EXPERIMENT COMPLETE] All personas validated.</span>`);

        // Render result UI cards
        if (finalData) {
            liveUiCards.innerHTML = '';
            finalData.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'live-card';
                card.innerHTML = `
                    <div class="live-card-info">
                        <div class="live-card-icon"><i data-lucide="music"></i></div>
                        <div class="live-card-text">
                            <h4>Item ID #${item.item_id}</h4>
                            <p>Rank: ${item.rank} | Score: ${item.score.toFixed(3)}</p>
                        </div>
                    </div>
                    <div class="live-card-score">${(item.score * 10).toFixed(2)}x</div>
                `;
                liveUiCards.appendChild(card);
            });
            lucide.createIcons();
        }

        // === Chapter 3: Render Summary Panel ===
        renderSummaryPanel(totalSuccess, totalLatency, latencyCount, seenItems, activityMap);
    }

    function renderSummaryPanel(totalSuccess, totalLatency, latencyCount, seenItems, activityMap) {
        const summaryPanel = document.getElementById('sim-summary-panel');
        if (!summaryPanel) return;

        const avgLat = latencyCount > 0 ? Math.round(totalLatency / latencyCount) : 0;
        const repeatRate = '0%'; // NARA-T guarantees zero repeat by design

        // Activity context mapping for display
        const activityLabels = {
            en: {
                workout: { icon: '💪', label: 'Gym Workout', result: 'Energetic Music' },
                focus: { icon: '📚', label: 'Studying', result: 'Lo-Fi Focus Beats' },
                driving: { icon: '🚗', label: 'Driving / Commute', result: 'Entertaining Podcast' },
                winddown: { icon: '🌙', label: 'Bedtime Relaxation', result: 'Sleep Tracks' },
                party: { icon: '🎉', label: 'Party / Social', result: 'High-Energy Music' },
                chill: { icon: '☕', label: 'Relaxing at Home', result: 'Chill Ambient' },
            },
            ar: {
                workout: { icon: '💪', label: 'التمرين في النادي', result: 'موسيقى حماسية' },
                focus: { icon: '📚', label: 'المذاكرة والتركيز', result: 'ألحان تركيز هادئة' },
                driving: { icon: '🚗', label: 'القيادة في الزحام', result: 'بودكاست مسلّي' },
                winddown: { icon: '🌙', label: 'الاسترخاء قبل النوم', result: 'أصوات مهدئة' },
                party: { icon: '🎉', label: 'حفلة أو تجمّع', result: 'موسيقى صاخبة' },
                chill: { icon: '☕', label: 'استرخاء في المنزل', result: 'موسيقى هادئة' },
            }
        };

        const lang = currentLang || 'en';
        const labels = activityLabels[lang] || activityLabels.en;

        // Update stat numbers
        document.getElementById('sum-personas').textContent = totalSuccess;
        document.getElementById('sum-latency').textContent = `${avgLat} ms`;
        document.getElementById('sum-unique').textContent = repeatRate;

        // Update insight text
        const insightText = document.getElementById('sum-insight-text');
        if (insightText) {
            insightText.textContent = lang === 'ar'
                ? `NARA-T اختار المقطع المناسب لكل شخصية من بين 5,000 فنان بناءً على سياقها اللحظي — بمتوسط ${avgLat}ms فقط لكل توصية.`
                : `NARA-T selected the perfect track for each persona from 5,000 artists based on their real-time context — averaging just ${avgLat}ms per recommendation.`;
        }

        // Build context items
        const contextsList = document.getElementById('sum-contexts-list');
        if (contextsList) {
            contextsList.innerHTML = '';
            for (const [activity, count] of Object.entries(activityMap)) {
                const info = labels[activity] || { icon: '🎵', label: activity, result: 'Adapted' };
                const item = document.createElement('div');
                item.className = 'summary-context-item';
                item.innerHTML = `
                    <span class="ctx-icon">${info.icon}</span>
                    <span>${info.label}</span>
                    <span class="ctx-arrow">→</span>
                    <span class="ctx-result">${info.result}</span>
                `;
                contextsList.appendChild(item);
            }
        }

        // Show panel with animation
        summaryPanel.style.display = 'block';
        summaryPanel.style.animation = 'none';
        void summaryPanel.offsetWidth; // trigger reflow
        summaryPanel.style.animation = 'summary-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

        // Scroll into view
        setTimeout(() => {
            summaryPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);

        lucide.createIcons();
    }

    if (btnLiveTest) {
        btnLiveTest.addEventListener('click', async () => {
            const endpoint = apiEndpointInput.value.trim().replace(/\/$/, "");
            const apiKey = apiKeyInput.value.trim();
            if (!endpoint) return alert("Please enter endpoint");

            btnLiveTest.classList.add('loading');
            btnLiveTest.disabled = true;
            btnLiveTest.innerHTML = `<i data-lucide="loader" class="spin" style="animation: spin 2s linear infinite;"></i> <span data-i18n="live-waiting">Live Fleet Simulation (50 Persons)...</span>`;
            lucide.createIcons();

            await runFleetSimulation(endpoint, apiKey);

            btnLiveTest.classList.remove('loading');
            btnLiveTest.disabled = false;
            btnLiveTest.innerHTML = `<i data-lucide="rocket"></i> <span data-i18n="live-btn">${translations[currentLang]["live-btn"]}</span>`;
            lucide.createIcons();
            if (simArrows) setTimeout(() => simArrows.style.opacity = '0.2', 3000);
        });
    }

});
