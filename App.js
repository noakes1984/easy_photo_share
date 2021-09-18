import {} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as WebBrowser from "expo-web-browser";

import {
  Button,
  Constants,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import {
  checkForFolder,
  createSharedLink,
  getFile,
  uploadFile,
} from "./api/req";

import { StatusBar } from "expo-status-bar";
import { authorize } from "react-native-app-auth";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
  tokenEndpoint: "https://www.dropbox.com/oauth2/token",
};

const useProxy = Platform.select({ web: false, default: true });
const Item = ({ item, onPress, backgroundColor, textColor, image }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
  </TouchableOpacity>
);

export default function App() {
  const [token, setToken] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [picArray, setPicArray] = useState([]);
  const [image, setImage] = useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "foz4e43qesa077j",
      //clientId: 'djshvdyxu5i6r8v',
      // There are no scopes so just pass an empty array
      scopes: [],
      // Dropbox doesn't support PKCE
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        scheme: "easy-photo-share",
        useProxy,
      }),
    },
    discovery
  );
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // const callFinal = fetch("https://api.dropboxapi.com/2/files/create_folder_v2", {
  //   body: "{"path\\": \\"/Homework/math\\",\\"autorename\\": false}",
  //   headers: {
  //     Authorization: "Bearer sl.A1sylitYsCFFyjsm7a0rEC9F275y3Q6ZH24iFGO9LVHL0gXJAyF9x6rscf503HPestjES-1IelLmnRQbKffNj2n4olounYxeGDh3I5cseTSMoW43UDcT5NyHVZpKgA2RSQKUNTBsJyg",
  //     "Content-Type": "application/json"
  //   },
  //   method: "POST"
  // })

  function parseEntries(data) {
    data.map((pic, index) => {
      setPicArray(pic);
    });
  }

  function fetchProjects(token) {
    return checkForFolder(token)
      .then((res) => {
        parseEntries(res.entries);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    
    (async () => {
      if (response?.type === "success") {
        const { access_token } = response.params;
        console.log("access_token", access_token);
        fetchProjects(access_token);
      }
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [response]);


  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "dfas-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "asdf-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "dasf-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        image={image}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={3}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <TouchableOpacity onPress={pickImage}>
        <Text>Directly Launch Image Library</Text>
      </TouchableOpacity>
      <Button
        title="Login"
        onPress={() => {
          promptAsync({ useProxy });
        }}
      />
      <Button
        title="DL"
        onPress={() => {
          promptAsync({ useProxy });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  item: {
    backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: 100,
  },
});
