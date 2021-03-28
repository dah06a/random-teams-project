import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ListItem, Avatar, Text, Overlay, Button } from 'react-native-elements';
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
                    id: '00000',
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
                        },
                        {
                            id: '5',
                            name: 'Jeff',
                            rank: 4
                        },
                        {
                            id: '6',
                            name: 'Josh',
                            rank: 5
                        },
                        {
                            id: '7',
                            name: 'Tom',
                            rank: 2
                        },
                        {
                            id: '8',
                            name: 'Nigel',
                            rank: 1
                        },
                        {
                            id: '9',
                            name: 'Martha',
                            rank: 1
                        },
                        {
                            id: '10',
                            name: 'Kathy',
                            rank: 2
                        },
                        {
                            id: '11',
                            name: 'Ian',
                            rank: 2
                        },
                        {
                            id: '12',
                            name: 'Chadly',
                            rank: 1
                        },
                        {
                            id: '13',
                            name: 'Erin',
                            rank: 4
                        },
                        {
                            id: '14',
                            name: 'Brielle',
                            rank: 5
                        }
                    ]
                }
            ],
            selectedGroup: {},
            overlayVisible: false
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

    editGroup = (groupId) => {
        const groupToEdit = this.state.groups.filter(group => group.id === groupId)[0];
        this.props.navigation.navigate('Create', {selectedGroup: groupToEdit});
    }

    updateGroup = (groupId) => {
        const updatedGroups = this.state.groups.map(group => {
            if (group.id === groupId) {
                group.title = this.props.route.params.newTitle;
                group.members = this.props.route.params.newMembers;
            }
            return group;
        });
        this.setState({groups: updatedGroups});
    }

    askDeleteGroup = (groupId) => {
        const groupToDelete = this.state.groups.filter(group => group.id === groupId)[0];
        this.setState({selectedGroup: groupToDelete, overlayVisible: true});
    }

    deleteGroup = (groupId) => {
        const updatedGroups = this.state.groups.filter(group => group.id !== groupId);
        this.setState({groups: updatedGroups, overlayVisible: false});
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params?.editId !== this.props.route.params?.editId) {
            this.updateGroup(this.props.route.params.editId);
        } else if (prevProps.route.params?.newMembers !== this.props.route.params?.newMembers) {
            this.addNewGroup(this.props.route.params?.newTitle, this.props.route.params?.newMembers);
        }
    }

    render() {
        console.log(this.state.selectedGroup);

        const renderGroups = ({item}) => {
            return (
                <SwipeRow rightOpenValue={-200} style={styles.swipeRow}>

                    <View style={styles.swipeView}>

                        <TouchableOpacity style={styles.editTouchable} onPress={() => this.editGroup(item.id)}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteTouchable} onPress={() => this.askDeleteGroup(item.id)}>
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

                <Overlay
                    isVisible={this.state.overlayVisible}
                    onBackdropPress={() => this.setState({overlayVisible: false, selectedGroup: {}})}
                >
                    <TouchableWithoutFeedback >
                        <View style={{padding: 10, minHeight: 400, minWidth: 300, justifyContent: 'center', alignItems: 'center'}}>

                            <Text h2 style={{flex: 1, marginBottom: 20}}>Delete Group</Text>
                            <Text h4 style={{flex: 1}}>Are you sure you want to delete</Text>
                            <Text h3 style={{flex: 1}}>{this.state.selectedGroup.title} ?</Text>

                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Button
                                    title='Cancel'
                                    style={{width: 100, marginHorizontal: 20}}
                                    onPress={() => this.setState({overlayVisible: false, selectedGroup: {} })}
                                />
                                <Button
                                    title='Delete'
                                    style={{width: 100, marginHorizontal: 20}}
                                    buttonStyle={{backgroundColor: 'red'}}
                                    onPress={() => this.deleteGroup(this.state.selectedGroup.id)}
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>

                </Overlay>


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
