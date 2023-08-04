import React, { useEffect, useState } from "react";
import { Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from "react-native";
import DatePicker from "react-native-date-picker";

function Formulario({
                      cerrarModal,
                      pacientes,
                      setPacientes,
                      paciente: pacienteObj,
                      setPaciente: setPacienteObj
}) {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios',
        [{text: 'Entendido'}]
      );
      return;
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    }

    if (id) {
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      setPacienteObj({});
    } else {
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    // Cerrar modal
    cerrarModal();

    // Reiniciar todos los campos
    resetAll();
  }

  const resetAll = () => {
    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  }

  return (
    <Modal
      animationType={"slide"}
      visible={true}
    >
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            { id ? 'Actualizar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>
          <Pressable
            onPress={() => {
              cerrarModal();
              setPacienteObj({});
              resetAll();
            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cerrar</Text>
          </Pressable>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              placeholder={'Nombre paciente'}
              placeholderTextColor={'#777'}
              style={styles.input}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              placeholder={'Propietario'}
              placeholderTextColor={'#777'}
              style={styles.input}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder={'Email'}
              keyboardType={'email-address'}
              placeholderTextColor={'#777'}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              placeholder={'Teléfono'}
              keyboardType={'number-pad'}
              placeholderTextColor={'#777'}
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              maxLength={8}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale={'es'}
                mode={'date'}
                onDateChange={(date) => setFecha(date)}
              />
            </View>
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              placeholder={'Síntomas del paciente'}
              placeholderTextColor={'#777'}
              style={[styles.input, styles.sintomas]}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={5}
            />
          </View>
          <Pressable
            onPress={handleCita}
          >
            <Text style={styles.btnNuevaCita}>{id ? 'Actualizar Paciente' : 'Agregar Paciente'}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold: {
    fontWeight: '900'
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 15,
    textTransform: 'uppercase',
    backgroundColor: '#5827A4',
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sintomas: {
    height: 100,
    textAlignVertical: 'top',
  },
  fechaContenedor: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden'
  },
  btnNuevaCita: {
    marginVertical: 30,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 20,
  },
})

export default Formulario;
