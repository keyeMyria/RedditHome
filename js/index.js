
import { Provider } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { registerScreens } from './screens';

import store from './store';

registerScreens(store, Provider);

async function prepareIcons() {
    const icons = await Promise.all([
        Icon.getImageSource('sort', 30),
        Icon.getImageSource('star', 30),
    ]);
    const [top, heart] = icons;
    return { top, heart };
}

async function startApp() {
    const icons = await prepareIcons();

    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Top',
                screen: 'channels.top',
                icon: icons.top,
                title: 'Reddit Top'
            },
            {
                label: 'Favourites',
                screen: 'channels.favourites',
                icon: icons.heart,
                title: 'Reddit My Favourites'
            }
        ],
        appStyle: {
            keepStyleAcrossPush: false
        }
    });
}

startApp();