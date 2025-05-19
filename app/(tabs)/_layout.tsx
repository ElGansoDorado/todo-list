import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ADC6EF",
        tabBarActiveBackgroundColor: "#1E1E1E",
        tabBarInactiveBackgroundColor: "#1E1E1E",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <FontAwesome name='list' size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Add task',
          tabBarIcon: ({ color }) => <FontAwesome name='plus-circle' size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
