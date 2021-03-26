import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Avatar, Overlay, Button, Icon, Text, Input } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Keyboard } from 'react-native';
import { generateId } from '../shared/generateId';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: [],
            newMemberId: '',
            newMemberName: '',
            newMemberRank: 1,
            overlayVisible: false,
            pickerVisable: false,
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

    toggleOverlay = () => {
        this.setState({overlayVisible: !this.state.overlayVisible});
    }

    addNewMember = (name, rank) => {
        const newId = generateId(10);
        const newMember = {
            id: newId,
            name,
            rank
        }
        const updatedGroup = this.state.group.concat(newMember);
        this.setState({group: updatedGroup});
    }

    updateMember = (id) => {

    }

    deleteMember = (id) => {

    }

    resetNewMember = () => {
        this.setState({
            newMemberId: '',
            newMemberName: '',
            newMemberRank: 1
        });
    }

    render() {

        const memberColor = (rank) => {
            switch(rank) {
                case 1:
                    return 'white';
                case 2:
                    return 'yellow';
                case 3:
                    return 'green';
                case 4:
                    return 'blue';
                case 5:
                    return 'red';
                default:
                    return 'white';
            }
        }

        const renderMember = ({item}) => {
            return (
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>

                    <View style={styles.deleteView}>
                        <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() => console.log('Hidden Swipe Button Pressed!') }
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem bottomDivider onPress={() => console.log('List Item Pressed')} containerStyle={{backgroundColor: '#F4E7D2'}}>
                            <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Avatar icon={{name: 'user-circle', type: 'font-awesome', color: memberColor(item.rank)}} />
                                    <ListItem.Title style={{fontSize: 24}}>{item.name}</ListItem.Title>
                                    <ListItem.Subtitle style={{alignSelf: 'center', marginLeft: 20}}>{`Rank: ${item.rank}`}</ListItem.Subtitle>
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
                >
                    <View style={{padding: 10, minHeight: 300}}>

                        <Text h2>New Group Member</Text>

                        <Input
                            placeholder='Name'
                            leftIcon={<Icon name='user' type='font-awesome' color='#476D6E' style={{paddingRight: 10}} />}
                            value={this.state.newMemberName}
                            onChangeText={value => this.setState({newMemberName: value })}
                        />
                        <Input
                            placeholder='Rank'
                            leftIcon={<Icon name='chevron-up' type='font-awesome' color='#476D6E' style={{paddingRight: 10}} />}
                            value={this.state.newMemberRank.toString()}
                            onFocus={() => {
                                Keyboard.dismiss();
                                this.setState({pickerVisable: !this.state.pickerVisable});
                            }}
                        />

                        <Picker
                            selectedValue={this.state.newMemberRank}
                            onValueChange={value => this.setState({newMemberRank: value, pickerVisable: !this.state.pickerVisable})}
                            style={{display: (this.state.pickerVisable ? 'flex' : 'none')}}
                        >
                            <Picker.Item label='1' value={1} />
                            <Picker.Item label='2' value={2} />
                            <Picker.Item label='3' value={3} />
                            <Picker.Item label='4' value={4} />
                            <Picker.Item label='5' value={5} />
                        </Picker>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

                            <Button
                                title='Cancel'
                                type='outline'
                                titleStyle={{color: 'red'}}
                                buttonStyle={{width: 100, marginTop: 40}}
                                onPress={this.toggleOverlay}
                            />

                            <Button
                                title='Save'
                                type='outline'
                                titleStyle={{color: 'green'}}
                                buttonStyle={{width: 100, marginTop: 40}}
                                onPress={() => {
                                    this.addNewMember(this.state.newMemberName, this.state.newMemberRank);
                                    this.toggleOverlay();
                                }}
                            />
                        </View>
                    </View>
                </Overlay>

                <View style={{justifyContent: 'center'}}>
                    <Button
                        onPress={() => {
                            this.toggleOverlay();
                            this.resetNewMember();
                        }}
                        title='Add Group Member'
                        titleStyle={{color: 'black'}}
                        buttonStyle={{margin: 10, backgroundColor: '#C99F37'}}
                        icon={
                            <TouchableOpacity
                                style={{
                                    height: 45,
                                    width: 45,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#A9BFB8',
                                    borderRadius: 50,
                                    margin: 10,
                                    shadowColor: 'black',
                                    shadowOpacity: 0.5,
                                    shadowOffset: {
                                        width: 2,
                                        height: 2,
                                    }
                                }}
                            ><Icon name='user-plus' type='font-awesome' color='#476D6E' />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <Animatable.View animation='fadeInRightBig' duration={500}>
                    <FlatList
                        data={this.state.group}
                        renderItem={renderMember}
                        keyExtractor={item => item.name}
                    />
                </Animatable.View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
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
