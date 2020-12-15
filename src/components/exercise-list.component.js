import React, { Component } from 'react'
import axios from 'axios'
import { link } from 'react-router-dom'

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
    render() {
        return (
            <div>
                3 
            </div>
        )
    }
}
