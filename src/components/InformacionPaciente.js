import React from "react";
import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";
import { formatearFecha } from "../helpers";

function InformacionPaciente({ paciente, setModalPaciente, setPaciente }) {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>
        Información <Text style={styles.tituloBold}>Paciente</Text>
      </Text>
      <View>
        <Pressable
          onPress={() => {
            setPaciente({});
            setModalPaciente(false);
          }}
        >
          <Text style={styles.btnCancelarTexto}>X Cerrar</Text>
        </Pressable>
      </View>
      <View style={styles.contenido}>
        <View style={styles.campoView}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style={styles.campoView}>
          <Text style={styles.label}>Propietario:</Text>
          <Text style={styles.valor}>{paciente.propietario}</Text>
        </View>
        <View style={styles.campoView}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.valor}>{paciente.email}</Text>
        </View>
        <View style={styles.campoView}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{paciente.telefono ?? '-'}</Text>
        </View>
        <View style={styles.campoView}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
        </View>
        <View style={styles.campoView}>
          <Text style={styles.label}>Síntomas:</Text>
          <Text style={styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    fontWeight: '600',
    marginTop: 30
  },
  tituloBold: {
    fontWeight: '900',
    color: '#fff',
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 15,
    textTransform: 'uppercase',
    backgroundColor: '#E06900',
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  contenido: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  campoView: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 3
  },
  valor: {
    fontWeight: '700',
    color: '#374151',
    fontSize: 16,
  },
})

export default InformacionPaciente;
