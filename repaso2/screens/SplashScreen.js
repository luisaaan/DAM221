
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require('../img/fondo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <Text style={styles.splashTitle}>Bienvenido</Text>

        <Text style={styles.splashDescription}>Registro de Libros</Text>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20,
  },

  splashTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  splashDescription: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});
