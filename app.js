const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const isOpen = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
const agendaCopy = {
  all: ['O calendário está<br>ganhando vida.', 'Nossos primeiros encontros ainda não têm data divulgada. Assim que estiver tudo certo, você encontra os detalhes por aqui.', 'Sem eventos anunciados por enquanto.'],
  event: ['O próximo encontro<br>começa aqui.', 'As primeiras festas e encontros da Delírios ainda estão por vir. Datas, locais e informações de ingresso serão divulgados nesta agenda.', 'Nenhuma festa ou encontro anunciado por enquanto.'],
  sport: ['A torcida já tem nome.<br>O jogo vem depois.', 'Modalidades, treinos e competições serão anunciados quando a programação esportiva estiver definida.', 'Nenhuma atividade esportiva anunciada por enquanto.']
};
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  const [title, description, note] = agendaCopy[button.dataset.filter];
  document.querySelector('#agenda-empty-title').innerHTML = title;
  document.querySelector('#agenda-empty-text').textContent = description;
  document.querySelector('.agenda-footnote').textContent = note;
}));
const dialog = document.querySelector('#detail-dialog');
let dialogTrigger;
function openDialog(eyebrow, title, description, extra, trigger) {
  dialogTrigger = trigger;
  document.querySelector('#dialog-eyebrow').textContent = eyebrow;
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-description').textContent = description;
  document.querySelector('#dialog-extra').textContent = extra;
  dialog.showModal(); document.body.classList.add('modal-open');
}
document.querySelectorAll('.close-dialog, .close-action').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialogTrigger?.focus(); });
const products = {
  camiseta: ['Camiseta Delírios', 'Uma proposta de camiseta preta com a identidade da atlética. A imagem é uma composição conceitual: modelagem, estampa, tecido e tamanhos ainda precisam ser definidos.'],
  caneca: ['Caneca da atlética', 'Uma proposta de caneca em vinho com o escudo da Delírios. A imagem é ilustrativa; formato, capacidade, material e arte final ainda precisam ser definidos.'],
  kit: ['Kit de adesivos', 'Uma ideia para levar o símbolo da Delírios para cadernos, notebooks e outros objetos. Formatos, quantidade, acabamento e arte final ainda precisam ser definidos.']
};
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const [title, description] = products[button.dataset.product];
  openDialog('PRÉVIA DA COLEÇÃO', title, description, 'Ainda não está à venda. Preço e lançamento serão divulgados após a definição da coleção.', button);
}));
document.querySelector('#join-button').addEventListener('click', event => openDialog('VEM SER DELÍRIOS', 'Essa história também pode ser sua.', 'A Delírios é a nova atlética de Biomedicina do UNIARAXÁ. Os canais oficiais de contato e as informações para participar serão divulgados aqui assim que forem definidos.', 'Por enquanto, acompanhe esta página para conhecer as próximas novidades.', event.currentTarget));
