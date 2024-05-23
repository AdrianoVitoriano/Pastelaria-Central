window.sr = ScrollReveal({ reset: true})
sr.reveal('#header', {duration:2000})
sr.reveal('#main', {duration:2000})
sr.reveal('#footer', {duration:2000})

window.addEventListener('scroll', function(){
    let header = this.document.querySelector('.Cabeçalho')
    header.classList.toggle('Rolagem',window.scrollY > 0)
} )