import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import UIUtils from './UIUtils'

export default class UserInfoCell extends Component {
    userData = {}
    constructor(props) {
        super(props);
        this.userData = props
    }
    render() {
        return (
            <View style={styles.mainContainer} >
                <View style={styles.upperContainer}>
                    <View style={styles.headerContainer}>
                        <Image source={this.userData.headerUrl} style={styles.headerImage} />
                        <Text style={styles.userName}>{this.userData.userName}</Text>
                    </View>
                    <TouchableHighlight>
                        <Image style={styles.headerArrow} source={require('../resources/rightArrow.png')} />
                    </TouchableHighlight>
                </View>
                {UIUtils.seperator(-1, 1, 0, 'row')}
                <View style={styles.lowerContainer}>
                    {this._infoView(22, '关注', true)}
                    {this._infoView(6, '粉丝', true)}
                    {this._infoView(23, "动态", false)}
                </View>
            </View >
        );
    }

    _infoView(value, title, needSeperator) {

        return (
            <View style={styles.infoItemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.userInfoValue}>
                        {value}</Text>
                    <Text style={styles.userInfoTitle}>
                        {title}</Text>
                </View>
                {needSeperator ? UIUtils.seperator(1, -1, 10, 'column') : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        backgroundColor: '#F6F6F6'
    },
    upperContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: 4,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 35
    },
    userName: {
        fontSize: 16,
        paddingBottom: 20
    },
    headerArrow: {
        width: 24,
        height: 16,
        resizeMode: 'contain'
    },
    lowerContainer: {
        // flex: 1,
        // paddingTop: 10,
        flexDirection: 'row',
        justifyContent: "space-around",
        // paddingBottom: 10,
        // backgroundColor: '#123456'
    },
    infoItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        // backgroundColor: '#123456',
        // paddingBottom: 10
    },
    infoContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        // backgroundColor: '#123456',
        flex: 1
    },
    userInfoTitle: {
        fontSize: 13,
        color: '#6e6f72'
    },
    userInfoValue: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 3
    }
});