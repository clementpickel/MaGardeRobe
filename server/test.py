import requests

url = 'http://127.0.0.1:5000/upload'  # Mettez l'URL de votre serveur Flask ici
files = {'file': open('assets/shirt.jpg', 'rb')}  # Remplacez le chemin par le chemin de votre image

response = requests.post(url, files=files)

if response.status_code == 200:
    print(response.content)
else:
    print('Erreur lors de l envoi de l image')
    print(response.text)
