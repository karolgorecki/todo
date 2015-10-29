import * as actionType from '../constants/ActionTypes';
const initialState = {
    todos: [],
    show: "" 
};

export default function todos(state = initialState, action) {
    switch (action.type) {
        case actionType.ADD_TODO:
            return {
                todos: state.todos.concat(action.name),
                show: state.show
            };
        default:
            return state;
    }
}