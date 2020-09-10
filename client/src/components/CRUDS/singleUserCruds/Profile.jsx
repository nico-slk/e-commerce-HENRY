import React from 'react';
import { Link } from "react-router-dom";
import { sessionLogin, sessionLogout, toProfile } from "../../../Redux/actions/sessionActions"
import { connect } from "react-redux";


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        // const userId = this.props.sessionUser.id
        // this.props.toProfile()
        console.log(this.props.sessionUser)
        this.props.toProfile()

        // this.isAuthenticated = this.isAuthenticated.bind(this)
        // this.isAuthenticated()
    }

    // isAuthenticated(){
    //     if(this.props.sessionUser.id) return
    //     else {window.location = "/"}
    // }



    render() {
        return (

            <div className="container mt-4">
                <h2 className='card-title text-justify'>Hola! {this.props.sessionUser.first_name}, este es tu perfil.</h2>
                <h4 className='lead'>Aca podés editar tus datos, verificar el estado de tus compras, ver tus opiniones.</h4>
                <div class="btn-group" role="group" aria-label="Grupo de Botones">
                            <Link to={`/Profile/${this.props.sessionUser.id}/editdata`} className="btn btn-sm btn-warning mx-2">Editar Mis Datos</Link>
                            <Link to={`/Profile/${this.props.sessionUser.id}/purchasestate`} className="btn btn-sm btn-warning mx-2">Productos Comprados</Link>
                            <Link to={`/Profile/${this.props.sessionUser.id}/OrderTableByUser`} className="btn btn-sm btn-warning mx-2">Ordenes de Compra</Link>
                            <Link to={`/Profile/${this.props.sessionUser.id}/myreviews`} className="btn btn-sm btn-warning mx-2">Mis Opiniones</Link>
                            {this.props.sessionUser.admin ? <Link to="/Admin/CrudUser" className="btn btn-sm btn-warning mx-2">Admin Cruds</Link> : <></>}
                </div>
            </div>
        )
    };

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
        toProfile: () => dispatch(toProfile())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
