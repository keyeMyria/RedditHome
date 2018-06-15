import { Navigation } from 'react-native-navigation';

import ChannelsDetails from './channels/details';
import ChannelsFavourites from './channels/favourites';
import ChannelsTop from './channels/top';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('channels.details', () => ChannelsDetails, store, Provider);
    Navigation.registerComponent('channels.favourites', () => ChannelsFavourites, store, Provider);
    Navigation.registerComponent('channels.top', () => ChannelsTop, store, Provider);
}