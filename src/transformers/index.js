import ArrayTransformer from './ArrayTransformer';
import ActionReducerTransformer from './ActionReducerTransformer';
import NoopTransformer from './NoopTransformer';

let registeredTransformers = [ActionReducerTransformer, ArrayTransformer, NoopTransformer];

const isValidTransformer = () => true;

const addTransformer = transformer => {
    if(isValidTransformer(transformer)) {
        registeredTransformers = [transformer, ...registeredTransformers];
    }
}

export {
    addTransformer,
    registeredTransformers,
}
