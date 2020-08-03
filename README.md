# Redux Chillout
Generate actions and reducers based on whatever(transformers).
Designed for remove vanilla redux boilerplate code. 

# Instalation

```javascript
npm install redux-chillout redux@4.0.4 react-redux@7.1.3
```  

Create your chillout file
```javascript
import {generateChillout} from 'redux-chillout';

const [LinkedActions, reducer, Types] = generateChillout({
    fetchValues: null,
    setValue: ['value'],
    addValue: state => ({amount: state.amount + 1}),
    removeValue: (state, action) => ({amount: state.amount - action.amount}),
}, {
    amount: 0 // Initial state
});

export {Types};
export {LinkedActions};
export default reducer;

```

Create store

```javascript
import {createStore as createChilloutStore} from 'redux-chillout';

const store = createChilloutStore(rootReducer);
```

# Linked Actions

It's not necessary to dispatch your actions, because redux-chillout LinkedActions has been linked with your store, so yo can execute it anywhere.

Normal Redux:

```javascript
dispatch(LinkedActions.setValue(0));
dispatch(LinkedActions.removeValue({amount: 10}));
```

Redux Chillout:

```javascript
LinkedActions.setValue(0);
LinkedActions.removeValue({amount: 10});
```


# Transformers

Redux chillout recognize your transformer type and generate an action and a action-reducer based on it.

- **NoopTransformer:**
Create a empty action 

```javascript
	fetchValues: null
```

- **ArrayTransformer:**
Use it for setters

```javascript
	setValue: ['value'],
	setUser: ['name', 'id', 'password'],
```

- **ActionReducerTransformer:** Action Reducer is a small reducer for a simple action. In case of a plain object state, not need the typical spread operator for merge.

```javascript
	removeValue: (state, action) => ({/*...state, unnecessary */ amount: state.amount - action.amount}),
```

# Custom Transformers

You can create your own transformers.
```javascript
	class MyTransformer = {
    	static checkType(transformer, actionType) {
        	return transformer === 'clearAll';
        }
        static getActionReducer(transformer, actionType) {
        	return (state, action) => ({});
        }
        static getAction(transformer, actionType) {
        	return (...params) => ({type: actionType})
        }
    }

	addTransformer(myTransformer);
    console.log(registeredTransformers); // -> show registered transformers
```


# Example app

https://github.com/AlanSaracho/eth-wallet

