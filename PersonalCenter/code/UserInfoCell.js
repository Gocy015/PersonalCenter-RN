import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Button
} from 'react-native';

export default class UserInfoCell extends Component {
    userData = {}
    constructor(props){
        super(props);
        this.userData = props
    }
    render() {
        return (
            <View style={styles.mainContainer} >
                <View style={styles.upperContainer}>
                    <View style={styles.headerContainer}>
                        <Image source={this.userData.headerUrl} style={styles.headerImage} />
                        <Text>{this.userData.userName}</Text>
                    </View>
                    <Button style={styles.detailButton} title=">" onPress={() => { }} />
                </View>
                {this._seperator(-1, 1, 0, 'row')}
                <View style={styles.lowerContainer}>
                    <View style={styles.infoItemContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.userInfoValue}>
                                18</Text>
                            <Text style={styles.userInfoTitle}>
                                关注</Text>
                        </View>
                        {this._seperator(1, -1, 2, 'column')}
                    </View>
                    <View style={styles.infoItemContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.userInfoValue}>
                                6</Text>
                            <Text style={styles.userInfoTitle}>
                                粉丝</Text>
                        </View>
                        {this._seperator(1, -1, 2, 'column')}
                   </View>
                   <View style={styles.infoItemContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.userInfoValue}>
                            23</Text>
                        <Text style={styles.userInfoTitle}>
                            动态</Text>
                    </View>
                 </View>
                </View>
            </View >
        );
    }

    _seperator(width, height, padding, direction) {
        var commonStyle = {
            backgroundColor: 'rgba(218,216,217,0.5)',
            // padding: 5
        }
        if (width > 0) {
            commonStyle.width = width;
        }
        if (height > 0) {
            commonStyle.height = height;
        }

        if (direction == 'row') {
            commonStyle.marginLeft = padding;
            commonStyle.marginRight = padding;
        } else if (direction == 'column') {
            commonStyle.marginTop = padding;
            commonStyle.marginBottom = padding;
        } else {
            return null;
        }
        return (
            <View style={commonStyle}>
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
        borderRadius:35
    },
    lowerContainer: {
        // flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "space-around",
        marginBottom: 10
    },
    infoItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1
    },
    infoContainer: {
        alignItems: 'center',
        flex:1
    },
    userInfoTitle:{
        fontSize:13,
        color:'#6e6f72'
    },
    userInfoValue:{
        fontWeight:'bold',
        fontSize:15,
        marginBottom:3
    }
});