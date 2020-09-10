import React from 'react';
// import { useHistory } from "react-router-dom";
import { sessionLogin, sessionLogout, sendForgotMail} from "../../../Redux/actions/sessionActions"
import { connect } from "react-redux";
import swal from 'sweetalert';


export class PasswordForgot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange(e) {
        this.setState({email: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('estado', this.state)
        this.props.sendForgotMail(this.state)
        swal("", `Se ha enviado un mail a "${this.state.email}" con las instrucciónes. Recuerde revisar en la carpeta de Spam`, "success");
    }

        render() {
        return (

        <div className="d-flex border border-secondary m-auto m-0 shadow p-3 mb-5 bg-white rounded m-50 d-flex flex-column align-items-center" >
            <h3 className="card-title display-4">Ingresa el mail de tu cuenta.</h3>
            <form onSubmit={this.handleSubmit} className="form-group ">
                <div className="form-group">
                    <label className="lead">Mail:</label>
                    <input type="text" id="email" name="email" onChange={this.handleChange} className="form-control" value={this.state.email} placeholder={'email@ejemplo.com'}/>
                </div>

            <button type="submit" className="btn btn-dark lead" >Enviar</button>
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
        sessionLogout: () => dispatch(sessionLogout()),
        sendForgotMail: (email) => dispatch(sendForgotMail(email)),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordForgot);
