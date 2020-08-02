import {isArray, zipObject} from 'lodash';

class NoopTransformer {

    static checkType(transformer, actionName) {
        return transformer === undefined || transformer === null;
    }

    static getActionReducer(transformer, actionName) {
        return (state, action) => state;
    }

    static getAction(transformer, actionName) {
        return () => ({type: actionName});
    }
}

export default NoopTransformer;
