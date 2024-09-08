from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        expression = request.json['expression']
        # Safe evaluation using eval is recommended to avoid security issues
        result = eval(expression)
        return jsonify({'result': result})
    except ZeroDivisionError:
        return jsonify({'error': 'Division by zero is not allowed.'})
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)
