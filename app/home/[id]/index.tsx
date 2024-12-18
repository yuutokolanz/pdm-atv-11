import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Alert, Text, View, StyleSheet } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import Music from "../../../types/Music";

export default function MusicDetails() {
  const { id } = useGlobalSearchParams();
  const router = useRouter();

  const {
    data: music,
    loading,
  } = useDocument<Music>("musics", id as string);

  if (loading || !music) return <Loading />;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Detalhes da Música",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={styles.header}>Detalhes da Música</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>

        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{music.title}</Text>

        <Text style={styles.label}>Artista:</Text>
        <Text style={styles.value}>{music.artist}</Text>

        <Text style={styles.label}>Duração:</Text>
        <Text style={styles.value}>{music.duration} segundos</Text>

        <Text style={styles.label}>Gênero:</Text>
        <Text style={styles.value}>{music.genre}</Text>
      </View>

      <StyledButton
        title="Atualizar Música"
        onPress={() => {
          router.push(`/home/edit/${music.id}/`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B91D82",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
});
