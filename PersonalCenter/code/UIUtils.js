import React from 'react'

import {
    View
} from 'react-native'

export default class UIUtils {
    static seperator(width, height, padding, direction) {
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
