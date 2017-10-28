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
class GridView extends Component {

    initState() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        var data = [];
        for (var index = 0; index < 10; index++) {
            data.push("Cell : " + index);
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
        var rows = Math.ceil(appWindow.height / (itemHeight + itemSpacing));
        var initialSize = Math.min(rows * itemPerRow, this.dataArray.length);
        console.log('calculated rows : ' + rows + ',items : ' + rows * itemPerRow + ',final initial size : ', initialSize);
        return (
            // ListView wraps ScrollView and so takes on its properties. 
            // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.

            <ListView contentContainerStyle={styles.list}
                initialListSize={initialSize}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        var rowNum = parseInt(rowID);
        var imgSource = {
            uri: THUMB_URLS[rowNum % THUMB_URLS.length],
        };
        var self = this;
        if (rowNum == 0) {
            return (
                <View style={styles.userCell}>
                    <UserInfoCell headerUrl={require("../resources/header.png")}  userName="Gocy"/>
                </View>
            );
        }
        return (
            <TouchableHighlight onPress={() => self._pressRow(rowID)} underlayColor='rgba(0,0,0,0)' >
                <View>
                    <View style={styles.infoCell}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={styles.text}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight >
        );
    }
    _pressRow(rowID) {
        var row = parseInt(rowID)
        if (row >= this.dataArray.length) {
            return;
        }

        this.dataArray[row] = this.dataArray[row] + 'x';
        this._reloadData();
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

var THUMB_URLS = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509693364&di=aa4202ac0272647cdcc9bd35aebc260e&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.gamersky.com%2Fimage2017%2F04%2F20170422_xdj_187_7%2Fimage002.jpg'];

var styles = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    userCell: {
        width: appWindow.width,
        marginBottom: 6
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


