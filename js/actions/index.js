import axios from 'axios';

import {
    CHANNELS_TOP_FETCH_SC,
    CHANNELS_TOP_NEXT_SC,
    CHANNELS_TOP_FETCH_STARTED,
    CHANNEL_FAVOURITE_TOOGLE,
    CHANNEL_FAVOURITE_REMOVE,
    CHANNELS_TOP_SEARCH_CHANGED,
    CHANNELS_FAVOURITE_SEARCH_CHANGED
} from '../constants';

import Channel from "../models/Channel";

function createAction(type, data) {
    return {type, data};
}

function parseChannelsResponse(response) : Array<Channel> {
    const result = [];
    response.data.data.children.forEach((it) => {
        let thumbUrl;
        if (it.data.thumbnail.startsWith('http://') || it.data.thumbnail.startsWith('https://')) {
            thumbUrl = it.data.thumbnail;
        } else if (it.data.preview) {
            thumbUrl = it.data.preview.images[0].resolutions[0].url;
        }
        result.push(new Channel(it.data.id, it.data.name, it.data.title, false, thumbUrl, it.data.url));
    });
    return result;
}

const host = 'https://www.reddit.com'
const pageSize = 25;

export function actionChannelsTopFetch() {
    return (dispatch) => {
        dispatch(createAction(CHANNELS_TOP_FETCH_STARTED, {fetching: true}));

        return axios.get(`${host}/top.json?redditWebClient=mweb2x&raw_json=1&count=${pageSize}`)
            .then(parseChannelsResponse)
            .then((channels: Array<Channel>) => {
                dispatch(createAction(CHANNELS_TOP_FETCH_SC, {list: channels}));
            })

    };
}

export function actionChannelsTopNext(after: Channel) {
    return (dispatch) => {
        return axios.get(`${host}/top.json?redditWebClient=mweb2x&raw_json=1&count=${pageSize}&after=${after.name}`)
            .then(parseChannelsResponse)
            .then((channels: Array<Channel>) => {
                dispatch(createAction(CHANNELS_TOP_NEXT_SC, {list: channels}));
            })
    };
}

export function actionChannelFavouriteToogle(channelId: String) {
    return createAction(CHANNEL_FAVOURITE_TOOGLE, {channelId});
}

export function actionChannelFavouriteRemove(channelId: String) {
    return createAction(CHANNEL_FAVOURITE_REMOVE, {channelId});
}

export function actionChannelsTopSearch(search: String) {
    return createAction(CHANNELS_TOP_SEARCH_CHANGED, {search});
}

export function actionChannelsFavouritesSearch(search: String) {
    return createAction(CHANNELS_FAVOURITE_SEARCH_CHANGED, {search});
}