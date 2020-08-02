import {connect} from 'react-redux';
import {createStore as createReduxStore} from 'redux';
import {
    pick, keys, mapValues, mapKeys, find,
    get, isPlainObject, toUpper, snakeCase
} from 'lodash';

import store from './store';
import {registeredTransformers} from './transformers';
import NoopTransformer from './transformers/NoopTransformer';

const createStore = (...params) => {
    const storeInstance = createReduxStore(...params);
    setStoreInstance(storeInstance);
    return storeInstance;
}

const setStoreInstance = storeInstance => {
    store.instance = storeInstance;
};

/**
 * Link Component with the store.
 *
 * @deprecated use useSelector instead.
 */
const linkStore = (Component, selectedReducers) => {
    const mapState = state => ({
        store: pick(state, selectedReducers || keys(state))
    });
    return connect(mapState, null)(Component);
};

const linkActions = actions => mapValues(
    actions,
    action => ((...params) => store.instance.dispatch(action(...params)))
);

const findTransformerClass = transformer => find(
    registeredTransformers,
    registeredTransformer => registeredTransformer.checkType(transformer)
);

const getActionReducers = transformers => mapValues(
    transformers,
    (transformer, actionType) => {
        const currentTransformerClass = findTransformerClass(transformer);
        if(currentTransformerClass) {
            return currentTransformerClass.getActionReducer(transformer, actionType);
        } else {
            NoopTransformer.getActionReducer(transformer, functionName);
        }
    }
);

const createReducer = (transformer, initialState) => {
    const actionReducers = getActionReducers(transformer);
    const reducer = (state = initialState, action) => {
        try {
            const executeActionReducer = actionReducers[action.type];
            if(!executeActionReducer) throw new Error();
            const newValues = executeActionReducer(state, action);
            const enableAutoMerge = isPlainObject(newValues);
            return enableAutoMerge
                ? {...state, ...newValues}
                : newValues;

        } catch (e) {
            return state;
        }
    };
    return reducer;
}

const createActions = transformers => mapValues(
    transformers,
    (transformer, functionName) => {
        const currentTransformerClass = findTransformerClass(transformer);
        if(currentTransformerClass) {
            return currentTransformerClass.getAction(transformer, functionName);
        } else {
            NoopTransformer.getAction(transformer, functionName);
        }
    }
);

const createTypes = transformers => {
    const types = mapValues(
        transformers,
        (_, functionName) => functionName
    );

    const typesWithConstFormat = mapKeys(
        types,
        (_, key) => toUpper(snakeCase(key))
    );

    return typesWithConstFormat;
}

const generateChillout = (transformers, initialState = {}) => {
    const reducer = createReducer(transformers, initialState);
    const actions = createActions(transformers);
    const types = createTypes(transformers);
    const linkedActions = linkActions(actions);
    return [linkedActions, reducer, types];
};

export {
    linkActions,
    setStoreInstance,
    generateChillout,
    linkStore,
    createStore
};