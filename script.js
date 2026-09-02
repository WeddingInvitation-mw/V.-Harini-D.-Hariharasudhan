// ================================
// AUTO-FIT LONG GROOM NAME
// Shrinks "T. Hariharasudhan" only as
// much as needed to fit on one line,
// then applies that same size to
// "V. Harini" so both names match.
// ================================

function fitLongName() {

    const nameEl = document.querySelector('.hero h1 .long-name');
    const brideEl = document.querySelector('.hero h1 .bride-name');

    if (!nameEl) return;

    const container = nameEl.closest('.hero-copy') || nameEl.closest('h1');

    if (!container) return;

    // Reset both names to natural (full) size before measuring
    nameEl.style.fontSize = '';

    if (brideEl) brideEl.style.fontSize = '';

    const maxWidth = container.clientWidth * 0.97;

    let fontSize = parseFloat(getComputedStyle(nameEl).fontSize);

    const minSize = 16;

    let guard = 300;

    while (nameEl.scrollWidth > maxWidth && fontSize > minSize && guard > 0) {

        fontSize -= 1;

        nameEl.style.fontSize = fontSize + 'px';

        guard--;

    }

    // Keep the bride's name the same size as the groom's
    if (brideEl) brideEl.style.fontSize = fontSize + 'px';

}

window.addEventListener('load', fitLongName);

window.addEventListener('resize', fitLongName);

if (document.fonts && document.fonts.ready) {

    document.fonts.ready.then(fitLongName);

}


const opening = document.getElementById('opening'),
    envelope = document.getElementById('envelope'),
    card = document.getElementById('card'),
    openBtn = document.getElementById('openBtn');


// ================================
// AUDIO
// ================================

const audio = document.getElementById('audio'),
    music = document.getElementById('musicBtn');

audio.src = "assets/wedding-music.mpeg";

let playing = false;


// ================================
// OPEN INVITATION
// ================================

let opened = false;

function openInvitation() {

    if (opened) return;

    opened = true;


    // AUTO PLAY MUSIC
    // Music starts when user clicks the invitation
    if (audio.src) {

        audio.play()
            .then(() => {

                playing = true;

                music.querySelector('span').textContent = 'Pause Music';

            })
            .catch(() => {

                // If browser blocks autoplay,
                // user can press Play Music button
                playing = false;

            });

    }


    // OPEN ENVELOPE
    envelope.classList.add('is-open');

    openBtn.disabled = true;


    // SHOW WEBSITE
    setTimeout(() => {

        opening.classList.add('opened');

        document.body.classList.remove('locked');

        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });

        document.getElementById('home').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }, 1250);

}


// Card click
card.addEventListener('click', openInvitation);


// Open Invitation button click
openBtn.addEventListener('click', openInvitation);



// ================================
// TOP CONTROLS SHOW / HIDE
// ================================

let lastY = 0,
    hideTimer;

window.addEventListener('scroll', () => {

    const y = window.scrollY;

    document.querySelectorAll('.top-control').forEach(el => {

        // At top OR scrolling up
        if (y < 25 || y < lastY - 3) {

            el.classList.remove('hide');

        }

        // Scrolling down
        else if (y > lastY + 4) {

            el.classList.add('hide');

        }

    });

    lastY = y;

    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {

        if (window.scrollY < 25) {

            document
                .querySelectorAll('.top-control')
                .forEach(el => el.classList.remove('hide'));

        }

    }, 700);

}, {
    passive: true
});



// ================================
// COUNTDOWN
// ================================

const target = new Date('2026-09-07T06:30:00');

const boxes = document.querySelectorAll('#timer>div b');

function tick() {

    let d = Math.max(0, target - new Date());

    let s = Math.floor(d / 1000);

    let days = Math.floor(s / 86400);

    s %= 86400;

    let h = Math.floor(s / 3600);

    s %= 3600;

    let m = Math.floor(s / 60);

    s %= 60;


    [days, h, m, s].forEach((v, i) => {

        boxes[i].textContent =
            String(v).padStart(2, '0');

    });

}

tick();

setInterval(tick, 1000);



// ================================
// MUSIC PLAY / PAUSE BUTTON
// ================================

music.addEventListener('click', async () => {

    if (!audio.src) return;


    try {

        // PAUSE
        if (playing) {

            audio.pause();

            playing = false;

            music.querySelector('span').textContent =
                'Play Music';

        }

        // PLAY
        else {

            await audio.play();

            playing = true;

            music.querySelector('span').textContent =
                'Pause Music';

        }

    }

    catch (e) {

        console.log('Music could not be played:', e);

    }

});



// ================================
// RSVP FORM
// ================================

document
    .getElementById('rsvpForm')
    .addEventListener('submit', e => {

        e.preventDefault();


        const n =
            document
                .getElementById('guestName')
                .value
                .trim();


        const s =
            document
                .getElementById('attendance')
                .value;


        document
            .getElementById('formNote')
            .textContent =
            `Thank you, ${n}. Your RSVP — ${s} — has been noted.`;


        e.target.reset();

    });