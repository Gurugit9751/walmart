import React from "react";
import List from "./ThambnailView.js";
import SearchbarMenu from "./SearchbarMenu";
import UserSearchMenu from "./usersearch";
import { sortAscending, sortDescending, UserFilterQuery } from "./util";
class HomeLayout extends React.Component {
    render() {
        return (
            <div id="searchParentContainer">
                <Header />
                <BodyContent />
                <Footer />
            </div>
        );
    }
}
class Header extends React.Component {
    render() {
        return (
            <div id="searchHeaderContainer">Walmart Product List
            </div>
        );
    }
}
class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lodingStatus: false
        }
    }
    sortCB = (sortOrder, field) => {
        const data = JSON.parse(JSON.stringify(this.data));
        if (sortOrder === "max") {
            this.UiData.products = sortAscending(data.products, field);
            this.setState({ rerender: new Date().getTime(), lodingStatus: true })
        } else if (sortOrder === "min") {
            this.UiData.products = sortDescending(data.products, field);
            this.setState({ rerender: new Date().getTime(), lodingStatus: true })
        } else if (sortOrder === "user") {
            this.setState({ lodingStatus: false }, () => {
                UserFilterQuery(field)
                    .then(success => {
                        this.UiData.products = success;
                        this.setState({ rerender: new Date().getTime(), lodingStatus: true });
                    });
            });
        }
    }
    render() {
        return (
            <div id="searchBodyContainer">
                <div id="SearchParentContainer">
                    <SearchbarMenu sortCB={this.sortCB} />
                    <UserSearchMenu sortCB={this.sortCB} />
                </div>
                <List sendDataCB={(data) => {
                    this.UiData = JSON.parse(JSON.stringify(data))
                    this.data = data;
                }} data={this.UiData} lodingStatus={this.state.lodingStatus} />
            </div>
        );
    }
}
class Footer extends React.Component {
    render() {
        return (
            <div id="searchFooterContainer">©Copyrights reserved 2019@itcinfotech.com....</div>
        );
    }
}
export default HomeLayout;