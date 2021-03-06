import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {  createStackNavigator } from '@react-navigation/stack';
import { Icon, Button } from 'react-native-elements';
import Home from './Home';
import Create from './Create';
import Display from './Display'

//blue - 476D6E
//lightBlue - A9BFB8
//light - F4E7D2
//Brown - C99F37
//Orange - F0730B

const Stack = createStackNavigator();

export default class Main extends Component {

	constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    addNewGroup = (newGroup) => {
        const updatedGroups = this.state.savedGroups.concat(newGroup);
        this.setState({groups: updatedGroups});
    }

    render() {

        return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={Home}
						options={ ({ navigation }) =>  ({
							title: 'Random Teams',
							headerStyle: {
								backgroundColor: '#F0730B',
								height: 150,
							},
							headerTintColor: '#F4E7D2',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontStyle: 'italic',
								fontSize: 24
							},
							headerRight: () => (
								<Button
									raised
									iconRight
									title='New +'
									icon={<Icon name='users' type='font-awesome' color='white' size={20} />}
									onPress={() => navigation.navigate(Create, {editing: false})}
									titleStyle={{fontSize: 14}}
									buttonStyle={{
										backgroundColor: '#C99F37',
									}}
									containerStyle={{
										alignItems: 'center',
										justifyContent: 'center',
										margin: 10,
									}}
								/>
							)
						})}
					/>
					<Stack.Screen
						name="Create"
						component={Create}
						options={{
							title: 'Create Group',
							headerStyle: {
								backgroundColor: '#476D6E',
								height: 100,
							},
							headerTintColor: '#F4E7D2',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontStyle: 'italic',
								fontSize: 24
							},
						}}
					/>
					<Stack.Screen
						name="Display"
						component={Display}
						options={{
							title: 'Display Teams',
							headerStyle: {
								backgroundColor: '#A9BFB8',
								height: 100,
							},
							headerTintColor: '#F4E7D2',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontStyle: 'italic',
								fontSize: 24
							},
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
    },
	drawerHeader: {
		margin: 10
	}
});
