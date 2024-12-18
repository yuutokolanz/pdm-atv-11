import { View, Alert, TextInput, StyleSheet, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import StyledButton from "./StyledButton";
import useDocument from "../firebase/hooks/useDocument";
import Music from "../types/Music";

import { useGlobalSearchParams, useRouter } from "expo-router";
import Loading from "./Loading";

export default function EditMusic() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  const {
    data: music,
    loading,
    upsert,
  } = useDocument<Music>("musics", id as string);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (music) {
      setTitle(music.title);
      setArtist(music.artist);
      setDuration(music.duration.toString());
      setGenre(music.genre);
    }
  }, [music]);

  if (loading || !music) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Music</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={artist}
        onChangeText={setArtist}
        placeholder="Artist"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Duration"
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="Genre"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Atualizar música"
          onPress={async () => {
            try {
              await upsert({
                ...music,
                title: title,
                artist: artist,
                duration: parseInt(duration),
                genre: genre,
              });
            } catch (error: any) {
              Alert.alert("Update music error", error.toString());
            } finally {
              router.dismiss();
            }
          }}
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
