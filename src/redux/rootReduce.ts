import { cartMiniSlice } from 'pages/giftRedemptionPage/common/gift.slice';
import { homeSlice } from 'pages/index/common/home.slice';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    homeSlice: homeSlice.reducer,
    cartMini: cartMiniSlice.reducer,
});

export { rootReducer };