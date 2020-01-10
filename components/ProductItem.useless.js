import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {homeStyle} from '../style/home';
import {fontsStyle} from "../style/fonts";
// import ProductModal from './ProductModal';

export default class ProductItem extends React.Component {
  constructor(){
    super();

    // this.state = {
    //   modalVisible: false
    // }
  }

  handleProductPress = (id) => {
    {/* alert('Je clique sur un produit avec l\'id : ' + id) */}

    {/*this.setState({modalVisible: true});
    <ProductModal id={id} modalVisible={this.state.modalVisible}  /> */}
  }

  render() {

    return (
       {/* <TouchableOpacity onPress={() => this.props.handlePress(this.props.produit.id)} key={this.props.produit.id} style={homeStyle.productContainer}>
         <Text style={fontsStyle.productName}>{this.props.produit.name}</Text>
         <Text style={fontsStyle.productScanDate}>{this.props.produit.date.toDateString()}</Text>
       </TouchableOpacity> */}
    );
  }
}