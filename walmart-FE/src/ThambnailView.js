import React from "react";
import {Link } from "react-router-dom";
import { queryURL,ImgSrcURL } from "./config";
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: props.lodingStatus,
            items: { products: [] }
        }
    }
    componentWillReceiveProps(nextprops) {
        this.setState({
            isLoaded: nextprops.lodingStatus,
            items: nextprops.data
        })
    }
    componentDidMount() {
        if (!this.props.data) {
            let url = queryURL;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        isLoaded: true,
                        items: res
                    }, () => { this.props.sendDataCB(res) });
                }).catch(error => {
                    this.setState({
                        isLoaded: true,
                        error
                    }, () => { this.props.sendDataCB([]) });
                })
        }
        else {
            this.setState({
                isLoaded: true,
                items: this.props.data
            });
        }
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div className="fetchError">Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div className="fecthLoading"></div>;
        }
        else if (items.products.length === 0) {
            return <div className="noResults">No Search Results found.</div>;
        }
        else {
            return (
                <div className="flex-container">
                    {items.products.map((item, index) => {
                        return <div key={index} >
                            <img className="imgCls" alt="ThamnailImage" src={ImgSrcURL + item.productImage} />
                            <div className="itemPrice">{item.price}</div>
                            <div className="itemName">{item.productName}</div>
                            <div>
                                <div className="itemRateHeading">Rating & Reviews </div>
                                <div className="itemRating"> {item.reviewRating.toPrecision(2).toString()}<b> *</b></div>
                                <div className="itemRatingTxt">& {item.reviewCount} reviews </div>
                            </div>
                            <Link className="mnuclass" to={`/moredetails/${item.productId}`}>More</Link>
                        </div>
                    })}
                </div>
            );
        }
    }
}
export default List;