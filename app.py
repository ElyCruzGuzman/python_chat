from flask import Flask, jsonify, request, render_template

from persist import RedisPersistService

app = Flask(__name__)
persist_client = RedisPersistService()

# User
# username
# email
# ID

# Message
# sender_id
# receiver_id
# content

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/v1/users", methods=['GET'])
def list_users():
    user_list = persist_client.get_list('users')
    return jsonify(user_list)


@app.route("/api/v1/users/<user_id>", methods=['GET'])
def get_user(user_id):
    user = persist_client.get('users', user_id)
    return jsonify(user)


@app.route("/api/v1/users", methods=['POST'])
def create_user():
    user_data = request.get_json()
    user = persist_client.create('users', user_data)
    return jsonify(user)


@app.route("/api/v1/users/<user_id>", methods=['PUT'])
def update_user(user_id):
    user_data = request.get_json()
    user = persist_client.update('users', user_data, user_id)
    return jsonify(user)


@app.route("/api/v1/users/<user_id>", methods=['DELETE'])
def delete_user(user_id):
    persist_client.delete('users', user_id)
    return jsonify(), 204


@app.route("/api/v1/messages", methods=['GET'])
def list_messages():
    message_list = persist_client.get_list('messages')
    return jsonify(message_list)


@app.route("/api/v1/messages/<message_id>", methods=['GET'])
def get_message(message_id):
    message = persist_client.get('messages', message_id)
    return jsonify(message)


@app.route("/api/v1/messages", methods=['POST'])
def create_message():
    message_data = request.get_json()
    message = persist_client.create('messages', message_data)
    return jsonify(message)


@app.route("/api/v1/messages/<message_id>", methods=['PUT'])
def update_message(message_id):
    message_data = request.get_json()
    message = persist_client.update('messages', message_data, message_id)
    return jsonify(message)


@app.route("/api/v1/messages/<message_id>", methods=['DELETE'])
def delete_message(message_id):
    persist_client.delete('messages', user_id)
    return jsonify(), 204






