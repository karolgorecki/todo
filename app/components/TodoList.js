import React, {Component, PropTypes} from 'react';
import styles from './TodoList.css';

export default class AddTodo extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            taskName: ""
        };
    }

    changeHandler(e) {
        this.setState({
            taskName: e.target.value
        });
    }

    submitHandler(e) {
        if (e.which != 13) {
            return;
        }

        alert('Adding todo: ' + e.target.value);

        this.setState({
            taskName: ''
        })
    }
    render() {

        return (
            <div className={styles.root}>
                <h1>Todo list component</h1>
                <input
                    type="text"
                    value={this.state.taskName}
                    placeholder="Task name"
                    onChange={::this.changeHandler} 
                    onKeyDown={::this.submitHandler} />
            </div>
        );
    }
}