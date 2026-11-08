import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function SafeScreen() {
  const canciones =[ 
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  ];
  return (
    <SafeAreaView
    style={styles.container}>

    <Text style = {styles.titulo}>ESPORIFAI</Text>

    <View
    style= {styles.reproductor}>
      <Text style={styles.texto}>
        Lista de reproduccion
      </Text>
      <Text> Las mas chidas w</Text>
    </View>

    <Text style={styles.subtitulo}>Canciones disponibles</Text>

    <ScrollView style={styles.lista}
    contentContainerStyle={styles.contendidoLista}
    showsHorizontalScrollIndicator={true}
    
    >
      {canciones.map((item, index) => (

      <View key={index}
      style={styles.tarjeta}>
      <Text

      style={styles.textoLista}>{item}</Text>
      </View>
     ))}
     
    </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b04ff',
    padding: 20,
  },
  titulo:{
    fontSize:26,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20,
  },
  reproductor:{
    backgroundColor:'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  texto:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:10,
  },
  subtitulo:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:10,
    textAlign:'center',
  },
  lista:{
    flex:1,

  },
  tarjeta:{
    backgroundColor:'#1234',
    padding:20,
    marginBottom:10,
    borderRadius:15,
  },

  textoLista:{
    fontSize:18,
    textAlign:'center',

  },

});