import { Text, SafeAreaView, StyleSheet, TextInput, View, Button, TouchableOpacity } from 'react-native';

import React, { useState, useEffect } from 'react';


export default function App() {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [newName, setNewName] = useState(null);

  const sendForm = function (){
    setName(newName)
    findAge(newName)
  }

  const findAge = async function(newName){
    try {
      const response = await fetch(`https://api.agify.io/?name=${newName}`);
      const data = await response.json();
      if (data && data.name === newName) {
        setAge("tu edad es " + data.age);
      }
      else{
        setAge("tu edad no esta en nuestro registro, prueba con lolocar que si estan en la DB")
        throw new Error('Name not found');
      }
    } catch (error) {
      console.error("Error fetching age:", error);
    }
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.paragraph}> Welcome to Lolocar </Text>
      <Text style={styles.paragraph}> What's your name? </Text>
      <TextInput style={styles.input} onChangeText = {newName => setNewName(newName)} defaultValue = {"Escribe tu nombre"} > 
      </TextInput>
        <TouchableOpacity style={styles.button} onPress={() => sendForm()}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      {name && age &&
        <View style={styles.hiContainer}>
          <Text style={styles.paragraphWhite}>Hola {name} </Text>
          <Text style={styles.paragraphWhite}>{age} </Text>
        </View>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraphWhite: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'white',
  },
  button: {
    backgroundColor: '#d42955',
    color: 'white',
    width: '50%',
    borderRadius: 100,
    height: 50,
    marginTop: 20
  },
  buttonText: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  hiContainer: {
    width: '90%',
    marginTop: 20,
    height: '10vh',
    backgroundColor: '#d42955',
    color: 'white',
    justifyContent: 'left',
    alignItems: 'left',
    padding: 20,
    borderRadius: 10,
  },
    input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
