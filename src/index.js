import {mapValues, get, isPlainObject} from 'lodash';

const generateWithChillout = (functions, initialState = {}) => {

    const reducer = (state = initialState, action) => {
        const currentFunc = get(functions, action.type);
        try {
            const newValues = currentFunc(state, action);
            return isPlainObject(newValues)
                ? {...state, ...newValues}
                : newValues;

        } catch (e) {
            return state;
        }
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
