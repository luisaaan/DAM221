
import {View, Text, FlatList, StyleSheet} from 'react-native';

export default function FlatListScreen({ libros }) {
  const renderLibro = ({ item }) => {
    return (
      <View style={styles.libro}>
        <Text style={styles.tituloLibro}>
          {item.titulo}
        </Text>

        <Text style={styles.textoLibro}>
          Autor: {item.autor}
        </Text>

        <Text style={styles.textoLibro}>
          Género: {item.genero}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={libros}
      keyExtractor={item => item.id}
      renderItem={renderLibro}
      ListEmptyComponent={
        <Text style={styles.listaVacia}>
          No hay libros registrados
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  libro: {
    backgroundColor: '#EDE7F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6A1B9A',
  },

  tituloLibro: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#311B92',
    marginBottom: 5,
  },

  textoLibro: {
    fontSize: 15,
    color: '#333333',
  },

  listaVacia: {
    color: '#555555',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
