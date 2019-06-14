import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './filter.css';
import './thambanilview.css';
import './moredetails.css';
import HomeLayout from "./HomeLayout";
import MoreDetails from "./moredetails.js";
var Menus = [
    {
        id: 1,
        title: "Home",
        component: HomeLayout,
        path: "/",
    },
    {
        id: 2,
        title: "MoreDetails",
        component: MoreDetails,
        path: "/moredetails/:id",
    }
];
class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        {Menus.map(i => <Route key={i.id} path={i.path} exact component={i.component}></Route>)}
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}
export default App;
