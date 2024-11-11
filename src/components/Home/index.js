import React, { Component } from "react";
import "./index.css"

class Home extends Component {
    state = {inp:"",
        todoitems: [],
        loading: true,   // Add loading state
        error: null,     // Add error state
    };

    onchan= event => {
         this.setState({inp:event.target.value})
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = async () => {
        const url = "http://localhost:5000/todos";
        try {
            const response = await fetch(url);
            if (!response.ok) {  // Check if response is successful
                throw new Error('Network response was not ok');
            }
            const formatted = await response.json();
            console.log(formatted);
            this.setState({ todoitems: formatted, loading: false });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ error: "Failed to load todos", loading: false });
        }
    };

    submit= async () => {
        const {inp}=this.state;
        const url=`http://localhost:5000/todos`;
        const options={
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({name:inp})
        }
        const response =await fetch(url,options);
        if(response.ok){
            this.setState({inp:""});
            await this.getApi();
        }
        
    }

    delete= async (id) => {
       const url=`http://localhost:5000/todos/${id}`;
       const options={
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
       }
       const response =await fetch(url,options);
       this.getApi();

    }

    render() {
        const { inp,todoitems, loading, error } = this.state;

        return (
            <div>
                <input onChange={this.onchan} type="text" value={inp}/>
                <button onClick={this.submit}>submit</button>
                <h1>Todo List</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ul>
                        {todoitems.length > 0 ? (
                            todoitems.map((todo) => (
                                <li key={todo.id}><div className="row">
                                     <p className="half">{todo.name}</p>
                                     <button onClick={() => {this.delete(todo.id)}} className="mar">delete</button>
                                    </div></li>
                            ))
                        ) : (
                            <li>No todos available</li>
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

export default Home;
