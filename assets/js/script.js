const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
        }
    })
}, { threshold: 0.1 })
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stack-bar').forEach(bar => {
                const w = bar.dataset.width || bar.style.width
                bar.dataset.width = w
                bar.style.width = '0'
                setTimeout(() => { bar.style.width = w }, 100)
            })
            barObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.2 })
document.querySelectorAll('.stack-grid').forEach(el => barObserver.observe(el))

const langToggle = document.getElementById('lang-toggle')
let currentLang = 'en'

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'pt' : 'en'
    langToggle.textContent = currentLang === 'en' ? 'PT' : 'EN'
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute('data-' + currentLang)
    })
    document.querySelectorAll('.lang-en, .lang-pt').forEach(el => {
        el.style.display = el.classList.contains('lang-' + currentLang) ? 'block' : 'none'
    })
})

const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobile-menu')
const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link')

function openMenu() {
    hamburger.classList.add('open')
    mobileMenu.classList.add('open')
    hamburger.setAttribute('aria-expanded', 'true')
}

function closeMenu() {
    hamburger.classList.remove('open')
    mobileMenu.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation()
    hamburger.classList.contains('open') ? closeMenu() : openMenu()
})

mobileLinks.forEach(link => link.addEventListener('click', closeMenu))

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu()
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu()
})