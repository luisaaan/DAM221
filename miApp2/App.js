//1. Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo.js';
import {Saludo2} from './components/Saludo2.js';
import {Perfil} from './components/Perfil.js';

//2. Zona Render o Main
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola mundo React Native!</Text>
      <Image source={require('./assets/wave.png')}></Image>
      
      <Text>-----------------------------------</Text>

      <Saludo/>
      
      <Text>-----------------------------------</Text>

      <Saludo2/>

      <Text>-----------------------------------</Text>

      <Perfil/>
      
      <StatusBar style="auto" />


    </View>
  );
}

//3. Zona de estilos y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
