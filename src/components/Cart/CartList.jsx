import { CartItem } from './CartItem';

function CartList(props) {
    const {
        order,
        handleCartShow = Function.prototype,
        removeFromCart = Function.prototype,
        decQuantity = Function.prototype,
        incQuantity = Function.prototype,
    } = props;

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);

    return (
        <ul class="collection basket-list">
            <li class="collection-item active">Корзина</li>
            {order.length ? (
                order.map((item) => (
                    <CartItem
                        key={item.id}
                        {...item}
                        removeFromCart={removeFromCart}
                        decQuantity={decQuantity}
                        incQuantity={incQuantity}
                    />
                ))
            ) : (
                <li class="collection-item">Корзина пуста</li>
            )}
            <li class="collection-item active">
                Общая стоимость: {totalPrice} руб
            </li>
            <li class="collection-item active">
                <button className='btn' >Оформить заказ</button>
            </li>
            <i
                className="material-icons basket-close"
                onClick={() => handleCartShow()}
            >
                close
            </i>
        </ul>
    );
}

export { CartList };
