import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {  createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import Home from './Home';
import Create from './Create';

//blue - 476D6E
//lightBlue - A9BFB8
//light - F4E7D2
//Brown - C99F37
//Orange - F0730B

const Stack = createStackNavigator();

export default class Main extends Component {
    render() {

        return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={Home}
						initialParams={{ navigation: this.props.navigation}}
						options={ ({ navigation }) =>  ({
							title: 'Random Teams',
							headerStyle: {
								backgroundColor: '#F0730B',
								height: 100,
							},
							headerTintColor: '#F4E7D2',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontStyle: 'italic',
								fontSize: 24
							},
							headerRight: () => (
								<TouchableOpacity
									style={{
										height: 45,
										width: 45,
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#C99F37',
										borderRadius: 50,
										margin: 10,
										shadowColor: 'black',
										shadowOpacity: 0.5,
										shadowOffset: {
											width: 2,
											height: 2,
										}
									}}
									onPress={() => navigation.navigate(Create)}
								>
									<Icon name='plus' type='font-awesome' color='#F4E7D2' size={10} />
									<Icon name='users' type='font-awesome' color='#F4E7D2' size={20} />
								</TouchableOpacity>
							)
						})}
					/>
					<Stack.Screen
						name="Create"
						component={Create}
						options={ ({ navigation }) =>  ({
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
						})}
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
