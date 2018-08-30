import React from 'react';
import { View } from 'react-native';

import Header from './components/Header';
import ChatList from './components/ChatList';
import ChatDetail from './components/ChatDetail';

import styles from './styles';


export default class App extends React.Component {
  state = {
    current_user: {},
    current_receiver: {},
    users: [],
    messages: []
  }

  componentDidMount() {
    console.log('MOUNT');
    this.setState({
      current_user: {username: 'admin', email: 'admin@example.com'},
      users: [
        {username: 'elisabeth', email: 'e@example.com'},
        {username: 'javi', email: 'javi@example.com'}
      ],
      messages: {
        elisabeth: ['Hello', 'prueba'],
        javi: ['Hello javi', 'prueba javi']
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />

        <ChatList users={this.state.users} />

        <ChatDetail />
      </View>
    );
  }
}
