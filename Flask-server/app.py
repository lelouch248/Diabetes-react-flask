from flask import Flask, request, jsonify
import joblib
app = Flask(__name__)

# Load the scikit-learn model
model = joblib.load('./ML_model/random_forest_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the request
        data = request.get_json()
        print(data)
        # Perform any preprocessing on the input data if needed
        # ...

        # Use the scikit-learn model for predictions
        prediction = model.predict([data])

        # Return the prediction as JSON
        return jsonify({'prediction': prediction.tolist()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/',methods=['GET'])
def getInitial():
    try:
        return jsonify({'initmsg':'hello world'}),200
    except Exception as e:
        return jsonify({'error':str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
