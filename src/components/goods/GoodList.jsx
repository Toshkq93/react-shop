import { GoodItem } from './GoodItem';

function GoodList(props) {
    const { goods = [], addToBasket = Function.prototype } = props;

    if (!goods.length) {
        return <h3>Not Found here</h3>;
    }
    
    return (
        <div className="goods">
            {goods.map((item) => {
                return (
                    <GoodItem
                        key={item.mainId}
                        {...item}
                        addToBasket={addToBasket}
                    />
                );
            })}
        </div>
    );
}

export { GoodList };
