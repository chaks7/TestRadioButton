/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import loadSurvey from './SurveyEngine.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback
} from 'react-native';
import Button from 'apsl-react-native-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

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
    var currQ = this.state.currQuestion;
    var nextQuestion = this.state.surveyJson.Question[Number(currQ.QuestionNumber)];
    console.log(this.state.radioValue);
    console.log(this.state.radioIndex);
    console.log(this.state.responseText);
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
      definedResponses = <RadioComponent radio_props={radioPropsArray} />
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
  container: { flex: 1, backgroundColor: 'white', borderWidth: 5, borderColor: 'white', borderRadius: 5, },
  containerMain: { flex: 9, backgroundColor: 'white', borderWidth: 5, borderColor: 'white', borderRadius: 5, },
  containerFooter: { flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'white', },
  radioComponent: { backgroundColor: 'white', justifyContent: 'flex-start', },
  instructions: { textAlign: 'left', color: 'black', fontSize: 24, marginBottom: 10, },
  textbox: { color: '#000000', fontSize: 17, height: 36, padding: 7, borderRadius: 4, borderColor: '#cccccc', borderWidth: 1, marginBottom: 10, },
  button: { margin: 5, color: 'black', borderRadius: 8, height: 50, width: 100, backgroundColor: '#1155DD', },
  radioStyle: { borderRightWidth: 1, borderColor: '#2196f3', paddingRight: 10 },
  radioButtonWrap: { marginRight: 5 },
});

AppRegistry.registerComponent('MobileSurvey', () => MobileSurvey);

export default class RadioComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: null,
      value1Index: -1,
      radio_props: null,
      initial: -1,
    }
  }

  render() {
    return (

      // <View style={styles.radioComponent}>
      //   <RadioForm
      //     //formHorizontal={true}
      //     radio_props={this.props.radio_props}
      //     initial={this.state.value1Index}
      //     animation={true}
      //     buttonColor={'blue'}
      //     labelColor={'#000'}
      //     onPressRadio={(value, index) => {
      //       this.setState({ value1: value })
      //       this.setState({ value1Index: index })
      //     } }
      //     />
      // </View>
      <View style={styles.component}>
        <RadioForm formHorizontal={false} animation={true} >
          {this.props.radio_props.map((obj, i) => {
            var onPress = (value, index) => {
              this.setState({
                value1: value,
                value1Index: index
              })
            }
            return (
              <RadioButton labelHorizontal={true} key={i} >
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.value1Index === i}
                  onPress={onPress}
                  buttonInnerColor={'blue'}
                  buttonOuterColor={this.state.value1Index === i ? 'blue' : '#000'}
                  buttonSize={18}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                  />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={onPress}
                  labelStyle={{ fontSize: 18, color: '#000' }}
                  labelWrapStyle={{}}
                  />
              </RadioButton>
            )
          }) }
        </RadioForm>
      </View>
    );
  }
}
RadioComponent.props = { value1: null, value1Index: -1 };
//RadioComponent.propTypes = { getDefRespValue: React.PropTypes.func, };
