//              ----------------------------------              FUNCIONAMENTO DO TEMPORIZADOR
const botao_temporizador = document.querySelector("#temporizador")
const temporizador = document.querySelector(".temporizador")




//set interval do temporizador declarado fora dos escopos para que possa
//ser manipulado livremente
let clock_temp

botao_temporizador.addEventListener("click", () => {



    //habilita todos os botoes do menu principal, exceto o temporizador
    botao_despertador.disabled = false
    botao_relogio.disabled = false
    botao_temporizador.disabled = true
    botao_cronometro.disabled = false

    //oculta todas as outras divs, exceto temporizador
    relogio.setAttribute("class", "hide")
    cronometro.setAttribute("class", "hide")
    temporizador.setAttribute("class", "temporizador")
    despertador.setAttribute("class", "hide")


    // ÁREAS DO TEMPORIZADOR
    const form_temp = document.querySelector(".form_temp")
    const relogio_temp = document.querySelector(".relogio_temp")



    //botoes iniciar pausar e zerar do temporizador e suas funções

    // ao clicar no botao iniciar, os outros botões ficam ativos, exceto o mesmo
    // o form é escondido e o relógio com temporizador é revelado




    const iniciar = document.querySelector("#temp_iniciar")

    iniciar.addEventListener("click", () => {
        iniciar.disabled = true
        pausar.disabled = false
        zerar.disabled = false




        if (temp_horas.value > 0 || temp_minutos.value > 0 || temp_segundos.value > 0) {
            form_temp.setAttribute("class", "hide")
            relogio_temp.setAttribute("class", "relogio_temp")

            //valores dos inputs
            const temp_h = document.querySelector("#temp_horas")
            const temp_m = document.querySelector("#temp_minutos")
            const temp_s = document.querySelector("#temp_segundos")


            clock_temp = setInterval(() => {


                relogio_temp.innerHTML = `
              
                    ${(temp_h.value < 10) ? "0" + temp_h.value : temp_h.value} : 
                    ${(temp_m.value < 10) ? "0" + temp_m.value : temp_m.value} : 
                    ${(temp_s.value < 10) ? "0" + temp_s.value : temp_s.value}

                    
                    `


                if (temp_s.value > 0) {
                    temp_s.value--

                }
                else if (temp_s.value == 0 && temp_m.value > 0) {
                    temp_m.value--
                    temp_s.value = 59
                }
                else if (temp_s.value == 0 && temp_m.value == 0 && temp_h.value > 0) {
                    temp_h.value--
                    temp_m.value = 60
                }
                else if (temp_s.value == 0 && temp_m.value == 0 && temp_h.value == 0) {
                    const audio = document.querySelector("audio")
                    audio.play()

                    form_temp.setAttribute("class", "form_temp")
                    relogio_temp.setAttribute("class", "hide")


                    const Alarme = document.querySelector(".Alarme")
                    Alarme.setAttribute("class", "Alarme show")
                    const botaoAlarme = document.querySelector(".Alarme_fechar")


                    temp_s.value = ""
                    temp_m.value = ""
                    temp_h.value = ""
                    botaoAlarme.addEventListener("click", () => {
                        const audio = document.querySelector("#audio")
                        audio.pause()
                        Alarme.setAttribute("class", "Alarme")
                    })
                    clearInterval(clock_temp)
                    iniciar.disabled = false
                }

            }, 1000)
        }
        else {
            alert("Digite um tempo válido para o temporizador!")
            iniciar.disabled = false
        }

    })




    const pausar = document.querySelector("#temp_pausar")

    pausar.addEventListener("click", () => {
        iniciar.disabled = false
        pausar.disabled = true
        zerar.disabled = false

        clearInterval(clock_temp)
    })



    const zerar = document.querySelector("#temp_zerar")

    zerar.addEventListener("click", () => {
        iniciar.disabled = false
        pausar.disabled = false
        zerar.disabled = true

        form_temp.setAttribute("class", "form_temp")
        relogio_temp.setAttribute("class", "hide")

        clearInterval(clock_temp)
        temp_h.value = ''
        temp_m.value = ''
        temp_s.value = ''

    })



})

















//              ----------------------------------              FUNCIONAMENTO DO CRONOMETRO
const botao_cronometro = document.querySelector("#cronometro")
const cronometro = document.querySelector(".cronometro")

//a var que vai guardar o cronometro deve ficar fora do escopo para ser manipulada 
let clock_cron

let seg = 0
let min = 0
let hor = 0

