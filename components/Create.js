import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, FlatList, Text } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: [
                { name: '', rank: 1 }
            ],
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

        const customIcon = <Icon name='plus' type='font-awesome' />

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
                        <ListItem bottomDivider onPress={() => console.log('List Item Pressed')}>
                            <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
                                <ListItem.Title style={{fontSize: 24}}>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.rank}</ListItem.Subtitle>
                                <ListItem.Chevron color='black' />
                            </ListItem.Content>
                        </ListItem>
                    </View>

                </SwipeRow>
            );
        }

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
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
