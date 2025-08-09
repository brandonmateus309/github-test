// Seleciona elementos
const form = document.getElementById('formContato');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');

const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');
const erroMensagem = document.getElementById('erro-mensagem');
const mensagemRetorno = document.getElementById('mensagemRetorno');

const btnLimpar = document.getElementById('btn-limpar');

// Regex simples para validar email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função para limpar mensagens de erro
function limparErros() {
  erroNome.textContent = '';
  erroEmail.textContent = '';
  erroMensagem.textContent = '';
  mensagemRetorno.textContent = '';
}

// Limpar campos ao clicar em "Limpar"
btnLimpar.addEventListener('click', () => {
  form.reset();
  limparErros();
});

// Validação e comportamento do envio
form.addEventListener('submit', function (e) {
  e.preventDefault();
  limparErros();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  let temErro = false;

  if (nome === '') {
    erroNome.textContent = 'Por favor, informe seu nome.';
    temErro = true;
  }
  if (email === '') {
    erroEmail.textContent = 'Por favor, informe um e-mail.';
    temErro = true;
  } else if (!regexEmail.test(email)) {
    erroEmail.textContent = 'E-mail no formato inválido.';
    temErro = true;
  }
  if (mensagem === '') {
    erroMensagem.textContent = 'Escreva sua mensagem.';
    temErro = true;
  }

  if (temErro) {
    mensagemRetorno.style.color = 'red';
    mensagemRetorno.textContent = '❌ Corrija os erros acima antes de enviar.';
    return;
  }

  // Simular "envio" local (sem backend) — atende aos requisitos da disciplina
  mensagemRetorno.style.color = 'green';
  mensagemRetorno.textContent = '✅ Mensagem enviada com sucesso! O FinanCico já está bicando sua resposta 🐤💬';

  // Limpar campos (opcional)
  form.reset();

  // Opcional: armazenar localmente para análise estatística (localStorage)
  try {
    const envs = JSON.parse(localStorage.getItem('financico_envios') || '[]');
    envs.push({
      nome: nome,
      email: email,
      mensagem: mensagem,
      data: new Date().toISOString()
    });
    localStorage.setItem('financico_envios', JSON.stringify(envs));
  } catch (err) {
    // se der erro no localStorage, não quebra o fluxo
    console.warn('Não foi possível salvar no localStorage:', err);
  }
});