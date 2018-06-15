import { combineReducers } from 'redux';

import favourites from './channels/favourites/reducer';
import top from './channels/top/reducer';

export default combineReducers({
    favourites,
    top
});