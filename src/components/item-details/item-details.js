import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export {
  Record
};
export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
    image: `https://starwars-visualguide.com/assets/img/characters/1.jpg`,
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId || 
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.setState({
        loading: true
      });
      this.updateItem(); 
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId) {
      this.setState({
        loading: false
      });
      return;
    }

    getData(itemId)
      .then(item => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item),
        });
      });
  }

  render() {

    const {loading, item, image} = this.state;

    if (!item) {
      return (
        <div className="item-details card m-0">
          <span>Select a item from a list</span>
        </div>
      );
    }

    const items = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { item });
    });

    const content = item && !loading ?  <ItemDetailsView name={item.name} items={items} image={image}/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
      <ErrorBoundry>
        <div className="item-details card m-0">
          {content}
          {spinner}
        </div>
      </ErrorBoundry>
    );
  }
};

const ItemDetailsView = ({name, items, image}) => {

  return (
    <>
      <img className="item-image"
          src={image} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            items
          }
        </ul>
        <ErrorButton/>
      </div>
    </>
  );
};