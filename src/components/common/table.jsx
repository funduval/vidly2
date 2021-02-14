import React, { Component } from 'react';
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = (props) => {
    const { columns, sortColumn, onSort, data } = props;
    console.log("columns in Table itself", columns)
    return (
        <table className="table">
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody
                data={data}
                columns={columns}
            />
        </table>
    );
}

export default Table;