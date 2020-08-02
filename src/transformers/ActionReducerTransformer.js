import {isFunction} from 'lodash';

class ActionReducerTransformer {

    static checkType(transformer, actionName) {
        return isFunction(transformer);
    }

    static getActionReducer(transformer, actionName) {
        return transformer;
    }

    static getAction(transformer, actionName) {
        return params => ({
            type: actionName,
            ...params
        });
    }
}

export default ActionReducerTransformer;
