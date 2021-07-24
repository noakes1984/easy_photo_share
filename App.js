import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import DropboxComp from "./src/DropboxComp";
import { authorize } from "react-native-app-auth";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, ResponseType, useAuthRequest } from "expo-auth-session";
import { Button, Platform } from "react-native";

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
      // clientId: "foz4e43qesa077j",
      clientId: 'djshvdyxu5i6r8v',
      // There are no scopes so just pass an empty array
      scopes: [],
      // Dropbox doesn't support PKCE
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        scheme: 'easy-photo-share',
        useProxy
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log('access_token', access_token)
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
