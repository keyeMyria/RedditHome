import React from 'react';
import {connect} from 'react-redux';

import {
    WebView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {actionChannelFavouriteToogle} from '../../../actions';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this._processNavigationEvent);
    }

    _processNavigationEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'fav') {
                this.props.favouriteToggle(this.props.id);
            }
        }
    }

    _renderRightButtons = () => {
        Icon.getImageSource(this.props.isFavourite ? 'star' : 'star-border', 26).then((star) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    {
                        id: 'fav',
                        icon: star,
                        showAsAction: 'ifRoom'
                    }
                ]
            });
        });
    }

    render() {
        this._renderRightButtons();

        return (
            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
                source={{uri: this.props.url}}
                style={{flex: 1}}
            />);
    }
}

export default connect(
    (state, props) => ({
        isFavourite: state.favourites.list.indexOf(props.id) !== -1
    }),
    (dispatch) => ({
        favouriteToggle: (channelId: String) => {
            dispatch(actionChannelFavouriteToogle(channelId));
        }
    })
)(Details);