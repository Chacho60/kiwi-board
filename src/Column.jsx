import React, { Component } from 'react'
import Card from './Card.jsx'
import {Droppable} from 'react-beautiful-dnd'

class Column extends Component{
    render(){
        return(
                    <div className="Column" ref={this.props.innerRef}>
                        <div className="Column-title">{this.props.colName}</div>
                        <Droppable droppableId={this.props.colName} type="Column">
                            {provided => (
                                <div className="Column-cards" ref={provided.innerRef} {...provided.droppableProps}>
                                    {this.props.cards.map((card, index) => {
                                        return <Card 
                                                id={card.id} 
                                                priority={card.color} 
                                                completion={card.completed} 
                                                index={card.index} 
                                                title={card.title} 
                                                description={card.description}
                                                />
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <i className="mdi mdi-plus Column-add-icon"></i>
                    </div>
        );
    }
}

export default Column