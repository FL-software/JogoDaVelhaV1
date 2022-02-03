const jogo_da_velha = {
    tabuleiro: ['','','','','','','','',''],
    simbolos: {
        opcoes: ['X','O'],
        vez: 0,

        trocar_vez: function() {
            this.vez = (this.vez === 0 ? 1 : 0);
        }
    },
    principal: null,
    fim_de_jogo: false,
    sequencias_vencedoras: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    iniciar: function(jogo) {
        this.principal = jogo;

        console.log('Tabuleiro montado');

        this.iniciar_jogo();
    },

    fazer_jogada: function(posicao) {
        if(this.fim_de_jogo) {
            return false;
        }

        if (this.tabuleiro[posicao] === '') {
            this.tabuleiro[posicao] = this.simbolos.opcoes[this.simbolos.vez];

            console.log(this.simbolos.opcoes[this.simbolos.vez] + ' jogou em ' + posicao);
            
            this.desenhar();

            let indice_sequencia_vencedora = this.checar_sequencias_vencedoras(this.simbolos.opcoes[this.simbolos.vez]);

            if (indice_sequencia_vencedora >= 0) {
                this.finalizar_jogo();
            } else {
                this.simbolos.trocar_vez();
            }

            return true;
        } else {
            return false;
        }
    },

    finalizar_jogo: function() {
        this.fim_de_jogo = true;  
      
        console.log('Fim de jogo');
    },

    iniciar_jogo: function() {
        this.tabuleiro.fill('');
        this.desenhar();
        this.fim_de_jogo = false;
      
        console.log('Inicio de jogo');
    },

    checar_sequencias_vencedoras: function(simbolo) {
        for (i in this.sequencias_vencedoras) {
            if (this.tabuleiro[this.sequencias_vencedoras[i][0]] == simbolo && 
                this.tabuleiro[this.sequencias_vencedoras[i][1]] == simbolo && 
                this.tabuleiro[this.sequencias_vencedoras[i][2]] == simbolo) {
                    console.log('Sequencia vencedora: ' + this.sequencias_vencedoras[i] + ' . ' + simbolo + ' é o vencedor');
                    window.alert('Fim de Jogo. ' + simbolo + ' é o vencedor');

                    return i;
                }
        };

        console.log('Sequencia não vencedora');

        return -1;
    },

    desenhar: function() {
        let conteudo = '';

        for (i in this.tabuleiro){
            conteudo += '<div onclick="jogo_da_velha.fazer_jogada(' + i + ')">'+ this.tabuleiro[i] + '</div>'
        }

        this.principal.innerHTML = conteudo;

        console.log('Tabuleiro atualizado');
    }
};