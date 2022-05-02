import tensorflow as tf
import numpy as np
from matplotlib import pyplot as plt

# Imports for training and testing data creation
from sklearn.model_selection import train_test_split

# Imports for model architecture
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import TensorBoard
from keras.constraints import maxnorm


# Imports for model evaluation
from sklearn.metrics import multilabel_confusion_matrix, accuracy_score, confusion_matrix

squat_result = np.array(['Valid', 'Invalid'])

X = np.load("Features_240.npy")
y = np.load("Labels_240.npy")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Callback for early stopping to save the best model
callback = [tf.keras.callbacks.EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=50),
            tf.keras.callbacks.ModelCheckpoint(
              'best_model_sigmoid-dropout-nuerons.h5',
              monitor='val_accuracy',
              mode='max',
              save_best_only=True,
              verbose=1)
            ]

# Model Architecture
model = Sequential()
model.add(LSTM(256, return_sequences=True, activation='relu', input_shape=(191,132)))
model.add(LSTM(128, return_sequences=True, activation='relu'))
model.add(LSTM(64, return_sequences=False, activation='relu'))
model.add(Dense(64, activation='relu', kernel_constraint=maxnorm(3)))
model.add(Dropout(0.2))
model.add(Dense(32, activation='relu'))
model.add(Dense(squat_result.shape[0], activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

history = model.fit(X_train, y_train, epochs=500, validation_data=(X_test, y_test), callbacks = [callback])

# load the saved model
saved_model = load_model('best_model_sigmoid-dropout-nuerons.h5')
# evaluate the model
_, train_acc = saved_model.evaluate(X_train, y_train, verbose=0)
_, test_acc = saved_model.evaluate(X_test, y_test, verbose=0)
print('Train: %.3f, Test: %.3f' % (train_acc, test_acc))

# plot training history
plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='test')
plt.legend()
plt.show()

yhat = model.predict(X_test)

ytrue = np.argmax(y_test, axis=1).tolist()
yhat = np.argmax(yhat, axis=1).tolist()

confusion_matrix(ytrue, yhat)

accuracy_score(ytrue, yhat)

