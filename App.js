import * as WebBrowser from "expo-web-browser";

import { Button, Platform } from "react-native";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import {StyleSheet, View} from "react-native";

import DropboxComp from "./src/DropboxComp";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { authorize } from "react-native-app-auth";
import { checkForFile } from "./api/req";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
  tokenEndpoint: "https://www.dropbox.com/oauth2/token",
};

const useProxy = Platform.select({ web: false, default: true });

export default function App() {

  
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

  // const callFinal = fetch("https://api.dropboxapi.com/2/files/create_folder_v2", {
  //   body: "{"path\\": \\"/Homework/math\\",\\"autorename\\": false}",
  //   headers: {
  //     Authorization: "Bearer sl.A1sylitYsCFFyjsm7a0rEC9F275y3Q6ZH24iFGO9LVHL0gXJAyF9x6rscf503HPestjES-1IelLmnRQbKffNj2n4olounYxeGDh3I5cseTSMoW43UDcT5NyHVZpKgA2RSQKUNTBsJyg",
  //     "Content-Type": "application/json"
  //   },
  //   method: "POST"
  // })

  

  function fetchProjects() {
    console.log('is this running')
    return checkForFile()
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("access_token", access_token);
      fetchProjects()
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => {
          promptAsync({ useProxy });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
