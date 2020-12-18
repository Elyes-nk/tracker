import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const User = props => (
    <tr>
    <th>{props.user.username}</th>
    <th> <Link to={"/edit/"+props.user._id}>Edit</Link> | <a href="#" onClick={() => props.DeleteUser(props.user._id)}>Delete</a></th>
</tr>
)
export default class UserList extends Component {
    constructor(props){
        super(props);

        this.DeleteUser = this.DeleteUser.bind(this);
        this.state = { users: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length >0){
                this.setState({ users: response.data });
            }
        })
        .catch(err => console.log('Error: ' + err));
    }

    DeleteUser(id) {
        axios.delete('http://localhost:5000/users/'+id)
        .then(res => console.log(res.data))
        .catch(err => 'Error:'+ err)
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.users.map(us => {
            return <User user={ us } DeleteUser={this.DeleteUser} key={us._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
