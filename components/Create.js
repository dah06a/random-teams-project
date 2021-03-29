import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ListItem, Avatar, Overlay, Button, Icon, Text, Input } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { generateId } from '../shared/generateId';
import { getMemberColor } from '../shared/getMemberColor';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: [],
            groupEditId: '',
            groupTitle: '',
            newMemberId: '',
            newMemberName: '',
            newMemberRank: 1,
            updating: false,
            overlayVisible: false,
            pickerVisable: false,
            errorVisable: false,
            exampleData: [
                {name: 'David', rank: 3},
                {name: 'Sarvagya', rank: 3},
                {name: 'Jeff', rank: 4},
                {name: 'Josh', rank: 5},
                {name: 'Tom', rank: 2},
                {name: 'Daniel', rank: 3},
                {name: 'Ken', rank: 2},
                {name: 'Nigel', rank: 1},
              ]
        }
    }

    componentDidMount() {
        const groupToEdit = this.props.route.params?.selectedGroup;
        console.log(groupToEdit);
        if (groupToEdit) {
            this.setState({groupEditId: groupToEdit.id, groupTitle: groupToEdit.title, group: groupToEdit.members})
        }
    }

    toggleOverlay = () => {
        this.setState({overlayVisible: !this.state.overlayVisible, pickerVisable: false});
    }

    addNewMember = () => {
        if (this.state.newMemberName === '') this.setState({errorVisable: true});
        else {
            this.setState({errorVisable: false});
            const newId = generateId(10);
            const newMember = {
                id: newId,
                name: this.state.newMemberName,
                rank: this.state.newMemberRank
            }
            const updatedGroup = this.state.group.concat(newMember);
            this.setState({group: updatedGroup});
            this.toggleOverlay();
        }
    }

    saveMember = () => {
        if (this.state.newMemberName === '') this.setState({errorVisable: true});
        else {
            this.setState({errorVisable: false});
            const updatedGroup = this.state.group.map(member => {
                if (member.id === this.state.newMemberId) {
                    const updatedMember = {
                        id: this.state.newMemberId,
                        name: this.state.newMemberName,
                        rank: this.state.newMemberRank
                    }
                    return updatedMember;
                }
                return member;
            });
            this.setState({group: updatedGroup, updating: false});
            this.toggleOverlay();
        }
    }

    updateMember = (id) => {
        const selectedMember = this.state.group.filter(member => member.id === id)[0];
        this.setState({newMemberId: selectedMember.id, newMemberName: selectedMember.name, newMemberRank: selectedMember.rank, updating: true});
        this.toggleOverlay();
    }

    deleteMember = (id) => {
        const updatedGroup = this.state.group.filter(member => member.id !== id);
        this.setState({group: updatedGroup});
    }

    resetNewMember = () => {
        this.setState({
            newMemberId: '',
            newMemberName: '',
            newMemberRank: 1
        });
    }

    render() {

        const renderMember = ({item}) => {
            return (
                <SwipeRow disableRightSwipe closeOnRowPress rightOpenValue={-200}>

                    <View style={styles.swipeView}>
                        <TouchableOpacity style={styles.editTouchable} onPress={() => this.updateMember(item.id)}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteTouchable} onPress={() => this.deleteMember(item.id)}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem bottomDivider containerStyle={{backgroundColor: '#A9BFB8'}}>
                            <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Avatar icon={{name: 'user-circle', type: 'font-awesome', size: 30, color: getMemberColor(item.rank)}} />
                                    <ListItem.Title style={{fontSize: 24, marginLeft: 10, alignSelf: 'center'}}>{item.name}</ListItem.Title>
                                    <ListItem.Subtitle style={{alignSelf: 'center', marginLeft: 10}}>{`Rank: ${item.rank}`}</ListItem.Subtitle>
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
                    onBackdropPress={this.toggleOverlay}
                    onTouchStart={Keyboard.dismiss}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{padding: 10, minHeight: 400, minWidth: 300}}>

                            <Text h2 style={{marginBottom: 20}}>New Group Member</Text>

                            <Text style={{display: (this.state.errorVisable ? 'flex' : 'none'), fontSize: 12, color: 'red'}}>Must enter name</Text>
                            <Input
                                label='Name'
                                placeholder='Enter Name'
                                leftIcon={<Icon name='user' type='font-awesome' color='#476D6E' style={{paddingRight: 10}} />}
                                value={this.state.newMemberName}
                                onChangeText={value => this.setState({newMemberName: value, errorVisable: false })}
                                onFocus={() => this.setState({pickerVisable: false})}
                            />
                            <Input
                                label='Rank'
                                placeholder='Rank'
                                leftIcon={<Icon name='chevron-up' type='font-awesome' color='#476D6E' style={{paddingRight: 10}} />}
                                value={this.state.newMemberRank.toString()}
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.setState({pickerVisable: true});
                                }}
                            />

                            <Picker
                                selectedValue={this.state.newMemberRank}
                                onValueChange={value => this.setState({newMemberRank: value})}
                                style={{display: (this.state.pickerVisable ? 'flex' : 'none')}}
                            >
                                <Picker.Item label='1 - Beginner' value={1} />
                                <Picker.Item label='2 - Novice' value={2} />
                                <Picker.Item label='3 - Intermediate' value={3} />
                                <Picker.Item label='4 - Advanced' value={4} />
                                <Picker.Item label='5 - Expert' value={5} />
                            </Picker>

                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

                                <Button
                                    title='Cancel'
                                    type='outline'
                                    titleStyle={{color: 'red'}}
                                    buttonStyle={{width: 100, marginTop: 50}}
                                    onPress={this.toggleOverlay}
                                />

                                <Button
                                    title={this.state.updating ? 'Save' : 'Add'}
                                    type='outline'
                                    titleStyle={{color: 'green'}}
                                    buttonStyle={{width: 100, marginTop: 50}}
                                    onPress={() => {
                                        if (this.state.updating) this.saveMember();
                                        else this.addNewMember();
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Overlay>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        }
                    }}
                >
                    <Input
                        label='Group Title'
                        placeholder='Enter Title'
                        containerStyle={{width: '60%'}}
                        leftIcon={<Icon name='users' type='font-awesome' color='#476D6E' style={{paddingRight: 10}} />}
                        value={this.state.groupTitle}
                        onChangeText={value => this.setState({groupTitle: value})}
                    />
                    <Button
                        onPress={() => {
                            this.setState({updating: false});
                            this.toggleOverlay();
                            this.resetNewMember();
                            Keyboard.dismiss();
                        }}
                        raised
                        title='Add'
                        titleStyle={{marginLeft: 10, color: 'black'}}
                        buttonStyle={{
                            backgroundColor: '#C99F37',
                            width: '100%',
                            height: '100%'
                        }}
                        containerStyle={{
                            width: '30%',
                            height: 60,
                        }}
                        icon={
                            <TouchableOpacity
                                style={{
                                    height: 35,
                                    width: 35,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#A9BFB8',
                                    borderRadius: 40,
                                }}
                            ><Icon name='user-plus' type='font-awesome' color='#476D6E' />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <Animatable.View animation='fadeInRightBig' duration={500} style={{flex: 3}}>
                    <FlatList
                        data={this.state.group}
                        renderItem={renderMember}
                        keyExtractor={item => item.id}
                    />
                </Animatable.View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                        shadowOffset: {
                            width: -2,
                            height: -2,
                        }
                    }}>
                    <Button
                        title='Cancel'
                        type='outline'
                        titleStyle={{color: 'red'}}
                        buttonStyle={{width: 150, height: '80%', backgroundColor: '#F4E7D2'}}
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Button
                        title='Save'
                        type='outline'
                        titleStyle={{color: 'green'}}
                        buttonStyle={{width: 150, height: '80%', backgroundColor: '#A9BFB8'}}
                        disabled={!this.state.group.length || !this.state.groupTitle.length}
                        onPress={() => this.props.navigation.navigate('Home', {
                            newMembers: this.state.group,
                            newTitle: this.state.groupTitle,
                            editId: this.state.groupEditId ? this.state.groupEditId : null
                        })}
                    />
                </View>

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
