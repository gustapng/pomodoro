// variáveis funções do pomodoro
let acao = document.querySelector('#acao');
let pausa = document.querySelector('#pausa');
let sessoes = document.querySelector('#sessoes');
let segundo;
let iniciar = document.querySelector('#btn_inicio');
// variáveis funções do pomodoro

// variáveis áudio
let bell = new Audio("./audio/audio_bell.mp3")
let volta = new Audio("./audio/audio_volta.mp3")
let final = new Audio("./audio/audio_final.mp3")
// variáveis áudio

// variáveis botões áudio
let pause = document.querySelector('#pause')
let play = document.querySelector('#play')
// variáveis botões áudio

// controlar vólume áudio
let musica = document.querySelector('#musica')
musica.volume = 0.2;
// controlar vólume áudio

// variáveis função relógio widget
const horasRelogio = document.querySelector('#horasRelogio');
const minutosRelogio = document.querySelector('#minutosRelogio');
const segundosRelogio = document.querySelector('#segundosRelogio');
// variáveis função relógio widget

// funções de play/pause de música que troca os ícones
function playmsc() {
    musica.play()
    pause.style.display = 'block'
    play.style.display = 'none'
}

function pausemsc() {
    musica.pause()
    pause.style.display = 'none'
    play.style.display = 'block'
}
// funções de play/pause de música que troca os ícones

// função verifica se os valores de tempos estão corretos e chama a função play
iniciar.addEventListener('click', function () {
    if (acao.value == 0) {
        document.querySelector('#erro_acao').innerHTML = 'Adicione os minutos'
        acao.focus()
    } else if (pausa.value == 0) {
        document.querySelector('#erro_pausa').innerHTML = 'Adicione a pausa'
        pausa.focus()
    } else if (sessoes.value == 0) {
        document.querySelector('#erro_sessoes').innerHTML = 'Adicione as sessões'
        sessoes.focus()
    } else {

        musica.play()
        pause.style.display = 'block'

        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        document.querySelector('#config').style.setProperty('display', 'none', 'important')
        document.querySelector('#timer').style.setProperty('display', 'block', 'important')
        
        tempoAcao()
    }
})
// função verifica se os valores de tempos estão corretos e chama a função play

// função play
function tempoAcao() {
    let sessoes_valor = localStorage.getItem('sessoes')
    if (sessoes_valor != '1') {
        document.querySelector('#title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
    } else {
        document.querySelector('#title_sessao').innerHTML = sessoes_valor + ' sessão restante'
    }

    let title = document.querySelector('#title')
    title.innerHTML = 'AÇÃO'
    title.style.fontSize = '26px'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#fff', 'important')
    document.querySelector('#mododark').style.right='200px,','!important'

    min = Number(localStorage.getItem('acao'))
    min = min - 1
    segundos = 59

    document.querySelector('#minutes_ok').innerHTML = min
    document.querySelector('#seconds_ok').innerHTML = segundos

    var min_interval = setInterval(minTimer, 60000)
    var seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min = min - 1
        document.querySelector('#minutes_ok').innerHTML = min
    }

    function segTimer() {
        segundos = segundos - 1
        document.querySelector('#seconds_ok').innerHTML = segundos

        if (segundos <= 0) {
            if (min <= 0) {
                clearInterval(min_interval)
                clearInterval(seg_interval)

                bell.play()
                tempoPausa()
            }

            segundos = 60
        }
    }
}
// função play

// função pause
function tempoPausa() {
    let title = document.querySelector('#title')
    title.innerHTML = 'PAUSA'
    title.style.fontSize = '26px'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#fff', 'important')

    min_pausa = Number(localStorage.getItem('pausa'))
    min_pausa = min_pausa - 1
    segundos = 59

    document.querySelector('#minutes_ok').innerHTML = min_pausa
    document.querySelector('#seconds_ok').innerHTML = segundos

    var min_interval = setInterval(minTimer, 60000)
    var seg_interval = setInterval(segTimer, 1000)  

    function minTimer() {
        if(min_pausa == -1) {
            min_pausa = 0
        } else {
            min_pausa = min_pausa - 1
        }
        document.querySelector('#minutes_ok').innerHTML = min_pausa
        console.log(min_pausa)
    }

    function segTimer() {
        segundos = segundos - 1
        document.querySelector('#seconds_ok').innerHTML = segundos
        console.log(segundos)

        if (segundos <= 0) {
            if (min_pausa <= 0) {
                sections = Number(localStorage.getItem('sessoes'))
                sections = sections - 1
                localStorage.setItem('sessoes', String(sections))

                clearInterval(min_interval)
                clearInterval(seg_interval)

                if (sections <= 0) {
                    final.play()
                    localStorage.clear()

                    document.querySelector('#config').style.setProperty('display', 'none', 'important')
                    document.querySelector('#timer').style.setProperty('display', 'none', 'important')
                    document.querySelector('#fim').style.setProperty('display', 'block', 'important')
                } else {
                    
                    volta.play()
                    tempoAcao()
                }

            }

            segundos = 60
        }
    }
}
// função pause

//função relógio
const relogio = setInterval(function time() {

    let Horas = new Date();
    let hr = Horas.getHours();
    let min = Horas.getMinutes();
    let sec = Horas.getSeconds();

    if(hr < 10) {
        hr = '0' + hr;
    }

    if(min < 10) {
        min = '0' + min;
    }

    if(sec < 10) {
        sec = '0' + sec;
    }

    horasRelogio.textContent = hr;
    minutosRelogio.textContent = min;
    segundosRelogio.textContent = sec;
})
//função relógio

// variável darkmode
const checkbox = document.getElementById("switch")
// variável darkmode

// função mudar darkmode
checkbox.addEventListener('click', () => {
    document.getElementById("navegacao").classList.toggle("navbardark");
    document.getElementById("body").classList.toggle("bodydark");
    document.getElementById("acao2").classList.toggle("form-groupdark");
    document.getElementById("pausa2").classList.toggle("form-groupdark");
    document.getElementById("sessoes2").classList.toggle("form-groupdark");
    document.getElementById("btn-info").classList.toggle("btn-infordark");
    document.getElementById("btn_inicio").classList.toggle("btn-lgdark");
    document.getElementById("box-time").classList.toggle("timedark");
    document.getElementById("btn-voltar").classList.toggle("btn-lgdark");
})
// função mudar darkmode
