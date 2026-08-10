from flask import Flask, request, jsonify, render_template
from flask_cors import CORS 
from googlesearch import search

app = Flask(__name__)
CORS(app) 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/pesquisar', methods=['POST'])
def receber_pesquisa():
    
    dados = request.get_json()
    texto_recebido = dados.get('query') 
    query_pesquisa = f"{texto_recebido}pdf"

    resultados = search(query_pesquisa, num_results=10)

    lista_links = []

    for url in resultados:
            lista_links.append(f"<b>Documento PDF</b><br><a href='{url}' target='_blank'>{url}</a><br><br>")

    if not lista_links:
            resposta_python = "Nenhum resultado encontrado."
    else:
            resposta_python = "".join(lista_links)

    print(f"Texto recebido do JS: {texto_recebido}")

    return jsonify({'resposta': resposta_python})

if __name__ == '__main__':
    app.run(debug=True, port=5000)