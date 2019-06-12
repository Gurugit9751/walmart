import React from "react";
import { SearchInputMenus } from "./config";
var checkBoxConfig = {
    id: 1,
    type: "checkbox",
    filterName: "stock",
    name: "inStock"
}
class UserSearchMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    change = (e) => {
        e.preventDefault();
        this.setState({ [e.currentTarget.name]: e.currentTarget.value }, () => { this.props.sortCB("user", this.state) });
    }
    checkBoxhandleChange = name => e => {
        this.setState({ [name]: e.target.checked }, () => { this.props.sortCB("user", this.state) });
    };
    render() {
        return (
            <div className="userSearchContainer">
                {SearchInputMenus.map(i =>
                    <input placeholder={i.title} key={i.id} type={i.type} name={i.name} onChange={(e) => this.change(e)} value={this.state[i.name]} />
                )}
                <input key={checkBoxConfig.id} type={checkBoxConfig.type} name={checkBoxConfig.name} onChange={this.checkBoxhandleChange(checkBoxConfig.name)} />
            </div>
        );
    }
}
export default UserSearchMenu;