import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index'

// 创建store
const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
const store = finalCreateStore(reducers, {});

export default store;