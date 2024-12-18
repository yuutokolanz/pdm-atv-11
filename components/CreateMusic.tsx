import { View, Alert, TextInput, StyleSheet, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import StyledButton from "./StyledButton";
import useCollection from "../firebase/hooks/useCollection";
import Music from "../types/Music";
import { useRouter } from "expo-router";

export default function CreateMusic() {
  const router = useRouter();

  const { create, refreshData } = useCollection<Music>("musics");

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Adicionar música</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título da música"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={artist}
        onChangeText={setArtist}
        placeholder="Artista da música"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Duração da música em segundos"
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="Principal gênero da música"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Adicionar música"
          onPress={async () => {
            try {
              await create({
                title: title,
                artist: artist,
                duration: parseInt(duration),
                genre: genre,
              });

              await refreshData();
            } catch (error: any) {
              Alert.alert("Create music error", error.toString());
            } finally {
              router.replace("/home");
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '95%',
    width: '90%',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: "#1C1C1C",
    borderRadius: 20
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#555",
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
});
