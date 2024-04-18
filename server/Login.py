from models import Employee, Manager  
from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
jwt = JWTManager(app)

@app.route('/login', methods=['POST'])
def login():
    # Get user's credentials from the request
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Validate user's credentials
    # Check if the user is an employee
    employee = Employee.query.filter_by(email=email).first()
    if employee and employee.check_password(password):
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
    else:
        # Check if the user is a manager
        manager = Manager.query.filter_by(email=email).first()
        if manager and manager.check_password(password):
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
        else:
            return jsonify({"msg": "Invalid credentials"}), 401

    # Set the JWT tokens as cookies in the response
    resp = jsonify(access_token=access_token, refresh_token=refresh_token)
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)

    return resp, 200


@app.route('/protected', methods=['POST'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    # Get the identity of the refresh token that was used to make the request
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    resp = jsonify(access_token=access_token)
    set_access_cookies(resp, access_token)
    return resp, 200


@app.route('/logout', methods=['POST'])
def logout():
    # Perform logout actions
    
    # response object
    resp = jsonify({"msg": "Logged out successfully"})
    
    # Unset JWT cookies
    unset_jwt_cookies(resp)
    return resp, 200


if __name__ == '__main__':
    app.run(debug=True)
