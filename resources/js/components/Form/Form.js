import React, { Component } from 'react';

import './Form.scss';

class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputs: [],
            valid: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.closeError = this.closeError.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);

    }

    componentDidMount(){
        const {children} = this.props;
        let inputs = []
        children.map(child => {
            inputs.push({
                name: child.props.name,
                value: '',
                valid: child.props.validation? false: true
            })
        });
        this.setState({
            inputs: inputs
        })
    }

    handleOnBlur(inputInfo){
        const {inputs} = this.state;
        inputs[inputInfo.key].value = inputInfo.value;
        inputs[inputInfo.key].valid = inputInfo.valid;
        this.setState({
            inputs: inputs
        });
    }

    renderChildren(){
        const {children} = this.props;
        if (!children) return;
        return React.Children.map(children, (c, i) => {
            return React.cloneElement(c, {
                iterationNum: i,
                onBlur: this.handleOnBlur
            });
        });
    }

    onSubmit(e){
        e.preventDefault();
        const { inputs } = this.state;
        for (var i = 0; i < inputs.length; i++) {
            if(inputs[i].valid === false){
                this.setState({
                    valid: false
                })
                return;
            }
        }
        this.props.sendForm(inputs);
    }

    closeError(){
        this.setState({
            valid: true
        })
    }

    render(){
        const { valid } = this.state;
        return(
            <form action={this.props.action} method={this.props.method} autoComplete="off" onSubmit={this.onSubmit}>
            {valid? '':
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> One of your input fields is invalid
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeError}>
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
        }
        { this.renderChildren() }
        <button type="submit" className="btn btn-primary">{this.props.btnText? this.props.btnText: 'Submit'}</button>
        </form>
    )
}
}

class Input extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: '',
            valid: false
        }

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onBlur(e){
        const checkValidation = validate(event.target.value, this.props.validation);
        let valid;
        if(checkValidation === true){
            valid = true;
            this.setState({
                valid: true,
                validFeedback: null
            })
        } else {
            valid = false;
            this.setState({
                valid: false,
                validFeedback: checkValidation
            })
        }

        this.props.onBlur({
            key: this.props.iterationNum,
            value: event.target.value,
            name: this.props.name,
            valid: valid
        });
    }

    onChange(e){
        this.setState({
            value: e.target.value
        })
    }

    render(){
        const { valid, validFeedback} = this.state;
        return(
            <div className="form-group">
            <label>{this.props.label}</label>
            <input
            className={`form-control ${validFeedback ? 'is-invalid': '' }`}
            type={this.props.type? this.props.type: 'text'}
            name={this.props.name}
            autoComplete="new-password"
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.value}
            />
            {
                !valid?
                <div className="invalid-feedback">
                {this.props.label} {validFeedback}
                </div>
                : ''
            }
            </div>
        )
    }
}

const validate = (value, validationRules) => {
    let validInput = true;
    if(validationRules){
        const clearString = validationRules.replace(/ /g,'');
        let rulesList = clearString.split(',');
        for (var i = 0; i < rulesList.length; i++) {
            let rule = rulesList[i];
            if(rule.includes(":")){
                rule = rule.split(':');
                var validationRule = rule[1];
                rule = rule[0];
            }
            switch(rule){
                case 'required':
                if(value.length === 0){
                    validInput = ` is required. Please enter a value`;
                }
                break;
                case 'min':
                if(value.length < parseInt(validationRule)){
                    validInput = `must be at least than ${validationRule} long`;
                }
                break;
                case 'max':
                if(value.length > parseInt(validationRule)){
                    validInput = `must be at less than ${validationRule} long`;
                }
                break;
                case 'email':
                    if(!value.match('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')){
                        validInput = `must be a valid email address`;
                    }
                break;
                case 'match':
                    const matchValue = document.getElementsByName(validationRule)[0].value;
                    if(value !== matchValue){
                        validInput = `must be the same as ${validationRule}`;
                    }
                break;
            }
            if(validInput !== true){
                break;
            }
        }
    }
    return validInput;
}


export { Form, Input };
