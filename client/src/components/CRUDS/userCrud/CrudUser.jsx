import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllUsers, deleteUser, editUser } from "../../../Redux/actions/userActions"

class CrudUser extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers()
    }

    handleChange(e) {
        const userId = Number.parseInt(e.target.getAttribute('data-user-id'))
        const user = this.props.users.find(a => a.id === userId)
        console.log(e.target.value, "valor admin")
        user.admin = String(e.target.value) === "Administrador"

        if (window.confirm('Presione Aceptar para confirmar la acción'))
            this.props.editUser(user)
                .then(() => alert('El usuario fue modificado Correctamente'))
                .catch(err => alert(`Error: ${err}`))
    }

    handleClick(e) {
        const usuarioId = e.target.getAttribute("data-usuarioId")
        if (window.confirm('Presione Aceptar para eliminar usuario')) {
            this.props.deleteUser(usuarioId)
                .then(() => alert('El usuario fue eliminado Correctamente'))
                .catch(err => alert(`Error: ${err}`))
        }
    }


    render() {
        const adminOptions = ["Administrador", "Usuario"]
        return (
            <div className="container mt-4">
                <Link to="CrudUser/form/new" className="btn btn-success">Nuevo</Link>
                <h2 className="col-11 text-center">Edición de Usuarios</h2>
                <table className="table table-hover">
                    <thead className="text-center">
                        <tr>
                            <th>Usuario</th>
                            <th>Promover</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.props.users.map((user) => (
                            <tr key={user.id}>
                                <td>{`${user.first_name} ${user.last_name}`}</td>
                                <td>
                                    <select name='admin' className="form-control-sm chosen-select" data-user-id={user.id} value={user.admin ? adminOptions[0]: adminOptions[1]} onChange={this.handleChange}>
                                        {
                                            adminOptions.map((o) => (
                                                <option key={o} value={o}>{o}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td><Link
                                    to={{
                                        pathname: `/Admin/CrudUser/${user.id}/edit`,
                                        state: { user: user }
                                    }}
                                    className="btn btn-success">Editar</Link></td>
                                <td><button onClick={this.handleClick} className="btn btn-danger" data-usuarioId={user.id} >Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/Profile">
                    <button type="button" className="btn btn-warning" >Volver</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        deleteUser: (id) => dispatch(deleteUser(id)),
        editUser: (user) => dispatch(editUser(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudUser)
