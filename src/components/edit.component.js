import React, {Component} from 'react';
import Validator from './../utils/validator';
import axios from 'axios';

export default class Edit extends Component {
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
            }
        ];
        this.validator = new Validator(rules);
    }


    componentDidMount() {
        axios.get('http://localhost:4000/persons/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    company: response.data.company,
                    address: response.data.address,
                    age: response.data.age
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: this.validator.validate(this.state),
        });
        console.log('Update');
        console.log(this.validator);
        console.log(this.state);
        if (this.validator.isValid) {
            const obj = {
                name: this.state.name,
                company: this.state.company,
                address: this.state.address,
                age: this.state.age
            };
            axios.post('http://localhost:4000/persons/update/' + this.props.match.params.id, obj)
                .then(res => console.log(res.data));

            this.props.history.push('/index');
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Update Person Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name <span>*</span>: </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                        {errors.name &&
                        <div className="invalid-feedback" style={{display: 'block'}}>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label>Company Name: </label>
                        <input type="text"
                               name="company"
                               className="form-control"
                               value={this.state.company}
                               onChange={this.onChangeCompany}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.address}
                               onChange={this.onChangeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.age}
                               onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Update Person Info"
                               className="btn btn-primary"
                               onClick={this.onSubmit}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
