import { Component } from "react";
import Cookies from 'js-cookie'
import "./index.css"
class Profile extends Component{
    state={isname:"false",name:"",changename:"",password:"",ispassword:"false"}
    changename=event => {
        this.setState(prevState => ({isname:!prevState.isname}))
    }
    changepass= event => {
        this.setState(prevState => ({ispassword:!prevState.ispassword}))
    }
    onchangename= event => {
        this.setState({name:event.target.value})
    }
    newname=event => {
        this.setState({changename:event.target.value})
    }
    newpassword=event => {
        this.setState({password:event.target.value})
    }
    namesub = async event => {
        const {name,changename}=this.state
        const url=`http://localhost:5000/todos/profile`;
        const options={
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({name:name,changename})
           }
        const response=await fetch(url,options);
        this.setState({name:"",changename:""})

    }
    passwordsub = async event => {
        const {name,password}=this.state
        const url=`http://localhost:5000/todos/profile`;
        const options={
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({name:name,newpassword:password})
           }
        const response=await fetch(url,options);
        this.setState({name:"",password:""})
    }
    logout= event => {
        Cookies.remove('jwt_token')
        window.location.replace('/login')
    }

    render() {
        const {isname,name,changename,password,ispassword} =this.state
        return (
            <div>
                <div className="end">
                    <button onClick={this.logout}>Log out </button>
                </div>
                <div className="maincon">
                    <div className="row">
                        <button onClick={this.changename}>Change username</button>
                        <button onClick={this.changepass}>Change password</button>
                    </div>
                    <div>
                        {!isname?(<div className="changecon">
                            <input placeholder="current name" onChange={this.onchangename} type="text" value={name}></input>
                            <input placeholder="new name" onChange={this.newname} type="text" value={changename}></input>
                            <button onClick={this.namesub}>Submit</button>

                            </div>
                            ):null}
                    </div>
                    <div>
                        {!ispassword?(
                            <div className="changecon">
                                <input placeholder="current name" onChange={this.onchangename} type="text" value={name}></input>
                                <input placeholder="new password" onChange={this.newpassword} value={password}></input>
                                <button onClick={this.passwordsub}>Submit</button>
                            </div>
                        ):null}
                    </div>

                </div>
           </div>
        )
    }
}
export default Profile