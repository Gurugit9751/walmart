import React from "react";
import { Link } from "react-router-dom";
import { MoreDetailsURL, ImgSrcURL } from "./config";
class MoreDetails extends React.Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <div id="DetailListParentContainer">
                <div id="detailHeaderContainer">Detailed list of the product.</div>
                <div id="detailBodyContainer">
                    <DetailContent SelectItemId={id} />
                </div>
                <div id="detailFooterContainer">©Copyrights reserved 2019@itcinfotech.com....</div>
            </div>
        );
    }
}
class DetailContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: props.lodingStatus,
            items: []
        }
    }
    componentDidMount() {
        let url = MoreDetailsURL + this.props.SelectItemId;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoaded: true,
                    item: res
                });
            }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    }
    render() {
        const { error, isLoaded, item } = this.state;
        if (error) {
            return <div className="fetchError">Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div className="fecthLoading"></div>;
        }
        else {
            return (
                <div>
                    <div className="detailflex-container">
                        <div className="detailflex-leftsidecontainer">
                            <img className="detailimgCls" alt="ThamnailImage" src={ImgSrcURL + item.productImage} />
                        </div>
                        <div className="detailflex-rightsidecontainer">
                            <div>
                                <div className="detailitemPrice">{item.price}</div>
                                <div className="detailitemName">{item.productName}</div>
                            </div>
                            <div>
                                <div className="itemRateHeading">Rating & Reviews </div>
                                <div className="itemRating"> {item.reviewRating.toPrecision(2).toString()}<b> *</b></div>
                                <div className="itemRatingTxt">& {item.reviewCount} reviews </div>
                                <div dangerouslySetInnerHTML={{ __html: item.shortDescription }} />
                                <div dangerouslySetInnerHTML={{ __html: item.longDescription }} />
                            </div>
                        </div>
                        
                    </div>
                    <Link className="detailmnuclass" to="/">Back</Link>
                </div>
            );
        }
    }
}
export default MoreDetails;