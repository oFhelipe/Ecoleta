import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'

interface IBGEUFResponse{
  sigla:string;
}

interface IBGECityResponse{
  nome:string;
}

interface IBGEFormatedData {
    label: string,
    value: string
}


const Home = () => {

  
  const [ufs, setUfs] = useState<IBGEFormatedData[]>([]);
  const [cities, setCities] = useState<IBGEFormatedData[]>([]);

  const [selectedUf, setSelectedUf] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    
    if(selectedCity === ''){
      Alert.alert('Ooooops...', 'Você precisa escolher uma cidade para entrar.');
      return;
    }
    
    navigation.navigate('Points', {uf:selectedUf, city:selectedCity});

  }
  
    useEffect(()=>{

      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {

          const ufInitials = response.data.map(uf=>{ return {label:uf.sigla, value:uf.sigla}});



          setUfs(ufInitials);

      });

  }, []);

  useEffect(()=>{

  if(selectedUf === ''){
      return;
  }

  axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then((response) => {

      const cityName = response.data.map(city=>{ return {label:city.nome, value:city.nome}});

      setCities(cityName);

  });

  }, [selectedUf]);


  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined} style={{flex:1}}>
    <ImageBackground imageStyle={styles.homebackground} source={require('../../assets/home-background.png')} style={styles.container}>
      <View style={styles.main}>
         <Image source={require('../../assets/logo.png')} />
         <View>
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
         </View>
      </View>

      <View style={styles.footer}>
          <RNPickerSelect
                 placeholder={{label:'Selecione uma UF'}}
                 style={{inputAndroid:styles.input, inputIOS:styles.input}}
                onValueChange={(value)=>{setSelectedUf(value)}}
                items={ufs}/>

          <RNPickerSelect
                 placeholder={{label:'Selecione uma cidade'}}
                 style={{inputAndroid:styles.input, inputIOS:styles.input}}
                onValueChange={(value)=>{setSelectedCity(value)}}
                items={cities}/>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
             <Icon name="arrow-right" color="#FFF" size={24} /> 
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
      </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    fontWeight:'bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  homebackground: {
    width:274,
    height:368,
  }
});

export default Home
