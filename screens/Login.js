import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { firebase, auth } from "../firebase";
// const { sendPasswordResetEmail } = firebase.auth();
import {sendPasswordResetEmail} from 'firebase/auth'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

  const resetPasswordAxn = () => {
    if (!email) return alert("Provide Email");
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Email reset sent"))
      .catch((err) => {
        console.log(err, 'from email error')
        alert(err);
      });
  };

  const handleSubmit = async (email, password) => {
    try {
      if (!email || !password) return alert("Please enter Email and Password");
      if (!validateEmail(email)) return alert("Provide a valid Email");
      if (!validatePassword(password))
        return alert(
          "Password must be atleast 8 chars long, contain 1 number, 1 uppercase and 1 lowercase"
        );
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail('')
      setPassword('')
      navigation.navigate("Task");
    } catch (error) {
      console.log(error.message, "the auth error login");
      // if(error.message)
      if (error.message.split(":")[1].trim().includes("There is no user")) {
        alert("User not registered");
        return navigation.navigate("Login");
      }
      if (
        error.message.split(":")[1].trim().includes("The password is invalid")
      ) {
        return alert("Wrong Credentials");
      }
      // return alert('User not found. Please Register')
      alert(error.message);
    }
    // navigation.navigate("Task");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <View style={styles.formFields}>
        <View style={styles.formField}>
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            keyboardType="email"
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <View style={styles.formField}>
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            // autoComplete={false}
            onChangeText={(e) => setPassword(e)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text
            style={styles.submitButtonText}
            onPress={() => handleSubmit(email, password)}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>No Account? Register.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetPasswordAxn}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>
            {" "}
            Forgot Password? Reset here.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    flex: 1,
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    paddingBottom: 120,
  },
  titleText: {
    textAlign: "center",
    color: "purple",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 50,
  },
  formFields: {
    // backgroundColor: "red",
    height: "75%",
    display: "flex",
    alignItems: "center",
  },
  formField: {
    marginTop: 30,
    // backgroundColor: "blue",
    height: 45,
    width: "90%",
  },
  inputField: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    marginTop: 30,
    width: "90%",
    padding: 10,
    display: "flex",
    alignItems: "center",
    borderRadius: 15,
  },
  submitButtonText: {
    color: "white",
    fontSize: 26,
  },
  forgotPassword: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "red",
  },
});

export default Login;
