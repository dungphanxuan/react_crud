import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from "react-router-dom";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {persons: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/applications')
            .then(response => {
                console.log(response.data);
                this.setState({persons: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Application List</h3>
                <Link to={'/create'} className="btn btn-primary">Create new</Link>
                <table className="table table-striped table-bordered table-hover" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Identifier</th>
                        <th>OS</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}
