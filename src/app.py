from os import abort
from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from models import db, User


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] ="sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db.init_app(app)
with app.app_context():
    db.create_all()

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

@app.route('/register', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    # Check for blank requests
    # if username is None or password is None:
    #     abort(400)
    # Check for existing users
    # if User.query.filter_by(username=username).first():
    #     abort(400)

    user = User(username=username, password=password)
    user.hash_password(password)
    db.session.add(user)
    # db.session.commit()
    return (jsonify({"username": user.username, "password": user.password}), 201)

@app.route('/login', methods=["POST"])
def login():
    print(request)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username == "test" or password == "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    print(access_token)
    return jsonify({"token": access_token})


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
