const tabuleiro = document.querySelector('.tabuleiro');
const placar1 = document.getElementById('placar1');
const placar2 = document.getElementById('placar2');
const turnoText = document.getElementById('turno');

let cartas = ['🍎', '🍌', '🍓', '🍇', '🍎', '🍌', '🍓', '🍇', '🌟', '🌟', '🌈', '🌈', '🎃', '🎃', '💎', '💎'];
let cartasSelecionadas = [];
let cartasSelecionadasIds = [];
let paresEncontrados = 0;
let jogadorAtual = 1;
let placares = [0, 0];

cartas = cartas.sort(() => 0.5 - Math.random());

function criarTabuleiro() {
  cartas.forEach((simbolo, index) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.id = index;
    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

function virarCarta() {
  const id = this.dataset.id;

  if (cartasSelecionadasIds.includes(id) || this.classList.contains('acertada')) return;

  this.textContent = cartas[id];
  this.classList.add('virada');

  cartasSelecionadas.push(cartas[id]);
  cartasSelecionadasIds.push(id);

  if (cartasSelecionadas.length === 2) {
    setTimeout(verificarPar, 500);
  }
}

function verificarPar() {
  const [primeiroId, segundoId] = cartasSelecionadasIds;
  const [primeiraCarta, segundaCarta] = cartasSelecionadas;
  const cartasHtml = document.querySelectorAll('.carta');

  if (primeiraCarta === segundaCarta) {
    cartasHtml[primeiroId].classList.add('acertada');
    cartasHtml[segundoId].classList.add('acertada');
    paresEncontrados++;
    placares[jogadorAtual - 1]++;
    atualizarPlacar();
  } else {
    cartasHtml[primeiroId].textContent = '';
    cartasHtml[primeiroId].classList.remove('virada');
    cartasHtml[segundoId].textContent = '';
    cartasHtml[segundoId].classList.remove('virada');
  }

  cartasSelecionadas = [];
  cartasSelecionadasIds = [];
  alternarTurno();

  if (paresEncontrados === cartas.length / 2) {
    setTimeout(anunciarVencedor, 500);
  }
}

function alternarTurno() {
  jogadorAtual = jogadorAtual === 1 ? 2 : 1;
  turnoText.textContent = `Turno de: Jogador ${jogadorAtual}`;
}

function atualizarPlacar() {
  placar1.textContent = placares[0];
  placar2.textContent = placares[1];
}

function anunciarVencedor() {
  const vencedor = placares[0] === placares[1] ? 'Empate!' : `Vencedor: Jogador ${placares[0] > placares[1] ? 1 : 2}`;
  alert(`${vencedor}`);
}

criarTabuleiro();
