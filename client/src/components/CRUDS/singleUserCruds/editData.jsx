import React from 'react';
import { Link } from "react-router-dom";
import { editUser } from "../../../Redux/actions/userActions";
import { connect } from 'react-redux';
import swal from 'sweetalert';


export class EditData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.sessionUser.id,
            email: props.sessionUser.email,
            first_name: props.sessionUser.first_name,
            last_name: props.sessionUser.last_name,
            address: props.sessionUser.address,
            locality: props.sessionUser.locality,
            state: props.sessionUser.state,
            password: "",
            repeatPassword: "",
            admin: props.sessionUser.admin,
            securityQuestion: props.sessionUser.securityQuestion,
            securityAnswer: props.sessionUser.securityAnswer,
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    error = () => {
        swal({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "warning",
            dangerMode: true,
            timer: "4000"
        })
    }

    complete() {
        swal({
            title: "Completado",
            text: "El cambio de perfil ha sido exitoso",
            icon: "success",
            timer: "4000",
        })
        setTimeout(() => window.location = "/Profile", 4000)
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        const editUser = this.state;
        if (this.state.password === this.state.repeatPassword) {
            this.props.editUser(editUser)
                .then(res => {
                    console.info(res)
                    this.complete()
                }).catch(err => console.error(err))
        } else {
            this.error()
        }
    }

    render() {
        return (
            <div className="container abs-center">
                <form onSubmit={this.handleSubmit} className="form-group">
                    <h1 className="text-center">EDITAR PERFIL</h1>
                    <div className="container d-flex">
                    <div className="mx-4">
                        <div className="form-group">
                            <label>Nuevo correo:</label>
                            <input type="email" id="email" name="email" onChange={this.handleChange} className="form-control" value={this.state.email} required />
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" id="first_name" name="first_name" onChange={this.handleChange} className="form-control" value={this.state.first_name} required />
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input type="text" id="last_name" name="last_name" onChange={this.handleChange} className="form-control" value={this.state.last_name} required />
                        </div>
                        <div className="form-group">
                            <label>Dirección:</label>
                            <input type="text" id="address" name="address" onChange={this.handleChange} className="form-control" value={this.state.address} required />
                        </div>
                        <div className="form-group">
                            <label>Localidad:</label>
                            <input type="text" id="locality" name="locality" onChange={this.handleChange} className="form-control" value={this.state.locality} required />
                        </div>
                    </div>
                    <div className="mx-4">
                        <div className="form-group">
                            <label>Provincia/Estado:</label>
                            <input type="text" id="state" name="state" onChange={this.handleChange} className="form-control" value={this.state.state} required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:*</label>
                            <input type="password" id="password" name="password" onChange={this.handleChange} className="form-control" value={this.state.password} />
                        </div>
                        <div className="form-group">
                            <label>Repetir contraseña:*</label>
                            <input type="password" id="repeatPassword" name="repeatPassword" onChange={this.handleChange} className="form-control" value={this.state.repeatPassword}  />
                        </div>
                        <div className="form-group">
                            <label>Pregunta de seguridad:</label>
                            <input type="text" id="securityQuestion" name="securityQuestion" onChange={this.handleChange} className="form-control" value={this.state.securityQuestion} required />
                        </div>
                        <div className="form-group">
                            <label>Respuesta de seguridad:</label>
                            <input type="text" id="securityAnswer" name="securityAnswer" onChange={this.handleChange} className="form-control" value={this.state.securityAnswer} required />
                        </div>
                    </div>
                    </div>
                    <div className="container d-flex">
                        <div>
                            <button type="submit" className="btn btn-warning mx-2">Editar</button>
                        </div>
                        <div>
                            <Link to="/Profile">
                                <button type="button" className="btn btn-warning mx-2" >Volver</button>
                            </Link>
                        </div>
                    </div>
                   
                </form>
            </div>
        )

    }
}



// function mapDispatchToProps(dispatch) {
//     return {
//         editUser: sessionUser => dispatch(editUser(sessionUser)),
//     };
// }
// export default connect(
//     null,
//     mapDispatchToProps
// )(withRouter(EditData))

//

function mapStateToProps(state) {
    return {
        sessionUser: state.session.sessionUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editUser: sessionUser => dispatch(editUser(sessionUser)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditData);
