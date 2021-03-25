import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, FlatList, Text } from 'react-native';
import { ListItem, Avatar, Overlay, Button, Icon } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: [],
            member: {
                id: '',
                name: '',
                rank: ''
            },
            overlayVisible: false,
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

        const renderFavoriteItem = ({item}) => {
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

                <Overlay isVisible={this.state.overlayVisible} onBackdropPress={() => this.setState({overlayVisible: !this.state.overlayVisible})}>
                    <Text>Hello</Text>
                </Overlay>

                <View style={{justifyContent: 'center'}}>
                    <Button
                        onPress={() => this.setState({overlayVisible: !this.state.overlayVisible})}
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
                        data={this.state.exampleData}
                        renderItem={renderFavoriteItem}
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
