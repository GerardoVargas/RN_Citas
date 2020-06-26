import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid'

const Formulario = ({citas, setCitas, setMostrarForm, guardarCitasStorage}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const DateConfirm = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    setFecha(date.toLocaleDateString('es-ES', opciones));

    hideDatePicker();
  };

  const TimeConfirm = time => {
    const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
    setHora(time.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };

  //Crear nueva Cita
  const crearNuevaCita = () => {
      console.log('desde crear nueva cita')

      //validando formulario
      if(paciente.trim() === '' || 
          propietario.trim() === '' || 
          telefono.trim() === '' || 
          fecha.trim() === '' || 
          hora.trim() === '' || 
          sintomas.trim() === '') 
          {
            mostrarAlerta()
            return
          }

      //Crear nueva cita
      const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
      cita.id = shortid.generate()
      //console.log(cita)

      //agregar al state
      const citasNuevo = [...citas, cita]
      setCitas(citasNuevo)

      //Pasar las nuevas citas al storage
      guardarCitasStorage(JSON.stringify(citasNuevo))

      //ocular formulario
      setMostrarForm(false)

      //resetear form
        setSintomas('')
        setPropietario('')
        setPaciente('')
        setHora('')
        setFecha('')
        setTelefono('')

  }

  //Alerta si los campos estan vacios
  const mostrarAlerta = () => {
    Alert.alert(
    'Error!',
      'Todos los campos son obligatorios',
      [  
          {text: "Ok"}
      ]
    );
  }

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPaciente(texto)}
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPropietario(texto)}
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setTelefono(texto)}
            autoCorrect={false}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={DateConfirm}
            onCancel={hideDatePicker}
            headerTextIOS="Escoge una Fecha"
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Escoge Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={TimeConfirm}
            onCancel={hideTimePicker}
            headerTextIOS="Seleecione una Hora "
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => setSintomas(texto)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnConfirmar}
            underlayColor="#004D00">
            <Text style={styles.textoGuardar}>Guardar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },

  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  btnConfirmar: {
    padding: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
  },
  textoGuardar: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
