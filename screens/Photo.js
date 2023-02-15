import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { firebase, db, storage } from "../firebase";
import { auth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
// import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const Photo = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const askPermission = async (permission) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("Camera can be used now.");
      } else {
        // console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUpload = async () => {
    try {
      const gallery = await askPermission("READ_EXTERNAL_STORAGE");
      setHasGalleryPermission(gallery);
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!response.canceled) {
        setImage(response.assets[0].uri);
        const filename = response.assets[0].uri.split('/').pop();
        const ref = storage().ref().child(filename);
        const task = ref.putFile(response.assets[0].uri);
        task.on(
          'state_changed',
          (snapshot) => {
            // console.log(snapshot);
          },
          (error) => {
            // console.log(error);
          },
          async () => {
            const url = await ref.getDownloadURL();
            setImage(url);
            db.collection('images').add({
              url: url,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
        );

      }
    } catch (error) {
    }
  };

  const handleTakePicture = async () => {
    try {
      const camera = await askPermission("CAMERA");
      setHasCameraPermission(camera);
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!response.canceled) {
        setImage(response.assets[0].uri);
        const filename = response.assets[0].uri.split('/').pop();
        const ref = storage().ref().child(filename);
        const task = ref.putFile(response.assets[0].uri);
        task.on(
          'state_changed',
          (snapshot) => {
            // console.log(snapshot);
          },
          (error) => {
            // console.log(error);
          },
          async () => {
            const url = await ref.getDownloadURL();
            setImage(url);
            db.collection('images').add({
              url: url,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
        );

      }
    } catch (error) {
    }
  };

  useEffect(() => {
    (async () => {
      // const camera = await askPermission('CAMERA');
      // const gallery = await askPermission('READ_EXTERNAL_STORAGE');
      // setHasCameraPermission(camera);
      // setHasGalleryPermission(gallery);
    })();
  }, []);


  const logout = async () => {
    try {
      // const {} = await firebase()
      await firebase.auth().signOut(auth);
      navigation.navigate("Signup");
    } catch (error) {
      alert(error.message, "the error");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.userNameText}>Promise</Text>
      <Text>Photo</Text>
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>No Image Selected</Text>
      )}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleTakePicture}
          style={{ marginRight: 20 }}
        >
          <Text>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpload}>
          <Text>Upload Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    top: "3%",
    left: "3%",
    borderColor: "rgb(252, 220, 220)",
    borderWidth: 1,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  userNameText: {
    position: "absolute",
    top: "3%",
    right: "3%",
    borderColor: "rgb(252, 220, 220)",
    borderWidth: 1,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
});

export default Photo;
