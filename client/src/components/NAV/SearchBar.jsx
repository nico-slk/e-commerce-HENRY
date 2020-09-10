import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { getSearchedProducts } from "../../Redux/actions/productActions"
import { connect } from "react-redux";

export function SearchBar(props) {
  const [prod, setProd] = useState("");//setea el estado que todavia no definimos
  let history = useHistory()

  return (
    <form className="form-inline ml-auto d-flex flex-row" onSubmit={(e) => {
      history.push('/search')
      e.preventDefault();
      props.getSearchedProducts(prod)
      setProd("");
    }}>
    <input
      type="text"
      placeholder="Buscar..."
      value={prod}
      onChange={e=>setProd(e.target.value)}
      />
    <input className="btn btn-sm btn-outline-info text-info" type="submit" value= "Mostrar"/>
    </form>
  );
}


function mapStateToProps(state) {
  return {
      searchedProducts: state.searchedProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getSearchedProducts: keyword => dispatch(getSearchedProducts(keyword)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);



/*import React, {useState} from 'react';
// import styles from "./SearchBar.module.css";
export default function SearchBar({onSearch}) {
  const [prod, setProd] = useState("");//setea el estado que todavia no definimos
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(prod);
      setProd("");//vacia el placeholder
    }}>
    <input //className={styles.input}
      type="text"
      placeholder="Buscar..."
      value={prod}
      onChange={e=>setProd(e.target.value)}
      />
    <input //className={styles.boton}
      type="submit"
      value= "Mostrar"
    />
    </form>
  );
}
*/
