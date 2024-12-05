from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Achievement

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///achievements.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)
db.init_app(app)

@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json
    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'})

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/achievements', methods=['GET', 'POST'])
@jwt_required()
def achievements():
    user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.json
        achievement = Achievement(
            title=data['title'],
            description=data['description'],
            user_id=user_id
        )
        db.session.add(achievement)
        db.session.commit()
        return jsonify({'message': 'Achievement added'})
    
    achievements = Achievement.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in achievements])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
