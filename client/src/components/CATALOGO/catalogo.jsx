import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { getSearchedProducts, getAllProducts, getCategoryProducts } from "../../Redux/actions/productActions"
import { getGuestCart, getCart } from "../../Redux/actions/cartActions"
import { getAllCategories } from "../../Redux/actions/categoriesActions"
import { connect } from "react-redux";

export const Catalogo = ({ getCart, getGuestCart, categories, products, getAllProducts, getCategoryProducts, cart, sessionUser }) => {
    useEffect(() => {
        //
        if (sessionUser.id) getCart(sessionUser.id)
        else getGuestCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>

            <div className="row justify-content-center">
                {
                    products.length > 0 ?
                        products.map((e) => (
                            <ProductCard
                                cart={cart}
                                dataProduct={e}
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                price={e.price}
                                stock={e.stock}
                                image={e.images[1].url}
                            />
                        ))
                        : <>
                            <ProductCard
                                id={-1}
                                name={'No se han encontrado productos que coincidan con su búsqueda.'}
                                image={'https://cronicaglobal.elespanol.com/uploads/s1/32/73/32/0/wally.jpeg'}
                            />
                        </>
                }
            </div>
        </div>);
};

function mapStateToProps(state) {
    return {
        categories: state.categories.categories,
        products: state.products.products,
        cart: state.cart.cart,
        sessionUser: state.session.sessionUser,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllProducts: () => dispatch(getAllProducts()),
        getSearchedProducts: keyword => dispatch(getSearchedProducts(keyword)),
        getCategoryProducts: category => dispatch(getCategoryProducts(category)),
        getAllCategories: () => dispatch(getAllCategories()),
        getCart: (userId) => dispatch(getCart(userId)),
        getGuestCart: () => dispatch(getGuestCart()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalogo);
