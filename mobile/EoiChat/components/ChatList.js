import React from 'react';
import { FlatList, View, Text } from 'react-native';

export default class ChatList extends React.Component {
    getDefaultProps() {
        return {
            users: []
        };
    }

    selectConversation(e) {
        console.log(e);
    }

    render() {
        var self = this;
        return (
            <View>
                <Text>Chat List</Text>
                <FlatList
                    data={this.props.users}
                    keyExtractor={(user) => { return user.username; }}
                    renderItem={
                        (user) => <Text>{user.item.username}</Text>
                    }
                ></FlatList>
            </View>
        );
    }
}
