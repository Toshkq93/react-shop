import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../../config';
import { Preloader } from './Preloader';
import { GoodList } from '../goods/GoodList';
import { Cart } from '../Cart/Cart';
import { CartList } from '../Cart/CartList';
import { Alert } from './Alert';

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        );

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };

            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((item, index) => {
                if (index === itemIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                } else {
                    return item;
                }
            });

            setOrder(newOrder);
        }

        setAlertName(item.name);
    };

    const removeFromCart = (id) => {
        const newOrder = order.filter((el) => el.id !== id);
        setOrder(newOrder);
    };

    const handleCartShow = () => {
        setBasketShow(!isCartShow);
    };

    const incQuantity = (id) => {
        const newOrder = order.map((el) => {
            if (el.id === id) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            } else {
                return el;
            }
        });

        setOrder(newOrder);
    };

    const decQuantity = (id) => {
        const newOrder = order.map((el) => {
            if (el.id === id) {
                const newQuantity = el.quantity - 1;

                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        });

        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(!loading);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="container content">
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
            <Cart quantity={order.length} handleCartShow={handleCartShow} />
            {loading ? (
                <Preloader />
            ) : (
                <GoodList goods={goods} addToBasket={addToBasket} />
            )}
            {isCartShow && (
                <CartList
                    order={order}
                    handleCartShow={handleCartShow}
                    removeFromCart={removeFromCart}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
        </main>
    );
}

export { Shop };
