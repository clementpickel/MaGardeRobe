import tensorflow as tf
from tensorflow import keras

import numpy as np
import matplotlib.pyplot as plt

print(tf.__version__)

fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

class_name = ["T-shirts/top", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"]


train_images.shape
plt.figure()
plt.imshow(train_images[0])
plt.colorbar()
plt.gca().grid(False)
# plt.show()

train_images = train_images/255.0
test_images = test_images /255.0
