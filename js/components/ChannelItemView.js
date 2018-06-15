import React from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import ImageProgress from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Channel from '../models/Channel';

const ChannelItemView = ({model, isFavourite, onFavouritePress, navigator}: { model: Channel }) => {
    return (<TouchableOpacity
        style={styles.root}
        onPress={() => {
            navigator.push({
                screen: 'channels.details',
                title: model.name,
                backButtonTitle: '',
                backButtonHidden: false,
                passProps: {id: model.id, url: model.url},
                navigatorStyle: {tabBarHidden: true}
            });
        }}>
        {
            model.thumbUrl ?
                (<ImageProgress
                        style={styles.thumb}
                        source={{uri: model.thumbUrl}}
                        indicator={Progress.Pie}/>
                ) :
                (
                    <View style={styles.thumb}>
                        <Icon name='image' size={45} color='#004D40'/>
                    </View>
                )
        }
        <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>{model.title}</Text>
            <TouchableOpacity style={styles.btnFav} onPress={onFavouritePress}>
                <Icon size={30} name={isFavourite ? 'star' : 'star-border'} color='#FF9800'/>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>);
};

ChannelItemView.propTypes = {
    model: PropTypes.instanceOf(Channel).isRequired,
    isFavourite: PropTypes.bool.isRequired,
    onFavouritePress: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired
};

export default ChannelItemView;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    thumb: {
        width: 90,
        height: 90,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        flex: 1
    },
    title: {
        marginRight: 10,
        fontSize: 16
    },
    btnFav: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 10
    }
});