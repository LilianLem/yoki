import React from 'react';
import {Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import { RNCamera } from 'react-native-camera';
import {homeStyle} from './style/home';
import {fontsStyle} from "./style/fonts";
import {globalStyle} from "./style/global";
import AppHeader from './components/AppHeader';
import ScanButtonView from './components/ScanButtonView';
import ProductsHistory from './components/ProductsHistory';

export default class App extends React.Component {
  constructor(){
    super();

    this.state = {
      modalVisible: false,

      products: [
        {id: 1, name : 'Coca', date: new Date()},
        {id: 2, name : 'Orangina', date: new Date()},
        {id: 3, name : 'Nestea', date: new Date()},
        {id: 4, name : 'Bière sans alcool', date: new Date()}
      ]
    }
  }

  setModalVisible = (bool) => {
    this.setState({modalVisible: bool});
  }

  handleScanPress = async () => {
    // this.setModalVisible(true);

    await this._handleBarCodeRead({type: 'EAN', data: '8000500037560'});
  }

  handleProductPress = async (id) => {
    // alert('Je clique sur un produit avec l\'id : ' + id);

    // await this._handleBarCodeRead({type: 'EAN', data: '8000500037560'});
  }

  async getProductFromApi(barcode) {
    try {
      let response = await fetch(
          'http://fr.openfoodfacts.org/api/v0/produit/' + barcode + '.json'
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  /*
  Appelée quand la caméra a détecté un code barre,
  testez vous même !
   */
  async _handleBarCodeRead ({ type, data }) {
    // On récupère le produit scanné
    let apiResponse = await this.getProductFromApi(data);
    let scannedProduct = apiResponse.product;
    let barcode = apiResponse.code;
 
    // scannedProduct.nutrient_levels = JSON.parse(scannedProduct.nutrient_levels);

    let _products = this.state.products; // récupération de la liste actuelle

    // Ligne permettant d'insérer l'ID supérieur à celui du dernier produit ajouté
    let nextId = _products.length + 1;

    // On crée un nouvel obj. produit
    let newProduct = {
      id: nextId,
      name: scannedProduct.product_name,
      date: new Date(),
      infos: {
        barcode: barcode,
        image: scannedProduct.image_small_url,
        ingredients: scannedProduct.ingredients_text_fr,
        nutriscore: scannedProduct.nutriscore_grade,
        nova: scannedProduct.nova_group,
        /* nutrients_fat: scannedProduct.nutrient_levels.fat,
        nutrients_salt: scannedProduct.nutrient_levels.salt,
        nutrients_saturatedFat: scannedProduct.nutrient_levels.saturated-fat,
        nutrients_sugars: scannedProduct.nutrient_levels.sugars, */
        quantity: scannedProduct.quantity
      }
    };

    console.log(scannedProduct);
    console.log(newProduct);
 
    _products.push(newProduct); // ajout du nouveau produit
    this.setState({products: _products}); // on set les nouveau produits dans le state
    this.setState({modalScanVisible: false});
  };

  render() {

    return (
      <View style={globalStyle.container}>
        <AppHeader title={'Yoki'} />
        <ScanButtonView handlePress={this.handleScanPress} />
        <ProductsHistory handlePress={this.handleProductPress} products={this.state.products} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
            <AppHeader title={'Scanner'} />

            {/* <RNCamera
              style={{flex: 1}}
              type={RNCamera.Constants.Type.back}

              
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            /> */}

            <TouchableOpacity 
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={{
                position: "absolute", 
                backgroundColor: "lightblue", 
                width: "100%",
                height: 70,
                left: 0, 
                bottom: 0}}>


                <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  }
}