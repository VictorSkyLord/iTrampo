import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator  from './TabNavigator';
import StoryScreen from '../screens/trampoScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tela inicial" screenOptions={() => ({
            headerShown : false
          })}
     
        >   
          <Stack.Screen name="Tela inicial" component={TabNavigator} />
          <Stack.Screen name="Tela de Trampo" component={StoryScreen} />
        </Stack.Navigator>
    );
  }
  
  export default StackNavigator