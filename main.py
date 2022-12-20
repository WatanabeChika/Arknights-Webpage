from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
import pymysql
import json

with open ('static/ArkOperators.json', 'r', encoding='utf-8') as f:
    reslis = json.load(f)


app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:20030804wly@127.0.0.1:3306/mydata'

@app.route('/', methods=['GET'])
def mainpage():
    return render_template('ArkWeb.html', namelist = reslis)
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

