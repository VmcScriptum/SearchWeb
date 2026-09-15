function enviarPesquisa(evento) {
    evento.preventDefault();
    const textoBusca = document.getElementById('pesquisa').value;
    const areaResultados = document.getElementById('resultados');
    areaResultados.innerHTML = `<p>Procurando no servidor: ${textoBusca}...</p>`;
}
document.getElementById('form-pesquisa').addEventListener('submit', enviarPesquisa);