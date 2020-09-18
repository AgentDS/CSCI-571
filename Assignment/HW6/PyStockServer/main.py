from flask import Flask
from flask import jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify({'msg': "success",
                    'data': 'welcome'})


@app.route('/login')
def login():
    return jsonify({'msg': "sucess",
                    'data': 'login sucess'})


@app.route('/bus/<station>')
def bus_info(station):
    import bus
    info = bus.get_bus_info(station)
    return jsonify({'msg': 'success',
                    'data': info})


app.run()
