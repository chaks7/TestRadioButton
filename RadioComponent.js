import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableNativeFeedback
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

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

    onRadioPress(value, index) {
        console.log('In onRadioPress()');
        this.state.radioIndex = index;
        this.state.radioValue = value;
        this.setState({ value1: value, value1Index: index });
    }

    render() {
        return (
            <View>
                <RadioForm formHorizontal={false} animation={true}>
                    {this.props.radio_props.map((obj, i) => {
                        var onPress = (value, index) => this.onRadioPress(value, index);
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
RadioComponent.props = { radioValue: null, radioIndex: -1 };
//RadioComponent.propTypes = { getChildRadioRespones: React.PropTypes.func.isRequired, };