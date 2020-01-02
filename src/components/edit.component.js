import React, {Component} from 'react';
import Select from 'react-select';
import Validator from './../utils/validator';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeOs = this.onChangeOs.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            os: '',
            type: '',
            description: '',
            errors: {},
            selectedOption: null,
            selectedTypeOption: null,
        };

        this.osOption = [
            {value: 'ios', label: 'iOS'},
            {value: 'android', label: 'Android'},
            {value: 'windows', label: 'Windows'}
        ];

        this.typeOption = [
            {value: 'store', label: 'Store'},
            {value: 'inhouse', label: 'InHouse'}
        ];

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
                    os: response.data.os,
                    type: response.data.type,
                    description: response.data.description
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

    onChangeOs(selectedOption) {
        this.setState({os: selectedOption.value});
    }

    onChangeType(selectedTypeOption) {
        this.setState({type: selectedTypeOption.value});
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: this.validator.validate(this.state),
        });
        if (this.validator.isValid) {
            const obj = {
                name: this.state.name,
                os: this.state.os,
                type: this.state.type,
                description: this.state.description
            };
            console.log(obj);
            axios.post('http://localhost:4000/persons/update/' + this.props.match.params.id, obj)
                .then(res => console.log(res.data));

            this.props.history.push('/index');
        }
    }

    render() {
        const {errors} = this.state;
        const {selectedOption} = this.state;
        const {selectedTypeOption} = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Update Application Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="select1">OS</label>
                        <div className="col-md-9">
                            <Select
                                name="os"
                                autoFocus={true}
                                value={this.osOption.filter(({value}) => value === this.state.os)}
                                onChange={this.onChangeOs}
                                options={this.osOption}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="select1">Type</label>
                        <div className="col-md-9">
                            <Select
                                name="type"
                                autoFocus={true}
                                value={this.typeOption.filter(({value}) => value === this.state.type)}
                                onChange={this.onChangeType}
                                options={this.typeOption}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Name <span className="text-danger">*</span></label>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   id="inputEmail3"
                                   name="name"
                                   value={this.state.name}
                                   placeholder="Application Name. Max 191 chars"
                                   onChange={this.onChangeName}
                            />
                            {errors.name &&
                            <div className="invalid-feedback" style={{display: 'block'}}>{errors.name}</div>}

                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputDescription"
                               className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                            <input type="text"
                                   name="description"
                                   value={this.state.description}
                                   className="form-control"
                                   onChange={this.onChangeDescription}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Update Application Info"
                               className="btn btn-primary"
                               onClick={this.onSubmit}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
