import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { formatearFecha } from "../helpers";

function Paciente({
                    item,
                    setDisplayModal,
                    pacienteEditar,
                    pacienteEliminar,
                    setModalPaciente,
                    setPaciente,
}) {
  const { paciente, fecha, id } = item;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente</Text>
      <Pressable
        onPress={() => {
          setModalPaciente(true);
          setPaciente(item);
        }}
      >
        <Text style={styles.texto}>
          { paciente }
        </Text>
      </Pressable>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onPress={() => {
            setDisplayModal(true);
            pacienteEditar(id);
          }}
        >
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnEliminar]}
          onLongPress={() => pacienteEliminar(id)}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#94a3B8',
    borderBottomWidth: 2,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 10
  },
  texto: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#fff',
    fontSize: 12,
  }
});

export default Paciente;
