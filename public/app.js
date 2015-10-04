class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    markDone(){
        this.props.done = !this.props.done;

        let data = {
            "name": this.props.children,
            "done": this.props.done
        }


        let parent = this.props.parent;

        $.ajax({
          type: "PUT",
          url: "http://localhost:8000/tasks/" + this.props.id,
          data: JSON.stringify(data),
          success: (d)=>{
            parent.getTasks();
          },
          dataType: "JSON"
        });
    }
    render() {
        return(
        <span>
            <small>#{this.props.id}</small><br/>
            <strong className="taskName" onClick={this.markDone.bind(this)}>{this.props.children}</strong>
        </span>)
    }
}

class Tasks extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let taskNodes = this.props.data.map((tsk)=>{
            if (tsk.done && this.props.hideDone){
                let cross = {
                    display: 'none'
                };
                return (
                    <p style={cross}>
                        <Task done={true} parent={this.props.parent} id={tsk.id}>{tsk.name}</Task>
                    </p>)
            } else if (tsk.done){
                let cross = {
                    textDecoration: 'line-through',
                    color: '#aaa'
                };
                return (
                    <p style={cross}>
                        <Task done={true} parent={this.props.parent} id={tsk.id}>{tsk.name}</Task>
                    </p>)
            } 
            else {
                return (
                    <p>
                        <Task done={false} parent={this.props.parent} id={tsk.id}>{tsk.name}</Task>
                    </p>)
            }
        });

        return (
            <div>My tasks:
                {taskNodes}
            </div>)
    }
}
class TaskApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tasks: [], hideDone: false}
        this.getTasks();
    }
    getTasks() {
        let tasks = [];
        let self = this;
        $.get( "http://localhost:8000/tasks", (data)=> {
            for (let i = data.length - 1; i >= 0; i--) {
                tasks.push(data[i]);
            };
            self.setState({tasks: tasks});
        });

    }
    Callback() {
        this.setState({hideDone: !this.state.hideDone})
    }
    render() {
        return (
        <div>
            <Tasks parent={this} data={this.state.tasks} hideDone={this.state.hideDone}/>
            <Filter onc={this.Callback} wat={this} hideDone={this.state.hideDone}/>
            <AddNew parent={this}/>
        </div>)
    }
}

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div ref="foo">
                Hide done tasks
                <input checked={this.props.hideDone}
                       value={this.props.hideDone} 
                       ref="hideDone"
                       onChange={this.props.onc.bind(this.props.wat)}
                       type="checkbox"/>
            </div>)
    }
}

class AddNew extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div> Add new task
                <input ref="newtsk" type="text" />
                <button onClick={this.CreateNewTask.bind(this)}>Add</button>
            </div>
            )
    }

    CreateNewTask() {
        let inp = React.findDOMNode(this.refs.newtsk);

        if (inp.value.trim() == "") {
            alert("Can't create task with empty name");
            return
        }

        let data = {};
        let parent = this.props.parent;

        data["name"] = inp.value;

        $.ajax({
          type: "POST",
          url: "http://localhost:8000/tasks",
          data: JSON.stringify(data),
          success: (d)=>{
            parent.getTasks();
          },
          dataType: "JSON"
        });

        inp.value = "";

        
    }
}

React.render(<TaskApp/>, document.getElementById("content"));