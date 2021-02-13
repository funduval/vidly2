import React from 'react';
import { PropType } from 'prop-types';

const ListGroup = (props) => {
    const { items } = props;
    return (
        <ul className="list-group">
            {items.map(item => <li key={item._id} className="list-group-item">{item.name}</li>)}

        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"

}

export default ListGroup;