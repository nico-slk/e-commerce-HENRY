import React from 'react';
// import { useHistory } from "react-router-dom";
import { sessionLogin, sessionLogout } from "../../../Redux/actions/sessionActions"
import { connect } from "react-redux";


export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // let history = useHistory();

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sessionLogin(this.state)
        .then(() => {
            alert("enviado")})
            this.setState({email:"", password:""})
        // history.push('/Admin')
    }

        render() {
        return (

        <div className="d-flex border border-secondary m-auto m-0 shadow p-3 mb-5 bg-white rounded m-50 d-flex flex-column align-items-center" >
            <h3 class="card-title display-4">Inicia sesión para mejorar tu experiencia!</h3>
            <form onSubmit={this.handleSubmit} className="form-group ">
                <div className="form-group">
                    <label class="lead">Mail:</label>
                    <input type="text" id="email" name="email" onChange={this.handleChange} className="form-control" value={this.state.email} placeholder={'email@ejemplo.com'}/>
                </div>
                <div className="form-group">
                    <label class="lead">Contraseña:</label>
                    <input type="password" id="password" name="password" onChange={this.handleChange} className="form-control" value={this.state.password} placeholder={'contraseña'}/>
                </div>
                <button type="submit" className="btn btn-dark lead" >Enviar</button>
                <div class="dropdown-divider"></div>
                {/* <a class="dropdown-item lead btn" >Olvidaste tu contraseña?</a> */}
            </form>
        </div>
        )};
    
}

function mapStateToProps(state) {
    return {
        sessionUser: state.session.sessionUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sessionLogin: user => dispatch(sessionLogin(user)),
        sessionLogout: () => dispatch(sessionLogout())
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
