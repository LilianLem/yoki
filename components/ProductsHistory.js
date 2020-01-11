import React from 'react';
import {Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {homeStyle} from '../style/home';
import {fontsStyle} from "../style/fonts";
import AppHeader from './AppHeader';
// import ProductItem from './ProductItem';

export default class ProductsHistory extends React.Component {
  constructor(){
    super();

    this.state = {
      productModalVisible: false,
      productData: {}
    }
  }

  setProductModalVisible = (bool) => {
    this.setState({productModalVisible: bool});
  }


  render() {

    return (
      <>
        {/* <ProductItem handlePress={this.props.handlePress} produit={produit} /> */}
        <ScrollView style={homeStyle.scrollProductView}>
          {
           this.props.products.map(
               (produit) => {
                 return (
                    <TouchableOpacity
                      onPress={() => {
                        this.setProductModalVisible(!this.state.productModalVisible);
                        this.setState({productData: produit});
                      }}
                      key={produit.id}
                      style={homeStyle.productContainer}>

                      <Text style={fontsStyle.productName}>{produit.name}</Text>
                      <Text style={fontsStyle.productScanDate}>{produit.date.toDateString()}</Text>
                    </TouchableOpacity>
                 )
               }
           )
          }
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.productModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
            <AppHeader title={this.state.productData.name} />

            <View style={{flex: 1,  alignItems: "center"}}>
              {/* Ci-dessous : affiche les propriétés uniquement si les infos du produit existent. J'ai essayé de changer la couleur du texte en fonction de la valeur des propriétés via des opérateurs ternaires mais ça n'a pas fonctionné*/}
              <Text style={{marginTop: 10}} ><Text style={{textDecorationLine: 'underline'}}>Code-barres :</Text> {this.state.productData.infos && this.state.productData.infos.barcode}</Text>
              <Text style={{marginTop: 10}} ><Text style={{textDecorationLine: 'underline'}}>Groupe NOVA :</Text> {this.state.productData.infos && this.state.productData.infos.nova}</Text>

              <Text style={{marginTop: 10}} ><Text style={{textDecorationLine: 'underline'}}>Nutri-score :</Text> {this.state.productData.infos && this.state.productData.infos.nutriscore.toUpperCase()}</Text>
              <Text style={{marginTop: 10}} ><Text style={{textDecorationLine: 'underline'}}>Ingrédients :</Text> {this.state.productData.infos && this.state.productData.infos.ingredients}</Text>
              <Text style={{marginTop: 10}} ><Text style={{textDecorationLine: 'underline'}}>Quantité :</Text> {this.state.productData.infos && this.state.productData.infos.quantity}</Text>

              {/* Essai de code-barres dynamique : le state du code-barres ne veut pas s'insérer en concaténation <Image style={{width: 113, height: 50}} source={{uri : 'https://barcode.tec-it.com/barcode.ashx?data=8000500037560&code=EAN13&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0'}} /> */}

              {/* Après avoir essayé d'intégrer les données souhaitées directement en string au lieu d'un objet contenant les niveaux des nutriments (définition de newProduct dans App.js), ces données ne fonctionnent toujours pas.
              <Text>MATIERES GRASSES : {this.state.productData.infos && this.state.productData.infos.nutrients_fat}</Text>
              <Text>SEL : {this.state.productData.infos && this.state.productData.infos.nutrients_salt}</Text>
              <Text>MATIERES GRASSES SATUREES : {this.state.productData.infos && this.state.productData.infos.nutrients_saturatedFat}</Text>
              <Text>GLUCIDES : {this.state.productData.infos && this.state.productData.infos.nutrients_sugars}</Text> */}
            </View>

            <TouchableOpacity 
              onPress={() => {
                this.setProductModalVisible(!this.state.productModalVisible);
              }}
              style={{
                position: "absolute", 
                backgroundColor: "lightseagreen", 
                width: "100%",
                height: 70,
                left: 0, 
                bottom: 0,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"}}>


                <Text style={{color: 'white', fontSize: 16}} >Retour à la liste</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  }
}