import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
const url = 'https://nord-calculate.onrender.com/calculate'
// const url = 'localhost:5000/calculate'

const Calculator = ({logout}) => {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [result, setResult] = useState(null)
  const data = [
    { label: "multiply", value: "x" },
    { label: "add", value: "+" },
    { label: "subtract", value: "-" },
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Choose Operation
        </Text>
      );
    }
    return null;
  };

  // useEffect(()=>{
  //   // fetchData()
  // },[])

  const fetchData = () => {
    setLoading(true)
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ firstNumber, secondNumber, operation: value }),
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
    })
      .then((response) => {
        return response.json()
      })
      .then(data=>{
        setLoading(false)
        setFirstNumber(null)
        setSecondNumber(null)
        setValue(null)
        setResult(data)
      }
      )
      .catch((err) => {
        setLoading(false)
        alert(err);
      });
    fetch;
  };

  const calculateResult = () => {
    if (!firstNumber || !secondNumber || !value)
      return alert("Please complete field");
    fetchData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.userNameText}>Promise</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter first number"
          keyboardType="numeric"
          value={firstNumber}
          onChangeText={(e) => setFirstNumber(e)}
        />
        {renderLabel()}
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && { borderColor: "blue", borderWidth: 1, marginTop: 100 },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select operation" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          placeholder="Enter second number"
          value={secondNumber}
          onChangeText={(e) => setSecondNumber(e)}
        />
      </View>
      {loading && <Text>Loading...</Text>}
      <TouchableOpacity style={styles.button} onPress={calculateResult}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
     {result && <Text style={styles.resultText}>The Result is {!loading && result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
    paddingTop: 50
    // backgroundColor: 'black'
  },
  inputText: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  resultText:{
    marginTop: 40,
    fontSize: 30,
    textAlign: 'center'
  },logoutButton: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    borderColor: 'rgb(252, 220, 220)',
    borderWidth:1,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  userNameText: {
    position: 'absolute',
    top: '3%',
    right: '3%',
    borderColor: 'rgb(252, 220, 220)',
    borderWidth:1,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  }
});

export default Calculator;
