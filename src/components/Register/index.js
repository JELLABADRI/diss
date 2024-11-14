import { Component } from "react"

class Register extends Component{
    state={name:"",password:""}
    user=event => {
        this.setState({name:event.target.value})
    }
    pass = event => {
        this.setState({password:event.target.value})
    }
    subm= async event => {
        event.preventDefault();
        const {name,password}=this.state
        const url="https://oscowlbackend.onrender.com/register"
        const userDetails={name,password}
        const options={method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(userDetails),
        }
        const response=await fetch(url,options)
        if(response.ok){
            console.log(response)
            const {history}=this.props
            history.replace("/login")
            console.log("success")
        }
        else{
            const {history}=this.props
            history.replace("/register")
            console.log("register failed")
        }
    }

    render() {
        const {name,password}=this.state

        return (
            <div className="maincon">
              <form onSubmit={this.subm}>
                    <input onChange={this.user} type="text" value={name}></input>
                    <input onChange={this.pass} type="password" value={password}></input>
                    <button type="submit">Submit</button>
              </form>
            </div>
        )
    }
}
export default Register