import {Text, View, Button, StyleSheet} from 'react-native';
import {useState} from 'react';

export const Perfil = ({nombre, carrera, materia, cuatri, style}) => {

    const [mostrar, setMostrar] = useState(false);

    return (
        <View style={[estilos.tarjetas, style]}>
            
            <Text style={estilos.nombre}> {nombre} </Text>

            {mostrar &&
            <>
            <Text style={estilos.carrera}> {carrera} </Text>
            <Text style={estilos.otroTexto}> {materia} </Text>
            <Text style={estilos.otroTexto}> {cuatri} </Text>
            </>
            }
            <Button title="Ver perfil" onPress={ ()=>setMostrar(!mostrar) } />

        </View>
    );
};

const estilos= StyleSheet.create({

    nombre:{
        fontSize: 24,
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    carrera:{
        fontSize: 20,
        color: 'blue',
        fontFamily: 'Roboto',
    },
    otroTexto:{
        fontSize: 18,
        color: 'red',
        fontFamily: 'Courier',
        fontStyle: 'italic',
    },
    tarjetas:{
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 10,
    },

});