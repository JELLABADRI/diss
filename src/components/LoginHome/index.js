import React, { Component } from "react";
import Cookies from 'js-cookie'
import {Link} from "react-router-dom"
import "./index.css"

const status=["done","pending","in progress","completed"];
class LoginHome extends Component {
    state = {inp:"",statusval:"",
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
        const {inp,statusval}=this.state;
        const url=`http://localhost:5000/todos`;
        const options={
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({name:inp,status:statusval})
        }
        const response =await fetch(url,options);
        if(response.ok){
            const newTodo = await response.json();
            this.setState((prevState) => ({ todoitems: [...prevState.todoitems, newTodo],inp: "" }));
        }
        
    }

    delete= async (id) => {
       const url=`http://localhost:5000/todos/${id}`;
       const options={
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
       }
       const response =await fetch(url,options);
       if(response.ok){
        await this.getApi();
       }

    }
    stachan = async (val,id) => {
        console.log("in statchange")
        const url=`http://localhost:5000/todos/${id}`;
        const options={
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({status:val})
           }
           const response =await fetch(url,options);
           if(response.ok){
            await this.getApi();
           }

    }
    logout= event => {
        Cookies.remove('jwt_token')
        window.location.replace('/login')
    }
    dropchange= event => {
        this.setState({statusval:event.target.value});
       

    }


    render() {
        const { statusval,inp,todoitems, loading, error } = this.state;

        return (
            <div>
                <div className="profile">
                    <Link to="/todos/profile">
                        <button>Profile</button>
                    </Link>
                    <button onClick={this.logout}>Log out</button>
                </div>
             <div className="maincon">
                <div className="pro">

                    <h1>Todo List</h1>

                 </div>
                 <div className="row">
                    <input onChange={this.onchan} type="text" value={inp}/>
                    <select value={statusval} onChange={this.dropchange}>
                        {status.map(each => <option value={each}>{each}</option>)}

                    </select>
                 </div>
                    <button onClick={this.submit}>submit</button>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ul>
                            {todoitems.length > 0 ? (
                                todoitems.map((todo) => (
                                    <li key={todo.id}><div className="row">
                                        <p className="drop title">{todo.name}</p>
                                        <select className="drop" onChange={(event) => this.stachan(event.target.value,todo.id)} value={todo.status}>
                                            {status.map(each => <option key={each.id} value={each}>{each}</option>)}
                                        </select>
                                        <button onClick={() => {this.delete(todo.id)}} className="mar">delete</button>
                                        </div></li>
                                ))
                            ) : (
                                <li>No todos available</li>
                            )}
                        </ul>
                    )}
                </div>
           </div>
        );
    }
}

export default LoginHome;
