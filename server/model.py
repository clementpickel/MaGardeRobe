import tensorflow as tf
from tensorflow import keras

import numpy as np

def train_model():
    print("tensorflw version:", tf.__version__)

    fashion_mnist = keras.datasets.fashion_mnist
    (train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()
    
    train_images = train_images/255.0
    test_images = test_images /255.0

    model = keras.Sequential([
        keras.layers.Flatten(input_shape=(28, 28)),
        keras.layers.Dense(128, activation=tf.nn.relu),
        keras.layers.Dense(64, activation=tf.nn.relu),
        keras.layers.Dense(10, activation=tf.nn.softmax)
    ])

    model.compile(optimizer=tf.keras.optimizers.Adam(),
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy'])

    model.fit(train_images, train_labels, epochs=5 )

    test_loss, test_acc= model.evaluate(test_images, test_labels)
    print("Test accuracy:", test_acc)
    print("Test loss:", test_loss)

    return model
