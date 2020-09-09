import React, { Component } from 'react';
import httpUrls from '../../http-urls';

import Order from '../../components/Order/Order';

import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Orders.css';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axiosInstance.get(httpUrls.getOrdersURL)
            .then(orders => {
                const fetchedOrders = [];

                for (let key in orders.data) {
                    fetchedOrders.push({
                        ...orders.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div className={classes.Orders}>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosInstance);