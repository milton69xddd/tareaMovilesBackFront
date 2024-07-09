from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/clasificar', methods=['POST'])
def classify_text():
    texto = request.form.get('texto', ' ')
    candidate_labels = ['Política', 'Deportes', 'Religión', 'Otros','Ciencia', 'Autos', 'Carreras', 'Programacion']
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    
    resultado_clasificacion = classifier(texto, candidate_labels)
    #print("Resultado de la clasificación:", resultado_clasificacion)  # Añade este log
    
    max_score = resultado_clasificacion['scores'].index(max(resultado_clasificacion['scores']))
    label_score = resultado_clasificacion['labels'][max_score]
    
    return jsonify({'label': label_score})

if __name__ == '__main__':
    app.run(debug=False, host='localhost', port=5000)
