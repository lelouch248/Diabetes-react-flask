from flask import Flask, request, jsonify
import joblib
app = Flask(__name__)

# Load the scikit-learn model
model = joblib.load('./ML_model/random_forest_model.joblib')
feature_names = ["Pregnancies"	,"Glucose"	,"BloodPressure"	,"SkinThickness"	,"Insulin"	,"BMI",	"DiabetesPedigreeFunction"	,"Age",	"Outcome"]
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = []
        for _, value in data.items():
            input_data.append(float(value))
        prediction = model.predict([input_data])
       
        return jsonify({'prediction':str(prediction.tolist()[0])}), 200
    except Exception as e:
        return jsonify({'error': e}), 500

@app.route('/', methods=['GET'])
def getInitial():
    try:
        return jsonify({'initmsg': 'hello world'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
