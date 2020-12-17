import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Exercise = props => (
    <tr>
    <th>{props.exercise.username}</th>
    <th>{props.exercise.description}</th>
    <th>{props.exercise.duration}</th>
    <th>{props.exercise.date.substring(0,10)}</th>
    <th> <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => props.DeleteExercise(props.exercise._id)}>Delete</a></th>
</tr>
)
export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.DeleteExercise = this.DeleteExercise.bind(this);
        this.state = { exercises: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            if (response.data.length >0){
                this.setState({ exercises: response.data });
            }
        })
        .catch(err => console.log('Error: ' + err));
    }

    DeleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res => console.log(res.data))
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(ex => {
            return <Exercise exercise={ ex } DeleteExercise={this.DeleteExercise} key={ex._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
