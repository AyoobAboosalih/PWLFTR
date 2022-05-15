# This is the pipleine utilized to validate the model
# This data was not utilized in the training process of the model

import numpy as np


from tensorflow.keras.models import load_model
from sklearn.metrics import accuracy_score

# Actions that we try to detect
Squat_result = np.array(['Valid', 'Invalid'])

#Loading Validation Data
Validation_Sequences = np.load("Validation_Sequences.npy")

model = load_model('PWLFTR.h5')

# validation data includes 10 Valid and Invalid Squats
y_true = ["Valid", "Valid", "Valid", "Valid", "Valid", "Valid", "Valid", "Valid", "Valid", "Valid", "Invalid",
          "Invalid", "Invalid", "Invalid", "Invalid", "Invalid", "Invalid", "Invalid", "Invalid", "Invalid", ]

y_pred = []

for seq in Validation_Sequences:
    res = model.predict(np.expand_dims(seq, axis=0))
    result = Squat_result[np.argmax(res)]
    y_pred.append(result)

accuracy_score(y_true, y_pred)

