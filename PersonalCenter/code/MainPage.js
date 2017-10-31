import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

import { MainPageScrollView } from './MainScrollView'

export class MainPageView extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {

        const { state } = navigation;
        var rightItemTitle = "Default";
        var rightItemAction = () => { };
        var rightItemImagePath = undefined;
        if (state.params) {
            if (state.params.rightItemTitle) {
                rightItemTitle = state.params.rightItemTitle;
            }
            if (state.params.rightItemAction) {
                rightItemAction = state.params.rightItemAction;
            }
            if (state.params.rightItemImagePath) {
                rightItemImagePath = state.params.rightItemImagePath;
            }
        }

        const itemAppearance = rightItemImagePath ?
            <Image source={rightItemImagePath} style={styles.rightItemImageButton} /> :
            <Text style={styles.rightItemTextButton}>{rightItemTitle}</Text>;

        return {
            title: "Personal Center",
            headerRight: (
                <TouchableHighlight onPress={rightItemAction} underlayColor='transparent' activeOpacity={0.5} >
                    {itemAppearance}
                </TouchableHighlight>
            ),
            headerStyle: {
                borderBottomColor: 'transparent',
                // tintColor:""
                backgroundColor: '#F6F6F6'
            }
            // headerTintColor:'transparent'
        };
    };

    constructor(props) {
        super(props);
        this.props.navigation.setParams({
            rightItemTitle: 'Settings',
            rightItemAction: this.settingsButtonPressed,
            rightItemImagePath: require("../resources/nav_btn_set_black_nor.png")
        });
    }

    render() {
        return (
            <MainPageScrollView />
        );
    }

    settingsButtonPressed(event) {
        console.log("Settings Pressed : ", event);
    }
}


const styles = StyleSheet.create({
    navigator: {
        flex: 1,
        backgroundColor: "#ffdd00"
    },
    rightItemImageButton: {
        width: 22,
        height: 22,
        // padding: 32
        marginRight: 8,
        resizeMode: 'contain'
    },
    rightItemTextButton: {
        fontSize: 16,
        marginRight: 8
    },

});

