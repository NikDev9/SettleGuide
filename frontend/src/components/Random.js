import React, {Component} from 'react';
import axios from 'axios';

export default class Random extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/users/')
        .then(res => {
            this.setState({
                data: res.data
            })
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <h1>Hi</h1>
            </div>
        )
    }
}