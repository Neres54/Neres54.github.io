const paginas = ['blade_runner.html', 'matrix.html', 'duna.html', 'interestelar.html', 'mochileiro.html'];

async function startCrawler() {
  const apontamentos = {};

  for (const pagina of paginas) {
    const resposta = await fetch(pagina);
    const texto = await resposta.text();
    const links = [...texto.matchAll(/<a\s+href="([^"]+)"/g)].map(match => match[1]);

    links.forEach(link => {
      if (!apontamentos[link]) {
        apontamentos[link] = { quemAponta: [], count: 0 };
      }
      apontamentos[link].quemAponta.push(pagina);
      apontamentos[link].count++;
    });
  }

  // Exibir na tabela
  const tabela = document.getElementById('resultado-tabela');
  tabela.innerHTML = '';

  for (const [pagina, dados] of Object.entries(apontamentos)) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pagina}</td>
      <td>${dados.quemAponta.join(', ')}</td>
      <td>${dados.count}</td>
    `;
    tabela.appendChild(tr);
  }
}
