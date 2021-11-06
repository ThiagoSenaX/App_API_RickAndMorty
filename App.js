import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet, Image} from 'react-native';

const request = async (callback) => {
  // confirma a comunicação com a api(fetch), e armazena para o response
  const response = await fetch('https://rickandmortyapi.com/api/character/?page=1');

// a resposta de response passa para o json
  const parsed = await response.json();

  //pega tudo que esta dentro da array'...'
  callback(parsed.results);
}

export default function App(){

  //useState estará sempre verificando os registros e setando pra manter atualizado "Um loop constante"
  const [registros, setRegistros] = useState([]);

  useEffect(()=> {
    request(setRegistros);
},[])

  return(
    <View style={estilo.container}>
      <View>
      <Text style={estilo.titulo}>Personagens de:{'\n'}Rick and Morty</Text>
      </View>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({item}) =>
        <Text style={estilo.corpo}>Nome: {item.name}{'\n'}<Image style={estilo.img} source={{uri:item.image}}/> {'\n'}Espécie: {item.species} {'\n'} Gênero: {item.gender} {'\n'} Status: {item.status} </Text>
        } />
      </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#363636',
    marginTop: 25,
    alignContent: 'center',
    textAlign: 'center'
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00eccf',
    textAlign: 'center',
    margin: 15,
    marginTop: 50,
  },
  corpo:{
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    margin: 20,
    backgroundColor: '#00eccf80',
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 5,
    borderColor: '#FFD70080',
    shadowOffset: (10, 10),
    shadowColor: '#ffffff' 
  },
  img:{
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
