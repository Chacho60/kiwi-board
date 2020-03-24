import React, { Component } from 'react'
import {Draggable} from 'react-beautiful-dnd'
class Card extends Component{

    constructor(props){
        super(props);
    
        this.state = {
            descHidden: false,
        };
    
        this.handleExpand = this.handleExpand.bind(this);
    
    }

    handleExpand(){
        this.setState({
            descHidden: !this.state.descHidden
        })
    }

    render(){
        const completionStyle = {
            width: this.props.completion + "%",
            backgroundColor: this.props.priority,
            border: "2px solid " + this.props.priority
        }

        const priorityStyle = {
            borderLeft: "6px solid "+ this.props.priority
        }

        var detailStyle, expandStyle;

        if(this.state.descHidden){
            detailStyle = "Card-details"
        }else{
            detailStyle = "Card-details-hidden"
        }


        return(
            <Draggable draggableId={this.props.id} index={this.props.index}>
                {provided => (
                    <div className="Card-draggable" ref={provided.innerRef} {...provided.draggableProps}>
                        <div className="Card" style={priorityStyle} >
                            <div className="Card-title" {...provided.dragHandleProps} onClick={e => this.handleExpand(e)}>
                                <div className="Card-title-description">{this.props.title}</div>
                            </div>
                            <div className={detailStyle}>
                                <div className="Card-details-description">{this.props.description}</div>
                            </div>
                            <div className="Card-footer">
                                <div className="Card-priority">
                                    <div className="Card-priority-completion" style={completionStyle}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

        );
    }
}

export default Card