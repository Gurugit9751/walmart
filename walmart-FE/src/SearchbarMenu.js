import React, { Component } from 'react'
import {FilterMenus} from "./config";
class SearchbarMenu extends Component {
    render() {
        return (
            <div className='SearchBarConatainer flex-containerSearch'>
                {FilterMenus.map(i =>
                    <div key={i.id} >
                        <div className="searchText">{i.title}</div>
                        <div className="searchiconParent">
                            <div className="searchUpArrow" sortid={i.max} onClick={() => this.props.sortCB("min",i.sortfield)}></div>
                            <div className="searchDownArrow" sortid={i.min} onClick={() => this.props.sortCB("max",i.sortfield)}></div>
                        </div>
                    </div>
                )}                
            </div>
        )
    }
}
export default SearchbarMenu;

