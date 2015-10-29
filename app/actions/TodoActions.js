import * as actionType from '../constants/ActionTypes';

export function addTodo(name) {
    return {
        type: actionType.ADD_TODO,
        name
    };
}