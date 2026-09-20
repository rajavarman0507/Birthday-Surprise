/* ==========================================================================
   HER JOURNEY — CINEMATIC INTERACTIVE LIFE-JOURNEY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. OPENING EXPERIENCE SEQUENCE CONTROLLER
       ---------------------------------------------------------------------- */
    const openingScreen = document.getElementById('openingExperience');
    const textStep1 = document.querySelector('.text-step-1');
    const textStep2 = document.querySelector('.text-step-2');
    const textStep3 = document.querySelector('.text-step-3');
    const textStep4 = document.querySelector('.text-step-4');
    const titleReveal = document.getElementById('titleReveal');
    const beginBtn = document.getElementById('beginBtn');
    const checkpointNav = document.getElementById('checkpointNav');

    setTimeout(() => textStep1?.classList.add('visible'), 800);
    setTimeout(() => textStep2?.classList.add('visible'), 2800);
    setTimeout(() => textStep3?.classList.add('visible'), 4800);
    setTimeout(() => textStep4?.classList.add('visible'), 6800);

    setTimeout(() => {
        titleReveal?.classList.remove('hidden');
        titleReveal?.classList.add('visible');
    }, 8800);

    beginBtn?.addEventListener('click', () => {
        openingScreen.classList.add('passed');
        checkpointNav.classList.add('active-nav');
        document.body.style.overflow = 'auto';

        if (!audioPlaying) {
            toggleAudio();
        }

        const firstCh = document.getElementById('ch-birth');
        if (firstCh) {
            firstCh.scrollIntoView({ behavior: 'smooth' });
        }
    });

    /* ----------------------------------------------------------------------
       2. WEB AUDIO API AMBIENT PIANO SYNTHESIZER
       ---------------------------------------------------------------------- */
    const audioBtn = document.getElementById('audioToggle');
    let audioCtx = null;
    let audioPlaying = false;
    let synthTimer = null;
    let masterGain = null;

    const chords = [
        [220.00, 261.63, 329.63, 392.00], // A minor 7
        [174.61, 220.00, 261.63, 329.63], // F major 7
        [130.81, 164.81, 196.00, 246.94], // C major 7
        [146.83, 174.61, 220.00, 261.63]  // D minor 7
    ];
    let currentChordIndex = 0;

    function initAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.8, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        }
    }

    function playSoftChord() {
        if (!audioPlaying || !audioCtx) return;

        const now = audioCtx.currentTime;
        const currentChord = chords[currentChordIndex];
        currentChordIndex = (currentChordIndex + 1) % chords.length;

        currentChord.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.035, now + 2.5 + (idx * 0.2));
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.0);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(now + (idx * 0.15));
            osc.stop(now + 7.5);
        });

        synthTimer = setTimeout(playSoftChord, 6500);
    }

    function toggleAudio() {
        initAudioContext();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        audioPlaying = !audioPlaying;

        if (audioPlaying) {
            audioBtn.classList.add('playing');
            audioBtn.querySelector('.music-text').textContent = 'Music On';
            playSoftChord();
        } else {
            audioBtn.classList.remove('playing');
            audioBtn.querySelector('.music-text').textContent = 'Music Off';
            clearTimeout(synthTimer);
        }
    }

    audioBtn?.addEventListener('click', toggleAudio);

    /* ----------------------------------------------------------------------
       3. AMBIENT PARTICLES CANVAS ENGINE (DUST / PETALS / BIRDS)
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('ambientCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let currentParticleMode = 'dust'; // 'dust', 'petals', 'birds'

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Class handling dust, flower petals, and flying birds
    class Particle {
        constructor(mode = 'dust') {
            this.mode = mode;
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            if (this.mode === 'petals') {
                this.size = Math.random() * 4 + 3;
                this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
                this.speedY = Math.random() * 0.8 + 0.4;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.02;
                this.alpha = Math.random() * 0.6 + 0.2;
            } else if (this.mode === 'birds') {
                this.x = -50 - Math.random() * 200;
                this.y = Math.random() * (height * 0.4);
                this.size = Math.random() * 12 + 10;
                this.speedX = Math.random() * 1.8 + 1.2;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.wingPhase = Math.random() * Math.PI * 2;
                this.alpha = Math.random() * 0.4 + 0.2;
            } else { // dust / gold
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -Math.random() * 0.4 - 0.1;
                this.alpha = Math.random() * 0.5 + 0.15;
                this.color = Math.random() > 0.4 ? '212, 175, 55' : '243, 229, 171';
            }
        }

        update() {
            if (this.mode === 'petals') {
                this.x += Math.sin(this.y * 0.01) * 0.8;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                if (this.y > height + 20) {
                    this.reset();
                    this.y = -10;
                }
            } else if (this.mode === 'birds') {
                this.x += this.speedX;
                this.y += this.speedY;
                this.wingPhase += 0.12;
                if (this.x > width + 100) {
                    this.reset();
                }
            } else {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y < 0 || this.x < 0 || this.x > width) {
                    this.reset();
                    this.y = height + 10;
                }
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;

            if (this.mode === 'petals') {
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = 'rgba(255, 250, 245, 0.85)';
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.mode === 'birds') {
                ctx.translate(this.x, this.y);
                ctx.strokeStyle = 'rgba(40, 35, 30, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                const wingY = Math.sin(this.wingPhase) * 6;
                ctx.moveTo(-this.size, wingY);
                ctx.quadraticCurveTo(-this.size / 2, -wingY, 0, 0);
                ctx.quadraticCurveTo(this.size / 2, -wingY, this.size, wingY);
                ctx.stroke();
            } else { // dust / gold
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = `rgba(${this.color}, 0.5)`;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    function setParticleMode(newMode) {
        if (currentParticleMode === newMode) return;
        currentParticleMode = newMode;
        particles = [];
        const count = newMode === 'birds' ? 8 : (newMode === 'petals' ? 25 : 40);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(newMode));
        }
    }

    setParticleMode('dust');

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ----------------------------------------------------------------------
       4. WINDING ZIG-ZAG SVG PATH SCROLL TRACKER
       ---------------------------------------------------------------------- */
    const pathProgress = document.getElementById('journeyCurveProgress');
    let pathLength = 0;

    if (pathProgress) {
        pathLength = pathProgress.getTotalLength();
        pathProgress.style.strokeDasharray = pathLength;
        pathProgress.style.strokeDashoffset = pathLength;
    }

    function updatePathOnScroll() {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / (maxScroll || 1)));

        if (pathProgress && pathLength) {
            const drawLength = pathLength * scrollFraction;
            pathProgress.style.strokeDashoffset = pathLength - drawLength;
        }
    }

    window.addEventListener('scroll', updatePathOnScroll);
    updatePathOnScroll();

    /* ----------------------------------------------------------------------
       5. INTERSECTION OBSERVER FOR CARDS, CHECKPOINTS & MOODS
       ---------------------------------------------------------------------- */
    const chapterSections = document.querySelectorAll('.chapter-section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.05
    };

    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                const targetId = entry.target.getAttribute('id');

                // Update active checkpoint in sidebar
                navItems.forEach(item => {
                    if (item.getAttribute('data-target') === targetId) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

                // Trigger visual particles & audio adjustments per chapter
                if (targetId === 'ch-mother' || targetId === 'ch-father') {
                    setParticleMode('petals');
                } else if (targetId === 'ch-college' || targetId === 'ch-tomorrow') {
                    setParticleMode('birds');
                } else {
                    setParticleMode('dust');
                }

                // Lower volume during 2016 chapter
                if (masterGain && audioCtx) {
                    if (targetId === 'ch-2016') {
                        masterGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 1);
                    } else {
                        masterGain.gain.linearRampToValueAtTime(0.8, audioCtx.currentTime + 1);
                    }
                }

                if (targetId === 'ch-turning') {
                    triggerTurningPointSequence();
                }
            }
        });
    }, observerOptions);

    chapterSections.forEach(section => chapterObserver.observe(section));

    // Nav click jumping
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ----------------------------------------------------------------------
       6. TURNING POINT SEQUENTIAL REVEAL
       ---------------------------------------------------------------------- */
    let turningTriggered = false;
    function triggerTurningPointSequence() {
        if (turningTriggered) return;
        turningTriggered = true;

        const steps = [
            document.querySelector('.t-step-1'),
            document.querySelector('.t-step-2'),
            document.querySelector('.t-step-3'),
            document.querySelector('.t-step-4'),
            document.querySelector('.t-step-5'),
            document.querySelector('.t-step-6'),
            document.getElementById('childrenStandBlock')
        ];

        steps.forEach((step, index) => {
            if (step) {
                setTimeout(() => {
                    step.classList.add('visible');
                }, index * 600);
            }
        });
    }

    /* ----------------------------------------------------------------------
       7. LIVE PHOTO CUSTOMIZER MODAL
       ---------------------------------------------------------------------- */
    const openModalBtn = document.getElementById('openCustomizerBtn');
    const closeModalBtn = document.getElementById('closeCustomizerBtn');
    const customizerModal = document.getElementById('customizerModal');
    const fileInputs = document.querySelectorAll('.customizer-item input[type="file"]');

    openModalBtn?.addEventListener('click', () => customizerModal.classList.remove('hidden'));
    closeModalBtn?.addEventListener('click', () => customizerModal.classList.add('hidden'));

    customizerModal?.addEventListener('click', (e) => {
        if (e.target === customizerModal) {
            customizerModal.classList.add('hidden');
        }
    });

    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const targetImgId = input.getAttribute('data-target');
            const targetImg = document.getElementById(targetImgId);

            if (file && targetImg) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    targetImg.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    /* ----------------------------------------------------------------------
       8. RESTART JOURNEY BUTTON
       ---------------------------------------------------------------------- */
    const restartBtn = document.getElementById('restartBtn');
    restartBtn?.addEventListener('click', () => {
        openingScreen.classList.remove('passed');
        checkpointNav.classList.remove('active-nav');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
