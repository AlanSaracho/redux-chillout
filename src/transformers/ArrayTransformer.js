import {isArray, zipObject} from 'lodash';

class ArrayTransformer {

    static checkType(transformer, actionName) {
        return isArray(transformer);
    }

    static getActionReducer(transformer, actionName) {
        return (state, action) => {
            const newState = {...state, ...action};
            delete newState.type;
            return newState;
        }
    }

    static getAction(transformer, actionName) {
        return (...params) => ({
            type: actionName,
            ...zipObject(transformer, params)
        });
    }
}

export default ArrayTransformer;
