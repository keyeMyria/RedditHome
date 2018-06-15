import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {
    View,
    Text,
    FlatList
} from 'react-native';

import {
    actionChannelFavouriteRemove,
    actionChannelsFavouritesSearch
} from '../../../actions';

import ChannelItemView from '../../../components/ChannelItemView';
import SearchView from '../../../components/SearchView';

import Channel from '../../../models/Channel';

class Favourites extends React.Component {
    _renderListItem = ({item}) => {
        return (
            <ChannelItemView
                model={item}
                isFavourite={true}
                navigator={this.props.navigator}
                onFavouritePress={() => {
                    this.props.favouriteRemove(item);
                }}
            />
        );
    }

    render() {
        const {favourites, search, searchChanged} = this.props;

        return (
            <View style={{flex: 1}}>
                <SearchView
                    search={search}
                    onSearchChange={searchChanged}
                />
                <FlatList
                    data={favourites}
                    keyExtractor={(channel: Channel) => channel.id}
                    renderItem={this._renderListItem}
                    style={{flex: 1}}
                    ListEmptyComponent={(<View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 25, marginTop: 50}}>No favourites 😔</Text>
                    </View>)}

                />
            </View>);
    }
}

Favourites.propTypes = {
    list: PropTypes.arrayOf(PropTypes.instanceOf(Channel)),
    search: PropTypes.string.isRequired
};

function filterFavourites(channel: Channel, favourites: Array<String>) {
    return favourites.indexOf(channel.id) !== -1;
}

function createFilterFavourites(favourites: Array<String>) {
    return (channel: Channel) => {
        return filterFavourites(channel, favourites);
    };
}

function createFilterFavouritesWithSearch(favourites: Array<String>, search: String) {
    const searchIndex = search.toLocaleLowerCase();
    return (channel: Channel) => {
        return filterFavourites(channel, favourites) && channel.containsSearch(searchIndex)
    };
}


export default connect(
    (state) => ({
        favourites: state.top.list.filter(
            state.favourites.search.length < 3 ?
                createFilterFavourites(state.favourites.list) :
                createFilterFavouritesWithSearch(state.favourites.list, state.favourites.search)
        ),
        search: state.favourites.search
    }),
    (dispatch) => ({
        favouriteRemove: (channel: Channel) => {
            dispatch(actionChannelFavouriteRemove(channel.id));
        },
        searchChanged: (search: String) => {
            dispatch(actionChannelsFavouritesSearch(search));
        }
    })
)(Favourites);