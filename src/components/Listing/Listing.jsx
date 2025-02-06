import PropTypes from 'prop-types'

export const Listing = ({ items }) => {

    const getPrice = (price, currency_code) => {
        const currency = {
            USD: '$',
            EUR: '€',
        }

        return currency[currency_code] ? `${currency[currency_code]}${price}` : `${price}${currency_code}`
    }

    const getTitle = (title) => {
        if (title.length < 50) return title;
        return `${title.slice(0, 50)}...`
    }

    const getQuantity = (quantity) => {
        if (quantity <= 10) {
            return 'level-low'
        } else if (quantity > 10 && quantity <= 20) {
            return 'level-medium'
        } else {
            return 'level-high'
        }
    }

    return (
    <div className="item-list">
        {items.map((item) => {  
            if (!item.title) return;
            else return (
            <div className="item" key={item.listing_id}>
                <div className="item-image">
                    <a href={item.url}>
                        <img src={item.MainImage.url_570xN}/>
                    </a>
                </div>
                <div className="item-details">
                    <p className="item-title">{getTitle(item.title)}</p>
                    <p className="item-price">{getPrice(item.price, item.currency_code)}</p>
                    <p className={`item-quantity ${getQuantity(item.quantity)}`}>{item.quantity}</p>
                </div>
            </div>
            )}
        )}

    </div>
    )
}

Listing.propTypes = {
    items: PropTypes.array.isRequired,
}
