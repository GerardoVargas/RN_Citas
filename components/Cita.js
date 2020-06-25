import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {

    const dialogoEliminar = id => {
        console.log('Eliminando...', id)
        eliminarPaciente(id)
    }


  return (
    <View style={style.cita}>
      <View>
        <Text style={style.label}>Paciente:</Text>
        <Text>{item.paciente}</Text>
      </View>
      <View>
        <Text style={style.label}>Propietario:</Text>
        <Text>{item.propietario}</Text>
      </View>
      <View>
        <Text style={style.label}>Síntomas:</Text>
        <Text>{item.sintomas}</Text>
      </View>

      <View>
        <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={style.btnEliminar}>
          <Text style={style.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cita: {
    backgroundColor: '#fff',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },

  texto: {
    fontSize: 18,
  },

  btnEliminar: {
      padding: 10,
      backgroundColor: 'red',
      paddingVertical: 10,
      marginTop: 20
  },

  textoEliminar: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center'
  }
});

export default Cita;
