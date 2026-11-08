import { StyleSheet, View } from 'react-native';
import MenuScreen from './screens/MenuScreen'; 
export default function App() {
  return (
    <View style={styles.container}>
      <MenuScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});