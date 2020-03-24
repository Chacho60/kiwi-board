import React, { Component } from 'react'
import Column from './Column.jsx'

class Stage extends Component{
    
    render(){
        let stageName = this.props.stageName;
        return(
            <div className="Stage" {...this.props} ref={this.props.innerRef}>
                <div className="Stage-title">Stage</div>
                <div className="Stage-columns">
                    <Column colName="Column1" stageName={stageName}/>
                    <Column colName="Column2" stageName={stageName}/>
                </div>
            </div>
        );
    }
}

export default Stage