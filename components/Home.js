import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { generateId } from '../shared/generateId';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [
                {
                    id: '11111',
                    title: 'Example Group',
                    members: [
                        {
                            id: '1',
                            name: 'David',
                            rank: 3
                        },
                        {
                            id: '2',
                            name: 'Sarvagya',
                            rank: 4
                        },
                        {
                            id: '3',
                            name: 'Ken',
                            rank: 2
                        },
                        {
                            id: '4',
                            name: 'Daniel',
                            rank: 3
                        }
                    ]
                }
            ]
        }
    }

    addNewGroup = (newTitle, newMembers) => {
        const newGroup = {
            id: generateId(5),
            title: newTitle,
            members: newMembers
        }
        const updatedGroups = this.state.groups.concat(newGroup);
        this.setState({groups: updatedGroups});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.route.params?.newMembers !== this.props.route.params?.newMembers) {
            this.addNewGroup(this.props.route.params?.newTitle, this.props.route.params?.newMembers);
        }
    }

    render() {

        const renderGroups = ({item}) => {
            return (
                <SwipeRow rightOpenValue={-200} style={styles.swipeRow}>

                    <View style={styles.swipeView}>

                        <TouchableOpacity style={styles.editTouchable}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteTouchable}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem
                            bottomDivider
                            containerStyle={{backgroundColor: '#C99F37'}}
                            onPress={() => this.props.navigation.navigate('Display', {selectedGroup: item.members})}
                        >
                            <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Avatar icon={{name: 'users', type: 'font-awesome', size: 30, color: '#476D6E'}} />
                                    <ListItem.Title style={{fontSize: 24, marginLeft: 10, alignSelf: 'center'}}>{item.title}</ListItem.Title>
                                    <ListItem.Subtitle style={{alignSelf: 'center', marginLeft: 10}}>{`${item.members.length} Members`}</ListItem.Subtitle>
                                </View>
                                <ListItem.Chevron color='black' />
                            </ListItem.Content>
                        </ListItem>
                    </View>

                </SwipeRow>
            );
        }

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>

            <Animatable.View animation='fadeInRightBig' duration={500} style={{flex: 4}}>
                <FlatList
                    data={this.state.groups}
                    renderItem={renderGroups}
                    keyExtractor={item => item.id}
                />
            </Animatable.View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    swipeView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    editTouchable: {
        backgroundColor: 'grey',
        height: '100%',
        justifyContent: 'center'
    },
    editText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});
