//1. Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Perfil} from './components/Perfil.js';

//2. Zona Render o Main
export default function App() {
  return (
    <View style={styles.container}>

        <Perfil style={styles.tarjeta1} nombre="Lulu" carrera="ITIID" materia="Movil" cuatri="4"/>

        <Perfil style={styles.tarjeta2} nombre="Renata" carrera="ITIID" materia="Movil" cuatri="4"/>

        <Perfil style={styles.tarjeta3} nombre="Luisa" carrera="ITIID" materia="Movil" cuatri="4"/>


      <StatusBar style="auto" />
    </View>
  );
}

//3. Zona de estilos y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tarjeta1:{backgroundColor: 'lightblue'},
  tarjeta2:{backgroundColor: 'lightgreen'},
  tarjeta3:{backgroundColor: 'lightpink'},
});
