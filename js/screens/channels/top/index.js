import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {
    Text,
    View,
    FlatList,
    TextInput
} from 'react-native';

import {
    actionChannelsTopFetch,
    actionChannelsTopNext,
    actionChannelFavouriteToogle,
    actionChannelsTopSearch
} from '../../../actions';

import ChannelItemView from '../../../components/ChannelItemView';
import SearchView from '../../../components/SearchView';

import Channel from "../../../models/Channel";

class Top extends React.Component {
    componentWillMount() {
        this.props.fetch();
    }

    _next = () => {
        const last = this.props.list[this.props.list.length - 1];
        this.props.next(last);
    }

    _renderListItem = ({item}: { item: Channel }) => {
        return (
            <ChannelItemView
                model={item}
                isFavourite={item.isFavourite}
                navigator={this.props.navigator}
                onFavouritePress={() => {
                    this.props.favouriteToggle(item);
                }}
            />
        );
    }

    render() {
        const {list, fetching, search, searchChanged} = this.props;

        return (
            <View>
                <SearchView
                    search={search}
                    onSearchChange={searchChanged}
                />
                <FlatList
                    data={list}
                    keyExtractor={(channel: Channel) => channel.id}
                    renderItem={this._renderListItem}
                    onRefresh={this.props.fetch}
                    refreshing={fetching}
                    onEndReached={search.length < 3 && this._next}
                    ListEmptyComponent={(<View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 25, marginTop: 50}}>{fetching ? 'Loading...' : 'No posts'}</Text>
                    </View>)}
                />
            </View>);
    }
}

Top.propTypes = {
    list: PropTypes.arrayOf(PropTypes.instanceOf(Channel)),
    fetching: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
};

function filterForSearch(list: Array<Channel>, search: String) {
    if (search.length < 3) {
        return list;
    } else {
        const searchIndex = search.toLocaleLowerCase();
        return list.filter((channel: Channel) => {
            return channel.containsSearch(searchIndex);
        });
    }
}

export default connect(
    (state) => ({
        list: filterForSearch(state.top.list, state.top.search).map((channel: Channel) => {
            channel.isFavourite = state.favourites.list.indexOf(channel.id) !== -1;
            return channel;
        }),
        fetching: state.top.fetching,
        search: state.top.search
    }),
    (dispatch) => ({
        fetch: () => {
            dispatch(actionChannelsTopFetch());
        },
        next: (after) => {
            dispatch(actionChannelsTopNext(after));
        },
        favouriteToggle: (channel: Channel) => {
            dispatch(actionChannelFavouriteToogle(channel.id));
        },
        searchChanged: (search: String) => {
            dispatch(actionChannelsTopSearch(search));
        }
    })
)(Top);

