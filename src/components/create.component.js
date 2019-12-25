import React, {Component} from 'react';
import Validator from './../utils/validator';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            company: '',
            address: '',
            age: '',
            errors: {},
        };

        const rules = [
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'The name field is required.',
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{min: 5}],
                validWhen: true,
                message: 'The name must be at least 5 characters.',
            },

        ];
        this.validator = new Validator(rules);
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            company: this.state.company,
            age: this.state.age
        };
        axios.post('http://localhost:4000/persons/add', obj)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            company: '',
            age: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Person</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name: </label>
                        <input type="text" className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name: </label>
                        <input type="text" className="form-control" value={this.state.company}
                               onChange={this.onChangeCompany}/>
                    </div>
                    <div className="form-group">
                        <label>Address Name: </label>
                        <input type="text" className="form-control" value={this.state.address}
                               onChange={this.onChangeAddress}/>
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input type="text" className="form-control" value={this.state.age}
                               onChange={this.onChangeAge}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Person" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
