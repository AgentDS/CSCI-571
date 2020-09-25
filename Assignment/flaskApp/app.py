# -*- coding: utf-8 -*-
# @Time    : 9/24/20 11:24 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : app.py
# @Software: PyCharm
from flask import Flask, jsonify
from flask import render_template
from flask import abort

app = Flask(__name__)

tasks = [
    {'id': 1, 'title': u'Buy groceries', 'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 'done': False},
    {'id': 2, 'title': u'Learn Python', 'description': u'Need to find a good Python tutorial on the web', 'done': False}
]



@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('home.html')


@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})


@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
def get_task_id(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})

@app.route('/homepage')
def homepage():
    user = {'username': 'Miguel'}
    posts = [{'author': {'username': 'John'},
              'body': 'Beautiful day in Portland!'},
             {'author': {'username': 'Susan'},
              'body': 'The Avengers movie was so cool!'}]
    return render_template('index.html', title='Home', user=user, posts=posts)

@app.route('todo/api/v1.0/news/<>')
def get_news():
    pass

if __name__ == '__main__':
    app.run(debug=True)
