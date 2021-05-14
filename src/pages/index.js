import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import styled from "styled-components/native";
import { useMediaQuery } from "react-responsive";
import { api } from '../services/api'

export const StyledButton = styled(View)`
  width: ${(props) => (props.mobile ? "100%" : "35%")};
  background-color: red;
  padding: 2rem;
  border-radius: 0.5rem;
`;

export default function App() {
  const [sound, setSound] = useState();

  useEffect(() => {
    api.get("/chart").then(response => console.log(response.data))
  }, [])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://cdns-preview-3.dzcdn.net/stream/c-3f59dd02dca14c8d2f90c96456e7d96f-3.mp3",
    });
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    setSound(false);
  }

  const mobileDevice = useMediaQuery({ query: "(max-device-width: 600px)" });

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={sound ? stopSound : playSound}>
        <StyledButton mobile={mobileDevice}>
          <Text style={styles.buttonText}>{sound ? "Stop" : "Play"}</Text>
        </StyledButton>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  buttonTeste: {
    width: 400,
    padding: 10,
    alignItems: "center",
    backgroundColor: "red",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: 600,
  },
});
