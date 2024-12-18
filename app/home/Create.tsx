import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CreateMusic from '../../components/CreateMusic'
import globalStyles from '../../styles/globalStyles'
import { Stack } from 'expo-router'
import HeaderRight from '../../components/HeaderRight'

export default function Create() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Adicionar músicas",
          headerRight: () => <HeaderRight />,
        }}
      />
      <CreateMusic></CreateMusic>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 16,
  }
});