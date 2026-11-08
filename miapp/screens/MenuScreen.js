import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeScreen from './SafeScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackScreen';
import ModalScreen from './ModalScreen';
import ActivityScreen from './ActivityScreen'; 

/* 2.- Zona render o Main*/
export default function MenuScreen() {
    const [screen,setScreen] = useState('Menu');

    switch(screen){
        case 'tarjetas': 
            return <TarjetasScreen/>;
        case 'safe': 
            return <SafeScreen/>;
        case 'pressable':
            return <PressableScreen/>;
        case 'textinput':
            return <TextInputScreen/>;
        case 'flatlist':
            return <FlatListScreen/>;
        case 'imagebackground':
            return <ImageBackgroundScreen/>;
        case 'modal':
            return <ModalScreen/>;
        case 'activityindicator':
            return <ActivityScreen/>;                        
        case 'Menu':
            default:
            return (
    <View style={styles.container}>
        <Text> MENÚ DE PRACTICAS </Text>
        <Button title="Pract:Tarjetas" onPress = {()=> setScreen('tarjetas')}></Button>
        <Button title="Pract:SafeAreaView" onPress = {()=> setScreen('safe')}></Button>
        <Button title="Pract:Pressable" onPress = {()=> setScreen('pressable')}></Button>
        <Button title="Pract:TextInput" onPress = {()=> setScreen('textinput')}></Button>
        <Button title="Pract:FlatList" onPress = {()=> setScreen('flatlist')}></Button>
        <Button title="Pract:Image" onPress = {()=> setScreen('imagebackground')}></Button>
        <Button title="Pract:Modal" onPress = {()=> setScreen('modal')}></Button>
        <Button title="Pract:ActivityIndicator" onPress = {()=> setScreen('activityindicator')}></Button>

    </View>
  
  );
} //switch
} //funcion 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

});