import json
import vonage
from operator import add
from decouple import config
from flask import Flask, render_template, request, redirect, jsonify
from flask.helpers import flash, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin, login_manager, login_user, LoginManager, login_required, logout_user, current_user

app = Flask(__name__)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
API_KEY= config('vonageKey')
API_SECRET=config('vonageSecret')
PRO_SEC=config('proKey')
MOBNUM=config('number')
client = vonage.Client(key=API_KEY, secret=API_SECRET)
sms = vonage.Sms(client)

app.config['SECRET_KEY'] = PRO_SEC
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dbill.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_BINDS'] = {
    'user': 'sqlite:///users.db', 'prod': 'sqlite:///prod.db'}

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


class Dcust(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cname = db.Column(db.String(50), nullable=False)
    cno = db.Column(db.Integer, nullable=False)
    cadd = db.Column(db.String(100), nullable=False)

    bill = db.relationship('Dbill', backref='dcust', lazy=True)


class Dbill(db.Model):
    tpid = db.Column(db.Integer, primary_key=True)
    cust_id = db.Column(db.Integer, db.ForeignKey('dcust.id'), nullable=False)
    pname = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    discount = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)


class Users(db.Model, UserMixin):
    __bind_key__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), primary_key=False)
    org = db.Column(db.String(100), primary_key=False)
    email = db.Column(db.String(60), primary_key=False)
    mob = db.Column(db.Integer, primary_key=False)
    pwd = db.Column(db.String(80), primary_key=False)


class Prod(db.Model):
    __bind_key__ = 'prod'
    proid = db.Column(db.Integer, nullable=False, primary_key=True)
    proname = db.Column(db.String, nullable=False, primary_key=False)
    proprice = db.Column(db.Integer, nullable=False, primary_key=False)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = Users.query.filter_by(email=request.form['uname']).first()
        passw = str(request.form['pwd'])
        if user and bcrypt.check_password_hash(user.pwd, passw):
            login_user(user)
            return redirect(url_for('bill'))
        else:
            flash('Login Unsuccessful! Please check email and password')
    return render_template('login.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/addpro', methods=['POST', 'GET'])
def addpro():
    if request.method == 'POST':
        data = request.json
        # print(request.is_json)
        # print(data)
        proname = data['proname']
        proprice = data['proprice']
        prods = Prod(proname=proname, proprice=proprice)
        db.session.add(prods)
        db.session.commit()
        return jsonify(data)
    return render_template('bill.html')


@app.route('/addcus', methods=['POST', 'GET'])
def addcus():
    if request.method == 'POST':
        data = request.json
        # print(request.is_json)
        # print(data)
        cusname = data['cusname']
        cusmob = data['cusmob']
        cusadd = data['cusadd']
        cus = Dcust(cname=cusname, cno=cusmob, cadd=cusadd)
        db.session.add(cus)
        db.session.commit()
        return jsonify(data)
    return render_template('bill.html')


@app.route('/reg', methods=['POST', 'GET'])
def get():

    if request.method == 'POST':
        name = request.form['fname']
        org = request.form['forg']
        email = request.form['femail']
        phone = request.form['fphone']
        pwd = bcrypt.generate_password_hash(
            request.form['fpwd']).decode('utf-8')
        users = Users(name=name, org=org, email=email, mob=phone, pwd=pwd)
        db.session.add(users)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template('reg.html')


@app.route('/bill', methods=['GET', 'POST'])
def bill():
    if request.method == 'POST':
        name = request.form['pname']
        pri = request.form['pri']
        qua = request.form['qua']
        dis = request.form['dis']
        tpri = request.form['tpri']
        bill = Dbill(pname=name, price=pri, quantity=qua,
                     discount=dis, total=tpri)
        db.session.add(bill)
        db.session.commit()
    return render_template('bill.html')


@app.route('/sum', methods=['POST', 'GET'])
def sum():
    return render_template('sum.html')


@app.route('/send', methods=['POST', 'GET'])
def send():
    if request.method == 'POST':
        data = request.json
        responseData = sms.send_message(
            {
                "from": "Vonage APIs",
                "to": MOBNUM,
                "text": f"Total amount to be paid: {data['prosum']}",
            }
        )
        if responseData["messages"][0]["status"] == "0":
            print("Message sent successfully.")
        else:
            print(
                f"Message failed with error: {responseData['messages'][0]['error-text']}")

    return render_template('sum.html')


if __name__ == "__main__":
    app.run(debug=True)
