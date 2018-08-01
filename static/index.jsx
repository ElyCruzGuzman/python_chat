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

    render: function() {
        return (
            <div>
                <ul>
                    {this.props.users.map((item, index) =>
                        <li key={index}>{item.username}</li>
                    )}
                </ul>
            </div>
        );
    }
});

var ChatDetail = React.createClass({
    render: function() {
        return (<div>DETAIL {this.props.user}</div>);
    }
});

var App = React.createClass({

    getInitialState: function() {
        return {
            users: [],
            messages: [],
            current_user: null
        };
    },

    handleChangeUserOnApp: function(username) {
        this.setState({current_user: username});
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
            let users = this.state.users;
            users.push(res.json());
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
                        <ChatList users={this.state.users} />
                    </div>
                    <div className="col-md-7">
                        <ChatDetail user={this.state.current_user} />
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