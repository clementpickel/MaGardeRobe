from flask import Flask, request, jsonify
import os
from model import train_model
from PIL import Image, ImageOps
import numpy as np

app = Flask(__name__)
model = train_model()
class_name = ["T-shirts/top", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"]

def make_prediction(image):
    img = (np.expand_dims(image, 0))
    predictions = model.predict(img)
    print(predictions)
    predictions = predictions[0]
    tag = np.argmax(predictions)
    print("Prediction:", tag, ',', class_name[tag])
    return int(tag)

def convert_image(file):
    image = Image.open(file.stream)
    image = image.resize((28, 28))
    image = image.convert('L')
    image = ImageOps.invert(image)
    image = np.array(image) / 255.0
    
    return make_prediction(image)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        tag = convert_image(file)
        return jsonify({'message': 'File uploaded successfully',
                        'filename': file.filename,
                        'tag': tag,
                        'type': class_name[tag],
                        })

if __name__ == '__main__':
    app.run(debug=True)
