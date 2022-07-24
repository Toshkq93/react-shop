function CartItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromCart = Function.prototype,
        decQuantity = Function.prototype,
        incQuantity = Function.prototype,
    } = props;

    return (
        <li class="collection-item">
            {name} x <i className="material-icons cart-quantity" onClick={() => decQuantity(id)}>remove</i>
            {quantity} <i className="material-icons cart-quantity" onClick={() => incQuantity(id)}>add</i>={' '}
            {price}
            <span href="#!" class="secondary-content">
                <i
                    class="material-icons basket-delete"
                    onClick={() => removeFromCart(id)}
                >
                    close
                </i>
            </span>
        </li>
    );
}

export { CartItem };
