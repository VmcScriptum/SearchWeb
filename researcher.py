from flask import Flask, request, jsonify, render_template
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/pesquisar', methods=['POST'])
def receber_pesquisa():
    
    dados = request.get_json()
    texto_recebido = dados.get('query') 
    
    print(f"Texto recebido do JS: {texto_recebido}")
    
   
    resposta_python = f"Processando '{texto_recebido}' em nossos PDFs..."
   
    return jsonify({'resposta': resposta_python})

if __name__ == '__main__':
    app.run(debug=True, port=5000)   
    