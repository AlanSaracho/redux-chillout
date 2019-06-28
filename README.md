# Redux Chillout
Generate actions and reducers based on mini reducers functions.
Designed for remove vanilla redux boilerplate code. 

# Usage

```javascript
npm install redux-chillout
```

Example
```javascript
import {generateChillout} from 'redux-chillout';

const {actions, reducer} = generateChillout({
    addValue: state => ({amount: state.amount + 1}),
    removeValue: (state, action}) => ({amount: state.amount - action.amount}),
}, {
    amount: 0 // Initial state
});

export {actions};
export default reducer;

```

# Automatic state merge

if you use a plain object state, not need the typical spread operator for merge. It's like the setState in React.

```javascript

const addValue = state => ({/*...state, unnecessary */ value: state.value + 1})

```
