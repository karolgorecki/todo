import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/TodoActions';
import {bindActionCreators} from 'redux';

import TodoList from '../components/TodoList';

@connect(state => ({
    todos: state.todos
}))
export default class TodoApp extends Component {
    static propTypes = {
        todos: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    render() {
        const {todos: {todos}, dispatch} = this.props;
        const actions = bindActionCreators(TodoActions, dispatch);

        return (
            <div>
                <TodoList  actions={actions}/>
            </div>
        );
    }
}