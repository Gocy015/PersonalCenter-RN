import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    Animated
} from 'react-native'

import UIUtils from './UIUtils'

export default class DailyMissionCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            missions: props.missions ? props.missions : [],
        }
        // this._resetAnimations();
    }

    render() {
        if (!this.missionProgressView) {
            this.missionProgressView = <MissionProgressAnimatedView missions={this.state.missions} />
        }
        console.log('DisplayMission Render');
        var missionProgressView = this.missionProgressView;
        return (
            <Animated.View style={styles.mainContainer}>
                <View style={styles.missionImageContainer}>
                    <Image style={styles.missionImage} source={require('../resources/me_task_icon.png')} />
                </View>

                {UIUtils.seperator(1, -1, 12, 'column')}
                <View style={styles.missionDetailContainer}>
                    <View style={styles.missionProgressContainer}>
                        {missionProgressView}
                    </View>
                    <View style={styles.missionImageContainer}>
                        <Image style={styles.prizeImage} source={require('../resources/me_Prize_icon.png')} />
                    </View>
                </View>
                {UIUtils.seperator(1, -1, 12, 'column')}
                <View style={styles.missionImageContainer}>
                    <Image style={styles.missionImage} source={require('../resources/me_shop_icon.png')} />
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    missionImageContainer: {
        // width: auto
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    prizeImage: {
        width: '55%',
        height: '55%',
        resizeMode: 'contain'
    },
    missionImage: {
        // flex: 1,
        width: '65%',
        height: '65%',
        resizeMode: 'contain'
    },
    missionDetailContainer: {
        flexDirection: 'row',
        flex: 4.5 // 先这样写成 1:4.5:1 吧
    },
    missionProgressContainer: {
        flex: 3,
        // backgroundColor: '#ffdd00',
    }
});

class MissionProgressAnimatedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missionOneIndex: 0,
            missionTwoIndex: -1,
            missions: props.missions,
            animationDuration: props.animationDuration > 0 ? props.animationDuration : 1,
            displayDuration: props.displayDuration > 0 ? props.displayDuration : 5,
            missionOneActualY: 0,
            missionTwoActualY: Infinity,
            missionOneAnimatedY: new Animated.Value(0),
            missionTwoAnimatedY: new Animated.Value(0),
            containerHeight: 0,
            shouldStartAnimation: false
        }
        this.recycleMissionViewOne = null;
        this.recycleMissionViewTwo = null;
    }

    render() {
        console.log('Render daily mission');

        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this._constructMissionViews();

        if (this.state.missions.length > 1 && this.state.missionTwoActualY !== Infinity) { //already layout ,ready animation
            this.timerId = setInterval(() => {
                this.setState({
                    shouldStartAnimation: true
                });
            }, this.state.displayDuration * 1000);
        }

        //start anim if needed
        if (this.state.shouldStartAnimation) {
            const missionOneAnimation = Animated.timing(
                this.state.missionOneAnimatedY, {
                    toValue: this.state.missionOneActualY - this.state.containerHeight,
                    duration: this.state.animationDuration * 1000,
                }
            );
            const missionTwoAnimation = Animated.timing(
                this.state.missionTwoAnimatedY, {
                    toValue: this.state.missionTwoActualY - this.state.containerHeight,
                    duration: this.state.animationDuration * 1000,
                }
            );

            Animated.parallel(
                [missionOneAnimation, missionTwoAnimation]
            ).start();

            this.state.missionOneActualY -= this.state.containerHeight;
            this.state.missionTwoActualY -= this.state.containerHeight;
            return (
                <View style={missionStyles.missionsContainer} >
                    {this.recycleMissionViewOne}
                    {this.recycleMissionViewTwo}
                </View>
            );
        }


        return (
            <View style={missionStyles.missionsContainer} >
                {this.recycleMissionViewOne}
            </View>
        );
    }

    _constructMissionViews() {

        this._setupAnimationValues();

        if (!this.recycleMissionViewOne) {
            const missionOne = this.state.missions[this.state.missionOneIndex];
            this.recycleMissionViewOne = (
                <Animated.View style={[missionStyles.singleMissionContainer, { transform: [{ translateY: this.state.missionOneAnimatedY }] }]}
                    onLayout={(event) => {
                        // this.state.containerHeight = event.nativeEvent.layout.height;
                        this.setState({
                            containerHeight: event.nativeEvent.layout.height
                        });
                    }}>
                    <Text style={missionStyles.singleMissionText}>{missionOne.name}</Text>
                    {this._missionProgressBar(missionOne.progress)}
                </Animated.View >
            )
        }

        if (!this.recycleMissionViewTwo && this.state.missionTwoIndex >= 0) {
            const missionTwo = this.state.missions[this.state.missionTwoIndex];
            this.recycleMissionViewTwo = (
                <Animated.View style={[missionStyles.singleMissionContainer, { transform: [{ translateY: this.state.missionTwoAnimatedY }] }]}>
                    <Text style={missionStyles.singleMissionText}>{missionTwo.name}</Text>
                    {this._missionProgressBar(missionTwo.progress)}
                </Animated.View >
            )
        }
    }

    _missionProgressBar(progress) {
        var p = progress * 100;
        p = Math.min(100, p);
        p = Math.max(p, 0);
        return (
            <View style={{ width: '100%' }}>
                <View style={missionStyles.singleMissionProgressBar}>
                    <View style={[missionStyles.singleMissionProgressBar, { marginRight: 0, marginLeft: 0, backgroundColor: '#ffdd00', width: p + '%' }]}>
                    </View>
                </View>

            </View>
        );
    }

    _setupAnimationValues() {
        if (this.state.containerHeight <= 0) {
            return;
        }
        if (this.state.missionTwoActualY === Infinity && this.state.missionOneActualY == 0) {
            //first time layout
            this.state.missionTwoActualY = this.state.containerHeight;
            this.state.missionTwoAnimatedY = new Animated.Value(this.state.containerHeight);
            this.state.missionTwoIndex = this._indexAfter(this.state.missionOneIndex);
        }

        if (this.state.missionOneActualY <= -this.state.containerHeight) {
            this.state.missionOneActualY = this.state.containerHeight;
            this.recycleMissionViewOne = null;
            this.state.missionOneIndex = this._indexAfter(this.state.missionTwoIndex);
            this.state.missionOneAnimatedY = new Animated.Value(this.state.containerHeight);
        }
        if (this.state.missionTwoActualY <= -this.state.containerHeight) {
            this.state.missionTwoActualY = this.state.containerHeight;
            this.recycleMissionViewTwo = null;
            this.state.missionTwoIndex = this._indexAfter(this.state.missionOneIndex);
            this.state.missionTwoAnimatedY = new Animated.Value(this.state.containerHeight);
        }
    }

    _resetAnimations() {
        this.state.missionOneActualY = 0;
        this.state.missionTwoActualY = Infinity;
        this.recycleMissionViewOne = null;
        this.recycleMissionViewTwo = null;
        this.state.missionOneAnimatedY = new Animated.Value(0);
        this.state.missionTwoAnimatedY = new Animated.Value(0);

        this.missionOneIndex = 0;
        this.missionTwoIndex = -1;
    }

    _indexAfter(index) {
        var idx = ++index;
        idx = idx % this.state.missions.length;
        return idx;
    }
}

const missionStyles = StyleSheet.create({
    missionsContainer: {
        flex: 1,
        // justifyContent:'flex-start'
        // display:'none'
        overflow: 'hidden'
    },
    singleMissionContainer: {
        flex: 1,
        // backgroundColor: '#ffdd00',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute' // 
    },
    singleMissionText: {
        fontSize: 16,
        paddingBottom: 6,
        marginLeft: 16
    },
    singleMissionProgressBar: {
        backgroundColor: '#dadee5',
        height: 10,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 6
    }
});