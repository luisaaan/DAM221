import {useState, useEffect} from 'react';
import {View, Text, TextInput, ImageBackground, ActivityIndicator, Alert, StyleSheet} from 'react-native';

import SplashScreen from './screens/SplashScreen';
import PressableScreen from './screens/PressableScreen';
import FlatListScreen from './screens/FlatListScreen';

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 2000);

    return () => clearTimeout(temporizador);
  }, []);

  const agregarLibro = () => {
    if (
      titulo.trim() === '' ||
      autor.trim() === '' ||
      genero.trim() === ''
    ) {
      Alert.alert(
        'Error',
        'Completa todos los campos'
      );
      return;
    }

    setGuardando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        genero: genero
      };

      setLibros(librosActuales => [
        ...librosActuales,
        nuevoLibro
      ]);

      setTitulo('');
      setAutor('');
      setGenero('');

      setGuardando(false);

      Alert.alert(
        'Registro exitoso',
        'El libro se agregó correctamente'
      );
    }, 4000);
  };

  if (cargando) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={require('./img/fondo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Registro de Libros</Text>
        <TextInput style={styles.input} placeholder="Título del libro" value={titulo} onChangeText={setTitulo}/>
        <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor}/>
        <TextInput style={styles.input} placeholder="Género" value={genero} onChangeText={setGenero}/>
        <PressableScreen titulo="Agregar libro" onPress={agregarLibro} disabled={guardando}/>
        {guardando && (
          <View style={styles.cargando}>
            <ActivityIndicator size="large" color="#2563EB"/>

            <Text style={styles.textoCargando}>Guardando libro...</Text>
          </View>
        )}
        <Text style={styles.subtitulo}>Libros guardados</Text>
        <FlatListScreen libros={libros}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 20,
    borderRadius: 15,
    margin: 20,
    marginTop: 40,
  },

  title: {
    color: '#4A148C',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B39DDB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },

  cargando: {
    alignItems: 'center',
    marginVertical: 10,
  },

  textoCargando: {
    color: '#2563EB',
    fontSize: 16,
    marginTop: 10,
  },

  subtitulo: {
    color: '#4A148C',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
