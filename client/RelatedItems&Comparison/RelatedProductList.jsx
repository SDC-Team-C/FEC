import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ProductCard from './ProductCard.jsx';

class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductIds: [
        17219,
        17810,
        17174,
        18027,
        17419,
        17286,
        17797,
        17126,
        17876,
        17479,
        17255,
        17431
      ],
      liEls: document.querySelectorAll('ul li'),
      index: 0
    }
  }

  componentDidMount() {
    // this.getRelatedProductIds();
  }

  // componentDidUpdate(prevProps) {
  //   const {selectProductId} = this.props;
  //   if (selectProductId !== prevProps.selectProductId) {
  //     this.getRelatedProductIds();
  //   }
  // }

  getRelatedProductIds() {
    const {selectProductId} = this.props;
    axios
      .get(`/products/${selectProductId}/related`)
      .then((response) => {
        // console.log('related', response.data);
        this.setState({
          relatedProductIds: response.data
        });
      })
      .catch((error) => {
        console.log('Get related items failed...', error);
      });
  }

  move (increase) {
    const {index, liEls} = this.state;
    this.setState({
      index: Math.min(Math.max(index + increase,0), liEls.length-1)
    });
    liEls[index].scrollIntoView({behavior: 'smooth'});
  }

  render() {
    const {relatedProductIds} = this.state;
    const {selectProductInfo, selectAnotherProduct} = this.props;
    return (
      <div className="relatedProductList">
        <button className="leftArrow">&lt;</button>
        <div className="carousel">
          <ul style={{display: 'flex', margin: '0', padding: '0', overflow: 'hidden'}}>
            {relatedProductIds.map(productId => (
              <li style={{display: 'block', listStyle: 'none'}}>
                <ProductCard key={productId} selectProductInfo={selectProductInfo} productId={productId} selectAnotherProduct={selectAnotherProduct} />
              </li>
            ))}
          </ul>
        </div>
        <button className="rightArrow" onClick={(e) => {
          e.preventDefault();
          console.log('go right');
          this.move(1);
        }}>&gt;</button>
      </div>
    );
  }
}

RelatedProductList.propTypes = {
  selectProductId: PropTypes.number.isRequired,
  // productCards: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   category: PropTypes.string,
  //   name: PropTypes.string,
  //   price: PropTypes.string,
  //   starRating: PropTypes.string,
  //   styles: PropTypes.arrayOf(PropTypes.shape({
  //     style_id: PropTypes.number,
  //     name: PropTypes.string,
  //     original_price: PropTypes.string,
  //     sale_price: PropTypes.string,
  //     default: PropTypes.bool,
  //     photos: PropTypes.arrayOf(PropTypes.shape({
  //       thumbnail_url: PropTypes.string,
  //       url: PropTypes.string
  //     }))
  //   })),
  //   features: PropTypes.arrayOf(PropTypes.shape({
  //     feature: PropTypes.string,
  //     value: PropTypes.string
  //   }))
  // })),
  selectProductInfo: PropTypes.shape({
    name: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string
    }))
  }).isRequired,
  selectAnotherProduct: PropTypes.func.isRequired
}

export default RelatedProductList;
