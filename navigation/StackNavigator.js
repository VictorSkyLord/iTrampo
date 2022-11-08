import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator  from './TabNavigator';
import StoryScreen from '../screens/storyScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tela inicial" screenOptions={() => ({
            headerShown : false
          })}
     
        >   
          <Stack.Screen name="Tela inicial" component={TabNavigator} />
          <Stack.Screen name="Tela de História" component={StoryScreen} />
        </Stack.Navigator>
    );
  }
  
  export default StackNavigator