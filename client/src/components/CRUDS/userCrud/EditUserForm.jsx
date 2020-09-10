import React from 'react';
import {editUser} from "../../../Redux/actions/userActions"
import {connect} from "react-redux"
import { withRouter } from "react-router"

export class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.user.id,
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            address: props.user.address,
            locality: props.user.locality,
            state: props.user.state,
            password: props.user.password,
            admin: props.user.admin,
            securityQuestion: props.user.securityQuestion,
            securityAnswer: props.user.securityAnswer,
        }
        this.users = props.listUsers;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    comparePws() {/*
      if (!this.state.password || !this.state.repeatPassword) {
          alert('Por favor complete los campos (*)')
      }
      if (this.state.password !== this.state.repeatPassword && this.state.admin !== true) {
          alert('Las contraseñas no coinciden')
          return false;
        } else {
            if (this.state.password !== this.state.password && this.state.admin !== true) {
                alert('La contraseña es incorrecta')
                return false;
            } else {
                return true;
            }
        }*/
    }

    handleSubmit(e) {
        e.preventDefault();
        const editUser = this.state;
          this.props.editUser(editUser)
              .then(res => {
                  console.info(res)
                  window.location = "/Admin/CrudUser";
                  alert("El usuario se edito correctamente")
              }).catch(err => console.error(err))
          }

    render() {
        return (
            <div className="container-fluid abs-center">
                <form onSubmit={this.handleSubmit} className="form-group">
                    <div className="form-group">
                        <label>Nuevo correo:</label>
                        <input type="email" id="email" name="email" onChange={this.handleChange} className="form-control" value={this.state.email} required/>
                    </div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" id="first_name" name="first_name" onChange={this.handleChange} className="form-control" value={this.state.first_name} required/>
                    </div>
                    <div className="form-group">
                        <label>Apellido:</label>
                        <input type="text" id="last_name" name="last_name" onChange={this.handleChange} className="form-control" value={this.state.last_name} required />
                    </div>
                    <div className="form-group">
                        <label>Dirección:</label>
                        <input type="text" id="address" name="address" onChange={this.handleChange} className="form-control" value={this.state.address} required/>
                    </div>
                    <div className="form-group">
                        <label>Localidad:</label>
                        <input type="text" id="locality" name="locality" onChange={this.handleChange} className="form-control" value={this.state.locality} required />
                    </div>
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
                        <input type="password" id="repeatPassword" name="repeatPassword" onChange={this.handleChange} className="form-control" value={this.state.repeatPassword} />
                    </div>
                    <div className="form-group">
                        <label>Pregunta de seguridad:</label>
                        <input type="text" id="securityQuestion" name="securityQuestion" onChange={this.handleChange} className="form-control" value={this.state.securityQuestion} required />
                    </div>
                    <div className="form-group">
                        <label>Respuesta de seguridad:</label>
                        <input type="text" id="securityAnswer" name="securityAnswer" onChange={this.handleChange} className="form-control" value={this.state.securityAnswer} required />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-warning">Editar</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    editUser: user => dispatch(editUser(user)),
  };
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(EditUser))
