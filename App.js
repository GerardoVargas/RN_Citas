import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';

import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(false);

  //definir el state de citas
  const [citas, setCitas] = useState([]);

  //Elimina los pacientes del state
  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  //Muestra o oculta el formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm);
    return;
  };

  //cerrar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={ () => cerrarTeclado()}>
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Administrador de Citas</Text>

          <View>
            <TouchableHighlight
              onPress={() => mostrarFormulario()}
              style={styles.btmMostrarForm}
              underlayColor="#5E023B">
              <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo}>Crear nueva Cita</Text>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  setMostrarForm={setMostrarForm}
                />
              </>
            ) : (
              <>
                <Text style={styles.titulo}>
                  {citas.length > 0
                    ? 'Administra tus citas'
                    : 'No hay Citas, agrega una'}
                </Text>

                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({item}) => (
                    <Cita item={item} eliminarPaciente={eliminarPaciente} />
                  )}
                  keyExtractor={cita => cita.id}
                />
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },

  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },

  titulo: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },

  listado: {
    flex: 1,
  },

  btmMostrarForm: {
    padding: 10,
    backgroundColor: '#F723A6',
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  textoMostrarForm: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
