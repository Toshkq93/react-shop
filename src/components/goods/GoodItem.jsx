function GoodItem(props) {
    const {
        mainId: id,
        displayName: name,
        displayDescription: description,
        price : {finalPrice : price},
        addToBasket = Function.prototype,
    } = props;

    const full_background = props['displayAssets'][0].full_background;

    return (
        <div className="card">
            <div className="card-image">
                <img src={full_background} alt={name} />
            </div>
            <div className="card-content">
                <span className="card-title">{name}</span>
                <p>{description}</p>
            </div>
            <div className="card-action">
                <button className="btn" onClick={() => addToBasket({id, name, price})}>
                    Buy
                </button>
                <span className="right" style={{ fontSize: '1.8rem' }}>
                    {price} руб
                </span>
            </div>
        </div>
    );
}

export { GoodItem };
