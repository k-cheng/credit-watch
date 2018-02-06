import React, { Component } from 'react';
import { WebView, Text, View, StyleSheet } from 'react-native';

const PLAID_API_KEY = 'c585b76ca03c979d5586cc10e3efd7'
const PLAID_ENV = 'sandbox'
const PLAID_PRODUCT = 'auth,transactions'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      data: {}
    }
  }

  render() {
    return (
      this.state.data.action && this.state.data.action.indexOf('::connected') !== -1 ?
        this.renderDetails() : this.renderLogin()
    );
  }
  renderLogin() {
    return <WebView 
      source={{uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${PLAID_API_KEY}&env=${PLAID_ENV}&product=${PLAID_PRODUCT}&clientName=CatalinMiron&isWebView=true&webhook=http://google.com`}} 
      onMessage={(e) => this.onMessage(e)}
    />
  }

  renderDetails() {
    return <View style={styles.container}>
      <Text>Institution: {this.state.data.metadata.institution.name}</Text>
      <Text>Institution ID: {this.state.data.metadata.institution.institution_id}</Text>
      <Text>Token: {this.state.data.metadata.public_token}</Text>
    </View>
  }

  onMessage(e) {
    /*
      Response example for success

      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */

    this.setState({
      data: JSON.parse(e.nativeEvent.data)
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  value: {
    marginBottom: 20,
    textAlign: 'center'
  }
});