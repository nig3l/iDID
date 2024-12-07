from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Achievement
from datetime import timedelta

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///achievements.db'
app.config['JWT_SECRET_KEY'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMzQ4MDAzNCwianRpIjoiMDBkODNjNTYtYzg1Ny00NjRkLTg0ZjYtZWMxZTczMTNlMTQ4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzMzNDgwMDM0LCJjc3JmIjoiMmM4YWI0NTQtNDllMi00OGY4LTk2ZTEtNDlkZDQ1OTRmZmI0IiwiZXhwIjoxNzMzNTY2NDM0fQ.Ks3eQ2IWWcKSUpUoamdCFMo3fIA78f0fCI3HZ7zlA6"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
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
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'access_token': access_token})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/auth/delete_user/<email>', methods=['DELETE'])
def delete_user(email):
    user = User.query.filter_by(email=email).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    return jsonify({'error': 'User not found'}), 404


@app.route('/achievements', methods=['GET', 'POST'])
@jwt_required()
def achievements():
    user_id = int(get_jwt_identity())
    if request.method == 'POST':
        data = request.json
        
        # data validation
        if not isinstance(data.get('title'), str):
            return jsonify({'msg': 'Title must be a string'}), 400
        
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
