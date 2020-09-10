import React from 'react';
import { connect } from 'react-redux';
import { getAllOrders, getOrdersByStatus, editOrder } from "../../Redux/actions/orderActions";
import { sendEmail } from "../../Redux/actions/cartActions"
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');



class OrderTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal14: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        this.props.getAllOrders();
    }

    handleChange(e) {
        const orderId = Number.parseInt(e.target.getAttribute('data-order-id'))
        const order = this.props.orders.find(o => o.id === orderId)
        order.orderStatus = e.target.value
        const orderEmail = e.target.getAttribute('order-email')


        this.props.sendEmail(orderEmail, order.orderStatus)

        this.props.editOrder(order)
            .then(() => alert('El estado de la orden fue modificado.'))
            .catch(err => alert(`Error: ${err}`))
    }

    render() {
        const estadosOptions = ["carrito", "creada", "procesando", "cancelada", "completa"]
        return (
            <div className="container mt-4 table-responsive">
                <h2 className="col-11 text-center mb-2">Lista de Ordenes</h2>
              <div className="btn-group d-flex justify-content-center mb-4" role="group" aria-label="Grupo de Botones">
                <button className="btn btn-sm btn-primary mx-1" onClick={()=> this.props.getAllOrders()}>Todas</button>
        {estadosOptions.map((e, i) => <button name={e} className="btn btn-sm btn-primary mx-1" key={e+i} onClick={e => this.props.getOrdersByStatus(e.target.getAttribute('name'))}>{e}</button>)}
                </div>
                <table className="table table-hover">
                    {this.props.orders.length > 0 ? <thead className="text-center font-weight-bold text-info border border-secondary bg-dark">
                        <tr> 

                            <th>Nro de Orden</th>
                            <th>Status</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Total</th>
                            <th>Editar Estado</th>
                            <th>Ver</th>
                        </tr>
                    </thead> : <h2 className="text-center">No se encontraron órdenes que cumplan con esta condición</h2>}
                    <tbody className="border border-info">
                        {this.props.orders.map(order => (
                            <tr  key={order.id}>
                                <td className="text-center border border-info">{order.id}</td>
                                <td className="text-center border border-info">{order.orderStatus}</td>
                                <td className="text-center border border-info">{order.user.first_name}</td>
                                <td className="text-center border border-info">{order.user.last_name}</td>
                                <td className="text-center border border-info">{order.user.email}</td>
                                <td className="text-center border border-info">{order.checkoutDate ? moment(order.checkoutDate).format('l') : "-" }</td>
								<td className="text-center border border-info">{order.checkoutDate ? moment(order.checkoutDate).format('LT') : "-" }</td>

                                {order.orderLines.length > 0 ? <td className="border border-info">${order.orderLines.map(e => e.quantity * e.product.price).reduce((a, b) => a + b)}</td> : <td className="border border-info">$0</td>}
                                <td className="border border-info">

                                    <select name='orderStatus' className = "form-control-sm chosen-select" order-email={order.user.email} data-order-id={order.id} value={order.orderStatus.toLowerCase()} onChange={this.handleChange}>
                                        {
                                            estadosOptions.map((o) => (
                                                <option key={o} value={o}>{o}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td className="border border-info">

                                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#order${order.id}`} >Detalles</button>


                                    <div className="modal fade" id={'order' + order.id} role="dialog">
                                        <div className="modal-dialog">


                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <table>
                                                        <thead className="text-center">
                                                            <tr>
                                                                <th>Nombre del producto</th>
                                                                <th>Cantidad</th>
                                                                <th>Precio</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        {order.orderLines.map((g) => (
                                                            <tr>
                                                                <td>{g.product.name}</td>
                                                                <td>{g.quantity}</td>
                                                                <td>$ {g.product.price}</td>
                                                                <td>$ {g.product.price * g.quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </table>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )

    }
}


function mapStateToProps(state) {
    return {
        orders: state.orders.orders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllOrders: () => dispatch(getAllOrders()),
        getOrdersByStatus: (status) => dispatch(getOrdersByStatus(status)),
        editOrder: (order) => dispatch(editOrder(order)),
        sendEmail: (email, tipo) => dispatch(sendEmail(email, tipo)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderTable);
