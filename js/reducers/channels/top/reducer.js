import initialState from './initialState';

import {
    CHANNELS_TOP_FETCH_STARTED,
    CHANNELS_TOP_FETCH_SC,
    CHANNELS_TOP_NEXT_SC,
    CHANNELS_TOP_SEARCH_CHANGED
} from '../../../constants';

export default function (state = initialState, {type, data}) {
    switch (type) {
        case CHANNELS_TOP_FETCH_STARTED:
            return {...state, fetching: data.fetching};
        case CHANNELS_TOP_FETCH_SC:
            return {...state, list: data.list, fetching: false};
        case CHANNELS_TOP_NEXT_SC:
            return {...state, list: [...state.list, ...data.list]};
        case CHANNELS_TOP_SEARCH_CHANGED:
            return {...state, search: data.search};
        default:
            return state;
    };
}