import { useRouter } from "expo-router";
import { Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Music from "../types/Music";
import StyledButton from "./StyledButton";

interface ViewMusicProps {
  music: Music;
  onDelete: Function;
}

export default function ViewMusic({ music, onDelete }: ViewMusicProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{music.title}</Text>
        <Text style={styles.artist}>{music.artist}</Text>
        <Text style={styles.details}>
          {music.duration} | {music.genre}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            if (music.id) {
              router.push(`/home/${music.id}/`);
            } else {
              Alert.alert(
                "View error",
                "Cannot access music details because it does not have an ID!"
              );
            }
          }}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            if (music.id) {
              Alert.alert("Delete Music", "Are you sure?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "Delete error",
                "Cannot delete music because it does not have an ID!"
              );
            }
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  artist: {
    fontSize: 16,
    color: "#b3b3b3",
    marginVertical: 4,
  },
  details: {
    fontSize: 14,
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsButton: {
    backgroundColor: "#B91D82",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#D12C2C",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
