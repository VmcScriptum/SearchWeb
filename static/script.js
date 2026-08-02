function pesquisar() {

    var textoPesquisa = document.getElementById("pesquisa").value;

    document.getElementById("resultado").innerHTML = "Pesquisando: " + textoPesquisa;

    fetch('/api/pesquisar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: textoPesquisa }),
    })
    .then(response => response.json())
    .then(data => {
        // 3. Recebe a resposta do Python e atualiza a tela
        document.getElementById("resultado").innerHTML = "Resposta do Python: " + data.resposta;
    })
    .catch((error) => {
        console.error('Erro:', error);
        document.getElementById("resultado").innerHTML = "Erro na comunicação com o Python.";
    });
}   