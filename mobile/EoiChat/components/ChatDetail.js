import React from 'react';
import { FlatList, View, Text } from 'react-native';

export default class ChatDetail extends React.Component {
    getDefaultProps() {
        return {
            messages: [],
            username: ''
        };
    }

    render() {
        return (
            <View>
                <Text>Detail: {this.props.username}</Text>
            </View>
        );
    }
}
