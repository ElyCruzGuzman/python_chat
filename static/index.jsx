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
        console.log(user);
        this.props.onCreateUser(user);
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
                                    >{item.username}</a>
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
                        <li className="list-group-item chat-you"></li>
                        {this.props.messages.map((item, index) =>
                            <li className="list-group-item"
                                key={index}>{item.text}</li>
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
            current_messages: [],
            current_user: { username: ''}
        };
    },

    handleChangeUserOnApp: function(user) {
        this.setState({current_user: user});
    },

    handleUserCreation: function(user) {
        // TODO POST a la api
        // TODO set state users
        fetch('/api/v1/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((user) => {
            let users = this.state.users;
            users.push(user);
            this.setState({users: users});
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
            this.setState({users: users});
        });
    },

    handleClickCurrentUser(user) {
        // TODO Fetch messages for this user
        this.setState({
            current_user: user,
            messages: []
        });
    },

    sendMessage: function() {
        // TODO Post message
        // TODO Set state messages
    },

    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <Header onChangeUserKeyUp={this.handleChangeUserOnApp}
                        onCreateUser={this.handleUserCreation}
                    />
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <ChatList
                            users={this.state.users}
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