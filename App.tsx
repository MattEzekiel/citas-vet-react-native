/* eslint-disable */
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, Pressable, FlatList, Alert, Modal } from "react-native";
import Formulario from "./src/components/Formulario";
import Paciente from "./src/components/Paciente";
import InformacionPaciente from "./src/components/InformacionPaciente";

function App(): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const pacienteEditar = (id: any) => {
    // @ts-ignore
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id);

    setPaciente(pacienteEditar[0]);
  }

  const pacienteEliminar = (id: any) => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
                { text: 'Cancelar' },
                { text: 'Si, eliminar', onPress: () => {
                    // @ts-ignore
                    const pacientesActualizados = pacientes.filter(pacienteState => pacienteState.id !== id);
                    setPacientes(pacientesActualizados);
                  }
                }
              ]
    )
  }

  const cerrarModal = () => {
    setDisplayModal(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPressOut={() => setDisplayModal(true)}
        style={styles.btnNuevaCita}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>
      { pacientes.length === 0 ?
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
        :
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item:any) => item.id}
          renderItem={({item}) => {
            return(
              <Paciente
                item={item}
                setDisplayModal={setDisplayModal}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            )
          }}
        />
      }
      { displayModal && (
        <Formulario
          cerrarModal={cerrarModal}
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      ) }
      <Modal
        visible={modalPaciente}
        animationType={'fade'}
      >
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    paddingTop: 20,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
