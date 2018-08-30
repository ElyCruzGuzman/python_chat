import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

import styles from '../styles';


export default class Header extends React.Component {
    state = {
        username: '',
        username_created: '',
        email_created: ''
    }

    handleUserChange(e) {
        this.props.onChangeUserKeyUp(e.target.value);
    }

    handleCreateUser() {
        const user = {
            email: this.state.email_created,
            username: this.state.username_created
        };
        this.props.onCreateUser(user);
    }

    authenticateUser() {
        console.log('Hello');
        this.props.onAuthenticateUser(this.state.authenticated_user);
    }

    render() {
        return (
            <View>
                <Text>Create user: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(username_created) => this.setState({username_created: username_created})}></TextInput>
                <TextInput
                    style={styles.input}
                    onChangeText={(email_created) => this.setState({email_created: email_created})}></TextInput>

                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(username) => this.setState({username: username})}></TextInput>
                <Button
                    onPress={() => { this.authenticateUser }}
                    title="Authenticate"
                />

                { this.state.username ?
                    <Text>Logged in as: {this.state.username}</Text> :
                    <Text>Login!</Text>
                }

                <Text>-------------------------</Text>

            </View>
        );
    }
}
