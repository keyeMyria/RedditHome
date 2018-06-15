import initialState from './initialState';

import {
    CHANNEL_FAVOURITE_TOOGLE,
    CHANNEL_FAVOURITE_REMOVE,
    CHANNELS_FAVOURITE_SEARCH_CHANGED
} from '../../../constants';

export default function (state = initialState, {type, data}) {
    switch (type) {
        case CHANNEL_FAVOURITE_TOOGLE:
            if (state.list.indexOf(data.channelId) === -1) {
                return {...state, list: [...state.list, data.channelId]};
            } else {
                return {...state, list: state.list.filter((channelId: String) => channelId !== data.channelId)};
            }
        case CHANNEL_FAVOURITE_REMOVE:
            return {...state, list: state.list.filter((channelId: String) => channelId !== data.channelId)};
        case CHANNELS_FAVOURITE_SEARCH_CHANGED:
            return {...state, search: data.search};
    }
    return state;
}