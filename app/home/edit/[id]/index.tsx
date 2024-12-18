import { StyleSheet, View } from 'react-native'
import React from 'react'
import globalStyles from '../../../../styles/globalStyles'
import { Stack } from 'expo-router'
import HeaderRight from '../../../../components/HeaderRight'
import EditMusic from '../../../../components/EditMusic'

export default function Create() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Editar música",
          headerRight: () => <HeaderRight />,
        }}
      />
      <EditMusic></EditMusic>
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