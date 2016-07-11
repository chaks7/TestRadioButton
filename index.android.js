/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import loadSurvey from './SurveyEngine.js';
import RadioComponent from './RadioComponent.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback
} from 'react-native';
import Button from 'apsl-react-native-button';

class MobileSurvey extends Component {

  constructor(props) {
    super(props);
    var surveyQuestions = loadSurvey();
    this.state = {
      surveyJson: surveyQuestions,
      currQuestion: surveyQuestions.Question[0],
      radioValue: null,
      radioIndex: -1,
      responseText: null,
    };
  }
  handleButtonPress(data) {
    //Need to find the position in the Response array and decrease the array index by 1
  }

  handleNextButtonPress(data) {
    console.log('In handleNextButtonPress()');
    var currQ = this.state.currQuestion;
    var nextQuestion = this.state.surveyJson.Question[Number(currQ.QuestionNumber)];
    if (this.refs.radioV) {
      var v = this.refs.radioV.state.radioValue;
      console.log(v);
    }
    this.setState({ currQuestion: nextQuestion, radioValue: null, radioIndex: -1, responseText: null, });
  }

  renderQPart(QPart) {
    var qParts, definedResponses, textInput;

    if (QPart.DefinedResponses === undefined && QPart.DataType !== "5") {
      textInput = <View>
        <TextInput
          style={styles.textbox}
          onChangeText={(text) => this.setState({ text }) }
          placeholder=""
          autoCorrect={false}
          />
      </View>
    }
    else {
      var radioB, radioPropsArray;

      if (QPart.DataType === "5") {
        radioPropsArray = [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }];
      }
      else {
        radioB = QPart.DefinedResponses.DefinedResponse;
        radioPropsArray = radioB.map(function (radioOptions) { return { label: radioOptions.Desc, value: radioOptions.Num } });
      }
      definedResponses = <RadioComponent radio_props={radioPropsArray} ref="radioV" />
    }

    qParts =
      <View key={QPart.QPartNum}>
        <View>
          <Text style={styles.instructions}>
            {QPart.QPartText}
          </Text>
        </View>
        {textInput}
        {definedResponses}
      </View>
    return qParts;
  }

  render() {
    var currQ = this.state.currQuestion;
    var qParts;

    if (Array.isArray(currQ.QParts.QPart)) {
      qParts =
        <View>
          {currQ.QParts.QPart.map(this.renderQPart) }
        </View>;
    } else {
      qParts = this.renderQPart(currQ.QParts.QPart);
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerMain}>
          {qParts}
        </View>
        <View style={[styles.containerFooter]}>
          <Button style={styles.button}
            onPress= {this.handleButtonPress.bind(this, "Back") }>
            Back
          </Button>
          <Button style={styles.button}
            onPress= {this.handleNextButtonPress.bind(this) }>
            Next
          </Button>
          <Button style={styles.button}
            onPress= {this.handleButtonPress.bind(this, "Done") } >
            Done
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: { margin: 5, color: 'black', borderRadius: 8, height: 50, width: 100, backgroundColor: '#1155DD', },
  container: { flex: 1, backgroundColor: 'white', borderWidth: 5, borderColor: 'white', borderRadius: 5, },
  containerFooter: { flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'white', },
  containerMain: { flex: 9, backgroundColor: 'white', borderWidth: 5, borderColor: 'white', borderRadius: 5, },
  instructions: { textAlign: 'left', color: 'black', fontSize: 24, marginBottom: 10, },
  textbox: { color: '#000000', fontSize: 17, height: 36, padding: 7, borderRadius: 4, borderColor: '#cccccc', borderWidth: 1, marginBottom: 10, },
  radioButtonWrap: { marginRight: 5 },
  radioComponent: { backgroundColor: 'white', justifyContent: 'flex-start', },
  radioStyle: { borderRightWidth: 1, borderColor: '#2196f3', paddingRight: 10 },
});

AppRegistry.registerComponent('MobileSurvey', () => MobileSurvey);

