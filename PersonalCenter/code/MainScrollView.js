import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    ListView,
    TouchableHighlight,
    Text
} from 'react-native';

import UserInfoCell from './UserInfoCell'
import DailyMissionCell from './DailyMissionCell'

const Dimensions = require('Dimensions');
var appWindow = Dimensions.get('window');

export class MainPageScrollView extends Component {
    render() {
        return (
            // <View style={styles.main}>
            // </View>
            <GridView />
        );
    }
}

const itemSpacing = 0;
const itemPerRow = 3;
const itemWidth = appWindow.width / itemPerRow - itemPerRow * itemSpacing;
const itemHeight = 100;
const userInfoHeight = 166;
const dailyMissionHeight = 60;
class GridView extends Component {

    initState() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        var data = [];
        data.push('User Info Cell');//user info cell
        data.push('Daily Mission Cell');
        for (var index = 0; index <= 10; index++) {
            data.push("Cell " + index); // normal info cells
        }
        this.state = {
            dataSource: ds.cloneWithRows(data),
        };

        this.dataArray = data;
    }

    _pressData = {};
    constructor(props) {
        super(props);
        this.initState();
        this._pressData = {};
    }

    render() {
        // var { height } = Dimensions.get(this);
        // 没把navigation算进去，还是有点问题
        var rows = Math.ceil((appWindow.height - userInfoHeight) / (itemHeight + itemSpacing));
        var initialSize = 1 + Math.min(rows * itemPerRow, this.dataArray.length);
        console.log('calculated rows : ' + rows + ',items : ' + rows * itemPerRow + ',final initial size : ', initialSize);
        return (
            // ListView wraps ScrollView and so takes on its properties. 
            // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.

            <ListView contentContainerStyle={styles.list}
                initialListSize={initialSize}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
            />
        );
    }

    _renderItem(itemData, sectionID, itemID) {
        const imageUris = [
            'https://cdn3.iconfinder.com/data/icons/video-game-consoles-and-controllers/288/ps4_controller-01-512.png',
            'https://d30y9cdsu7xlg0.cloudfront.net/png/194080-200.png',
            'https://cdn2.iconfinder.com/data/icons/game-device-5/512/xone_controller_gray-512.png'
        ];
        var itemNum = parseInt(itemID);
        var imgSource = {
            uri: imageUris[itemNum % imageUris.length]
        }

        var self = this;
        if (itemNum == 0) {
            return (
                <View style={styles.userCell}>
                    <UserInfoCell headerUrl={require("../resources/header.png")} userName="Gocy" />
                </View>
            );
        }
        if (itemNum == 1) {
            return (
                <View style={styles.dailyMissionCell}>
                    <DailyMissionCell missions={[
                        { name: '日常任务', progress: 0.3 },
                        { name: '月度壕友成就', progress: 0.0 },
                        { name: '刷飞机才是壕', progress: 0.9 },
                    ]} />
                </View>
            );
        }
        return (
            <TouchableHighlight onPress={() => self._pressItem(itemID)} underlayColor='rgba(0,0,0,0)' >
                <View>
                    <View style={styles.infoCell}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={styles.text}>
                            {itemData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight >
        );
    }
    _pressItem(itemID) {
        var item = parseInt(itemID)
        if (item >= this.dataArray.length) {
            return;
        }

        console.log('Item ' + item + ' pressd ,data : ' + this.dataArray[item]);
    }

    _reloadData() {
        if (!this.state.dataSource) {
            return;
        }
        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows(
        //         this.dataArray
        //     )
        // });
    }
}

var styles = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    userCell: {
        width: appWindow.width,
        height: userInfoHeight,
        marginBottom: 6
    },
    dailyMissionCell: {
        width: appWindow.width,
        height: dailyMissionHeight,
        marginBottom: 6,
        backgroundColor: '#F6F6F6',
    },
    infoCell: {
        justifyContent: 'center',
        padding: 5,
        marginRight: itemSpacing,
        width: itemWidth,
        height: 110,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 0.5,
        // borderRadius: 5,
        borderColor: 'rgba(218,216,217,0.5)'
    },
    thumb: {
        width: 64,
        height: 64
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    }
});


