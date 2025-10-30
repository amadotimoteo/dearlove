const blk_pitn = {
    // Padrão de coordenadas dos blocos
    block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
    block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
    block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
    block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
    block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
    block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
    block11: [[2, 0], [0, 0], [-1, 0], [1, 0]],
    block12: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
    block17: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block19: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block22: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      
    },
    offset_pitn = {
    // Posições de deslocamento na tela
    block1: [5, 3],
    block2: [5, 1],
    block3: [3, 4],
    block4: [3, 2],
    block5: [3, -1],
    block6: [2, 5],
    block7: [2, 1],
    block8: [1, -1],
    block9: [1, -3],
    block10: [1, 2],
    block11: [0, 3],
    block12: [0, 0], 
    block13: [-1, -4],
    block14: [0, -2],
    block15: [-2, 4],
    block16: [-2, 2],
    block17: [-2, 0],
    block18: [-3, -2],
    block19: [-4, 0],
    block20: [-3, 5],
    block21: [-5, 3],
    block22: [-4, 1],
    block23: [-6, 1]      
    };

let blocks = document.getElementsByClassName("block"),
    block = blocks[0],
    love = document.getElementsByClassName("love")[0],
    timer = null,
    index = 0, 
    clone_block;      

let animacaoIniciada = false;

block.style.top = "50%";
block.style.left = "50%";
block.style.margin = "-20px 0 0 -20px";

const block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2)),
    block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

// FUNÇÃO PRINCIPAL DE CONSTRUÇÃO (AGORA CORRIGIDA PARA CONTAR ATÉ O FIM)
function Next() {
    // 1. Aumenta o índice.
    ++index; 

    // O código de construção do bloco SÓ é executado se index for <= 23.
    if (index <= 23) { 
        
        // Configura a transição para que o sumiço suave funcione no Rise()
        if (index === 1) { 
            love.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        }
        
        block.style.visibility = "visible"; 

        block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
        block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";
        for (let i = 0; i < block.children.length; i++) {
            block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
            block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
        }

        clone_block = block.cloneNode(true);
        love.appendChild(clone_block);

        if (love.children.length >= 24) {
            blocks[blocks.length - 1].children[2].style.display = "none";
            block.style.display = "none";   
        }
        return; // Sai da função após construir o bloco
    } 
    
    // 2. Se o index for > 23 (construção finalizada), a interrupção e a chamada ao Rise() são executadas.
    if (index > 23) {
        
        clearInterval(timer); 

        // Atraso de 400ms para garantir a renderização do último bloco
        setTimeout(() => {
            Rise(); 
        }, 400); 
    }
}


function Rise() { 
    // Mensagem de log traduzida para PT
    console.log("Iniciando subida");
    let timer2 = null,
        distance = 0;
    const target = 120, 
        speed = 1;

    let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));


    timer2 = setInterval(() => {
        distance += speed;
        
        if (distance >= target) {
            clearInterval(timer2);

            // Mensagem de log traduzida para PT
            console.log("Subida concluída. Preparando explosão.");

            // FAZ O CORAÇÃO PRINCIPAL SUMIR COM TRANSIÇÃO
            love.style.transform = "scale(0.0)"; 
            love.style.opacity = "0"; 
            
            // Chama a função de explosão após o coração principal ter tido tempo de "sumir" (800ms)
            setTimeout(() => {
                ExplodeHeart(); 
                // *** Ponto futuro: Aqui você chamaria a revelação da mensagem ***
            }, 800); 
            
            return;
        }

        love.style.top = (love_top - distance) + "px";

    }, 22);
}

function StopAnimation() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        console.log("Contador de animação parado.");
    }
}
// FUNÇÃO DA EXPLOSÃO
function ExplodeHeart() {
    const numHearts = 50; 
    
    // Calcula a posição do centro do coração grande (love)
    const loveRect = love.getBoundingClientRect();
    const centerX = loveRect.left + loveRect.width / 2;
    const centerY = loveRect.top + loveRect.height / 2;

    for (let i = 0; i < numHearts; i++) {
        const miniHeart = document.createElement('div');
        miniHeart.classList.add('mini-coracao');
        
        // Posição inicial (no centro do coração grande)
        miniHeart.style.left = centerX + 'px';
        miniHeart.style.top = centerY + 'px';
        
        // Direção e distância aleatória
        const angle = Math.random() * Math.PI * 2; 
        const distance = Math.random() * 300 + 50; 
        
        const finalX = Math.cos(angle) * distance;
        const finalY = Math.sin(angle) * distance;

        // Define as variáveis CSS para a animação
        miniHeart.style.setProperty('--x', finalX + 'px');
        miniHeart.style.setProperty('--y', finalY + 'px');

        // Aplica a animação CSS (duração e atraso aleatórios)
        miniHeart.style.animation = `espalharCoracao ${Math.random() * 2 + 1}s forwards`; 
        miniHeart.style.animationDelay = `${Math.random() * 0.5}s`; 

        document.body.appendChild(miniHeart);

        miniHeart.addEventListener('animationend', () => {
            miniHeart.remove();
        });
    }
    if (love) {
        love.innerHTML = "";
        love.style.transform = "";
        love.style.opacity = "1";
        love.style.top = "50%";
    }
    setTimeout( () => {
        index = 0;
        timer = setInterval(() => {
            Next();
        }, 400);
    }, 5000);
}


window.onload = function () {
    const audioPlayer = document.getElementById("audios");
    const playButton = document.getElementById("play-pause-button");
    
    // CORREÇÃO CRÍTICA AQUI: Seleciona o novo container de fundo pelo ID
    const bgContainer = document.getElementById('fullscreen-bg'); 
    
    audioPlayer.load();

    // VARIÁVEL DEVE ESTAR DECLARADA NO TOPO DO SEU ARQUIVO: let animacaoIniciada = false;
    
    if (playButton) {
        playButton.addEventListener("click", function () {
            
            if (audioPlayer.paused) {
                // AÇÃO: INICIAR / RETOMAR TUDO
                audioPlayer.play().then(() => {
                    playButton.textContent = "Música: Tocando 🎶";
                    
                    // NOVO CÓDIGO: Adiciona a classe 'active' ao fundo FULL SCREEN
                    if (bgContainer) {
                        bgContainer.classList.add('active'); 
                    }

                    if (!animacaoIniciada) {
                        // Inicia a contagem para o coração (após 12s)
                        setTimeout( () => {
                            timer = setInterval(() => {
                                Next();
                            }, 400);
                        }, 12000); 
                        animacaoIniciada = true;
                    }
                
                }).catch(error => {
                    playButton.textContent = "Erro ao Tocar";
                });
                
            } else {
                // AÇÃO: PAUSAR E RESETAR TUDO
                audioPlayer.pause();
                playButton.textContent = "Música: Pausada ⏸️";
                
                // NOVO CÓDIGO: Remove a classe 'active' para ocultar o fundo FULL SCREEN
                if (bgContainer) {
                    bgContainer.classList.remove('active');
                }

                StopAnimation();
                ResetHeart(); // Reseta o coração para a próxima vez!
            }
        });
    }

    // TRATAMENTO EXTRA: MÚSICA TERMINOU SOZINHA (FINALIZAR TUDO)
    audioPlayer.onended = function() {
        playButton.textContent = "Música: Terminou ⏹️";
        
        // NOVO CÓDIGO: Oculta o fundo ao final da música
        if (bgContainer) {
            bgContainer.classList.remove('active');
        }

        StopAnimation();
        ResetHeart();
    };
};