import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>
                                <Text onPress={() => this.props.navigation.navigate('Create')}>Example List Item</Text>
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
