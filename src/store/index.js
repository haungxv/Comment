import Vuex from 'vuex';

import sign from './modules/sign'
import user from './modules/user'


export default () => {
    return new Vuex.Store({
        modules: {
            sign,
            user,
        }
    })
};