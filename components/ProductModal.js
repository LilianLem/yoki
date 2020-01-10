import React from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default class ProductModal extends React.Component {
  constructor(){
    super();

    this.state = {
      modalVisible: this.props.modalVisible
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex: 1}}>
          <AppHeader title={'Dernier produit'} />

            <Text>Hello World!</Text>

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
    );
  }
}