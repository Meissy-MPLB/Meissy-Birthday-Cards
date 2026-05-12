// 1. DENSE INSTANT Flower Rain (Multi-Symbol)
const flowerWrapper = document.getElementById('flower-wrapper');
const icons = ['🌸', '✨', '🤍', '💖', '🌼', '❀', '✿', '✧', '✦'];

function initFlowers() {
    for (let i = 0; i < 50; i++) {
        let f = document.createElement('div');
        f.className = 'flower';
        f.innerText = icons[Math.floor(Math.random() * icons.length)];
        f.style.left = Math.random() * 100 + 'vw';
        f.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        // MENGHAPUS DELAY: Bunga tersebar merata saat load
        f.style.top = Math.random() * 100 + 'vh'; 
        f.style.animationDuration = (Math.random() * 5 + 8) + 's';
        // Delay negatif agar animasi sudah berjalan di tengah layar
        f.style.animationDelay = "-" + (Math.random() * 15) + "s"; 
        
        flowerWrapper.appendChild(f);
    }
}
initFlowers();

// 2. Fly Card Toggle
const flyTrigger = document.getElementById('fly-trigger');
if (flyTrigger) {
    flyTrigger.addEventListener('click', function() {
        this.classList.toggle('active');
        // Efek haptic atau suara bisa ditambah di sini
    });
}

// 3. Scroll Reveal (Smooth In-Out Animation)
const reveal = () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        // Section aktif jika sedang berada di layar pandang (viewport)
        const isVisible = rect.top < window.innerHeight - 150 && rect.bottom > 150;
        if (isVisible) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
};
window.addEventListener('scroll', reveal);
reveal();

// 4. RSVP Submission (SheetDB Handler)
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-kirim');
        const msg = document.getElementById('response-msg');
        
        btn.innerText = "Mengirim...";
        btn.disabled = true;

        // Simulasi pengiriman (Ganti dengan Fetch SheetDB kamu jika sudah siap)
        fetch('https://sheetdb.io/api/v1/rdgrx9thgtvbu', {
            method: 'POST',
            body: new FormData(rsvpForm),
        }).then(() => {
            msg.innerHTML = "<p style='color:#ad1457; margin-top:20px; font-weight:bold; animation: fadeIn 1s;'>Sukses! Jawaban kamu sudah tercatat. 🚀</p>";
            rsvpForm.reset();
        }).catch(() => {
            msg.innerHTML = "<p style='color:red; margin-top:20px;'>Gagal mengirim. Coba lagi ya!</p>";
        }).finally(() => {
            btn.innerText = "Kirim Konfirmasi";
            btn.disabled = false;
        });
    });
}
// LOGIKA MUSIK LATAR
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.innerText = '🔇';
    } else {
        bgMusic.play();
        musicIcon.innerText = '🔊';
    }
    isPlaying = !isPlaying;
}

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Biar gak bentrok sama event click document
    toggleMusic();
});

// Fitur Autoplay Pintar: Musik jalan saat user klik pertama kali di mana saja
document.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            musicIcon.innerText = '🔊';
            isPlaying = true;
        }).catch(err => console.log("Autoplay dicegah browser"));
    }
}, { once: true });