botao_cronometro.addEventListener("click", () => {


    //esse blooco de código vai habilitar os demais botoes e desabilitar o cronometro
    botao_despertador.disabled = false
    botao_relogio.disabled = false
    botao_temporizador.disabled = false
    botao_cronometro.disabled = true

    relogio.setAttribute("class", "hide")
    despertador.setAttribute("class", "hide")
    temporizador.setAttribute("class", "hide")

    //exibe o cronometro
    cronometro.setAttribute("class", "cronometro")


    // funções do cronometro
    const cronometro_display = document.querySelector(".cronometro_display")
    const botao_iniciar = document.querySelector("#cronometro_iniciar")
    const botao_pausar = document.querySelector("#cronometro_pausar")
    const botao_zerar = document.querySelector("#cronometro_zerar")


    //ação que vai iniciar o cronometro e desabilitar o botao
    botao_iniciar.addEventListener("click", () => {

        clearInterval(clock_cron)

        botao_iniciar.disabled = true
        botao_pausar.disabled = false
        botao_zerar.disabled = false

        //variáveis que vao ser manipuladas vão ser declaradas fora do escopo do 
        //set interval para que não sejam redeclaradas e percam o valor

        //instanciando clock_cron com o setInterval e exibindo cronometro na tela
        clock_cron = setInterval(() => {

            if (seg < 59)
                seg++
            else {
                min++
                seg = 0
            }
            if (min == 60) {
                min = 0
                hor++
            }


            cronometro_display.innerHTML = `
            <h1> 
                ${hor < 10 ? "0" + hor : hor} 
              : ${min < 10 ? "0" + min : min}   
             : ${seg < 10 ? "0" + seg : seg}
            </h1>
            `
        }, 1000);
    })

    botao_pausar.addEventListener("click", () => {
        botao_iniciar.disabled = false
        botao_pausar.disabled = true
        botao_zerar.disabled = false

        clearInterval(clock_cron)
    })


    botao_zerar.addEventListener("click", () => {
        botao_iniciar.disabled = false
        botao_pausar.disabled = false
        botao_zerar.disabled = true

        clearInterval(clock_cron)
        seg = 0
        min = 0
        hor = 0

        cronometro_display.innerHTML = `
            <h1> 
                ${hor < 10 ? "0" + hor : hor} 
              : ${min < 10 ? "0" + min : min}   
             : ${seg < 10 ? "0" + seg : seg}
            </h1>
            `
    })
})



//              ----------------------------------              FUNCIONAMENTO DO DESPERTADOR

const despertador = document.querySelector(".despertador")
const botao_despertador = document.querySelector("#despertador")
let clock_desp
const display_desp_relogio = document.querySelector(".desp_relogio")

botao_despertador.addEventListener("click", () => {

    botao_despertador.disabled = true
    botao_relogio.disabled = false
    botao_temporizador.disabled = false
    botao_cronometro.disabled = false

    clearInterval(clock)
    relogio.setAttribute("class", "hide")
    cronometro.setAttribute("class", "hide")
    temporizador.setAttribute("class", "hide")
    despertador.removeAttribute("class", "hide")
    despertador.setAttribute("class", "despertador")
    // as outras divs com display devem ser acrescentadas aqui

    //adicionar alarme
    const desp_adicionar = document.querySelector(".desp_adicionar")
    const desp_msg_alarme = document.querySelector(".desp_msg_alarme")

    const input_horas = document.querySelector("#desp_horas")
    const input_minutos = document.querySelector("#desp_minutos")


    desp_adicionar.addEventListener("click", () => {

        desp_msg_alarme.innerHTML = `
        <div class='msg'>  
            <h1>Alarme Acionado  ${input_horas.value < 10 ? "0" + input_horas.value : input_horas.value} :
                                  ${input_minutos.value < 10 ? "0" + input_minutos.value : input_minutos.value} : 00
        </div>
        `
    })
    // o relógio do despertador vai começar assim que o despertador for acionado
    clock_desp = setInterval(() => {
        const data = new Date()
        display_desp_relogio.innerHTML =
            `
        <h1>
            ${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()} : 
            ${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()} : 
            ${data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds()} 

        </h1>
        
        `

        // vai verificar se a o tempo passado bate com o do relógio e ativar o alarme
        const Alarme = document.querySelector(".Alarme")
        const botaoAlarme = document.querySelector(".Alarme_fechar")
        const audio = document.querySelector("#audio")
        function pausar() {
            const audio = document.querySelector("#audio")
            return audio.pause()
        }
        botaoAlarme.addEventListener("click", () => {

            pausar()
            Alarme.setAttribute("class", "Alarme")
        })
        if (data.getHours() == input_horas.value && data.getMinutes() == input_minutos.value) {
            const audio = new Audio("toque.mp3")
            audio.play()
            Alarme.setAttribute("class", "Alarme show")
            input_horas.value = ""
            input_minutos.value = ""
            desp_msg_alarme.innerHTML = ''
        }
        // desativar o alarme

    }, 1000);
    const desp_desativar = document.querySelector(".desp_desativar")
    desp_desativar.addEventListener("click", () => {
        input_horas.value = ""
        input_minutos.value = ""
        desp_msg_alarme.innerHTML = ''
    })

})




//              ----------------------------------              FUNCIONAMENTO DO RELOGIO
// botao, display do relogio e variável para controle do relógio 
const relogio = document.querySelector(".relogio")
const botao_relogio = document.querySelector("#relogio")

//está declarada fora de escopo para que seja possível manipular o relogio em 
//outros blocos
let clock

//funcção vai verificar se o botao do relogio está desativado, se sim, o 
//display vai aparecer e clock vai ser definida para fazer o relogio funcionar
function ativarRelogioInicial() {
    if (botao_relogio.disabled = true) {
        despertador.setAttribute("class", "hide")
        cronometro.setAttribute("class", "hide")
        temporizador.setAttribute("class", "hide")
        clearInterval(clock)
        clock = setInterval(() => {
            const data = new Date()
            relogio.innerHTML = `
                <h1>
                    ${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()} : 
                    ${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()} : 
                    ${data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds()}
                </h1>
            `
        }, 1000);
    }
}
ativarRelogioInicial()
botao_relogio.addEventListener("click", () => {
    botao_despertador.disabled = false
    botao_relogio.disabled = true
    botao_temporizador.disabled = false
    botao_cronometro.disabled = false
    relogio.removeAttribute("class", "hide")
    relogio.setAttribute("class", "relogio")


    ativarRelogioInicial()
})























