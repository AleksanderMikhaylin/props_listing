import React from 'react';

// Интерфейс для элемента массива items
interface Item {
  listing_id: string;
  title: string;
  url: string;
  MainImage: {
    url_570xN: string;
  };
  price: string;
  currency_code: string;
  quantity: number;
}

// Интерфейс для пропсов компонента Listing
interface ListingProps {
  items: Item[];
}

export const Listing: React.FC<ListingProps> = ({ items }) => {
  // Функция для форматирования цены
  const getPrice = (price: string, currency_code: string) => {
    const currency = {
      USD: '$',
      EUR: '€',
    };

    return currency[currency_code] ? `${currency[currency_code]}${price}` : `${price} ${currency_code}`;
  };

  // Функция для обрезки заголовка
  const getTitle = (title: string) => {
    if (title.length < 50) return title;
    return `${title.slice(0, 50)}...`;
  };

  // Функция для определения уровня количества
  const getQuantity = (quantity: number) => {
    if (quantity <= 10) {
      return 'level-low';
    } else if (quantity > 10 && quantity <= 20) {
      return 'level-medium';
    } else {
      return 'level-high';
    }
  };

  return (
    <div className="item-list">
      {items.map((item) => {
        if (!item.title) return null;
        return (
          <div className="item" key={item.listing_id}>
            <div className="item-image">
              <a href={item.url}>
                <img src={item.MainImage.url_570xN} alt={item.title} />
              </a>
            </div>
            <div className="item-details">
              <p className="item-title">{getTitle(item.title)}</p>
              <p className="item-price">{getPrice(item.price, item.currency_code)}</p>
              <p className={`item-quantity ${getQuantity(item.quantity)}`}>{item.quantity}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
