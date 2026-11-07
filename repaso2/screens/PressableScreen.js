import { Text, Pressable, StyleSheet} from 'react-native';

export default function PressableScreen({
  onPress,
  titulo,
  disabled
}) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>
        {disabled ? 'Guardando...' : titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
