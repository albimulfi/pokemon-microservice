import joblib

model = joblib.load("model.pkl")
sample = [[78, 84, 78, 100]]
prediction = model.predict(sample)

print("Prediction:", prediction[0])