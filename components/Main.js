import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Create from './Create';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function NavigationTabs() {
  return (
    <Tab.Navigator
		initialRouteName="Make Teams"
		screenOptions={{
			activeTintColor: 'orange',
		}}
    >
		<Tab.Screen
			name="Make Teams"
			component={Home}
			options={{
				tabBarLabel: 'Make Teams',
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="home" color={'orange'} size={size} />
				),
				headerStyle: {
					backgroundColor: 'orange',
					height: 100
				}
			}}
		/>
		<Tab.Screen
			name="Create"
			component={Create}
			options={{
				tabBarLabel: 'Create',
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="home" color={'orange'} size={size} />
				),			}}
		/>

    </Tab.Navigator>
  );
}

export default class Main extends Component {
    render() {
        return (
            <NavigationContainer>
                <NavigationTabs />
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
    }
});
