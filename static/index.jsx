/*** @jsx React.DOM */


var Header = React.createClass({
    handleUserChange: function(e) {
        this.props.onChangeUserKeyUp(e.target.value);
    },

    handleCreateUser: function() {
        const user = {
            email: this.state.email,
            username: this.state.username
        };
        this.props.onCreateUser(user);
    },

    authenticateUser: function() {
        this.props.onAuthenticateUser(this.state.authenticated_user);
    },

    render: function() {
        return (
            <div>HEADER
                <input type="text" onKeyUp={(e) => this.handleUserChange(e)} />

                <label htmlFor="">username</label>
                <input type="text" name="username"
                    onKeyUp={(e) => this.setState({username: e.target.value})}/>
                <label htmlFor="">email</label>
                <input type="text" name="email"
                    onKeyUp={(e) => this.setState({email: e.target.value})}/>

                <input type="button" value="Create user"
                    onClick={() => this.handleCreateUser()}/>

                <input type="text"
                    onKeyUp={(e) => this.setState({authenticated_user: e.target.value})} />

                <input type="button" value="Authenticate"
                    onClick={() => this.authenticateUser()}/>
            </div>);
    }
});

var ChatList = React.createClass({
    getDefaultProps: function() {
        return {
            users: []
        };
    },

    onClickUser: function(user) {
        this.props.onClickCurrentUser(user);
    },

    render: function() {
        return (
            <div className="card">
                <div className="card-body">
                    <ul className="list-group">
                        {this.props.users.map((item, index) =>
                            <li className="list-group-item"
                                key={index}>
                                <a href="#user"
                                   onClick={ () => this.onClickUser(item) }
                                    >{item.username} - {item.id}</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
});

var ChatDetail = React.createClass({
    getDefaultProps: function() {
        return {
            messages: []
        };
    },

    render: function() {

        return (
            <div className="card">
                <div className="card-body">
                    <h2>{this.props.you.username}</h2>
                    <ul className="list-group">
                        {this.props.messages.map((item, index) =>
                            <li className="list-group-item chat-you"
                                key={index}>{item}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
});

var App = React.createClass({

    getInitialState: function() {
        return {
            users: [],
            users_filtered: [],
            current_messages: [],
            current_user: { username: ''},
            authenticated_user: null
        };
    },

    handleChangeUserOnApp: function(query) {
        const users = this.state.users.filter((item) => {
            return item.username.includes(query);
        })
        this.setState({users_filtered: users});
    },

    handleUserCreation: function(user) {
        fetch('/api/v1/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((user_data) => {
            this.setState(
                {
                    users: this.state.users.concat(user),
                    users_filtered: this.state.users.concat(user)
                });
        });
    },

    componentDidMount: function() {
        fetch('/api/v1/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((users) => {
            this.setState({users: users, users_filtered: users});
        });
    },

    handleClickCurrentUser(user) {
        const message_id = [this.state.authenticated_user.id, user.id].join('_');
        fetch('/api/v1/messages/' + message_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((messages) => {
            this.setState({
                current_user: user,
                current_messages: messages
            });
        });
    },

    sendMessage: function() {
        let message = {
            text: this.state.current_message,
            sender: this.state.authenticated_user.id,
            receiver: this.state.current_user.id,
        }

        fetch('/api/v1/messages', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => {
            message = response.json();
            this.setState({
                current_messages: this.state.current_messages.concat(
                    this.state.current_message)
            });
        });
    },

    handleUserAuthentication: function(user_id) {
        fetch('/api/v1/users/' + user_id, {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((user) => {
            this.setState({authenticated_user: user})
        });
    },

    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <Header onChangeUserKeyUp={this.handleChangeUserOnApp}
                        onCreateUser={this.handleUserCreation}
                        onAuthenticateUser={this.handleUserAuthentication}
                    />
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <ChatList
                            users={this.state.users_filtered}
                            onClickCurrentUser={this.handleClickCurrentUser}
                        />
                    </div>
                    <div className="col-md-7">
                        <ChatDetail you={this.state.current_user}
                            messages={this.state.current_messages}
                        />

                        <input type="text"
                            onKeyUp={(e) => this.setState({current_message: e.target.value})}
                        />
                        <input type="button" value="Send"
                            className="btn btn-primary"
                            onClick={() => this.sendMessage()} />
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('root')
);