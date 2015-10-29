import React, {Component} from 'react';
import {combineReducers,createStore} from 'redux';
import {Provider} from 'react-redux';

import TodoApp from './TodoApp';
import * as todoReducer  from '../reducers';

const reducer = combineReducers(todoReducer);
const store = createStore(reducer);

import {addTodo} from '../actions/TodoActions';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <TodoApp/>
                </Provider>
            </div>
        );
    }
}