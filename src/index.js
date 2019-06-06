import {mapValues, isFunction, get} from 'lodash';

const generateWithChillout = (functions, initialState = {}) => {

    const reducer = (state = initialState, action) => {
        const currentFunc = get(functions, action.type);
        return isFunction(currentFunc)
            ? {...state, ...currentFunc(state, action)}
            : state;
    };

    const actions = mapValues(
        functions,
        (_, functionName) => params => ({
            type: functionName,
            ...params
        })
    );

    return {reducer, actions};
};

export {
    generateWithChillout
};
