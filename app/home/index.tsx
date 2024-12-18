import { Stack, useRouter } from "expo-router";
import { FlatList, Text, View, StyleSheet } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewMusic from "../../components/ViewMusic";
import useCollection from "../../firebase/hooks/useCollection";
import Music from "../../types/Music";

export default function Home() {
  const router = useRouter();

  const { data, remove, refreshData, loading } = useCollection<Music>("musics");

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Suas músicas",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={styles.header}>Suas músicas favoritas estão aqui</Text>

      <StyledButton
        title="Adicionar música"
        onPress={() => {
          router.push("/home/Create");
        }}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <ViewMusic
                music={item}
                onDelete={async () => {
                  await remove(item.id!);
                  await refreshData();
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item.id!}
          style={styles.flatList}
        />
      )}
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
    marginBottom: 16,
    textAlign: "center",
  },
  flatList: {
    flexGrow: 1,
    marginTop: 4
  },
  cardContainer: {
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
});
