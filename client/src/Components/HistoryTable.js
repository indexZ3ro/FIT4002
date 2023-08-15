import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import "../css/history-page.css";
import fakeData from "../MOCK_DATA.json";

const HistoryTable = () => {
    const data = useMemo(() => fakeData, []);

    const COLUMNS = [
        {
            Header: "Number",
            accessor: "id",
        },
        {
            Header: "Name ACT Matrix",
            accessor: "first_name",
        },
        {
            Header: "Lead Member",
            accessor: "last_name",
        },
        {
            Header: "Date",
            accessor: "email",
        },
        {
            Header: "Towards/Away",
            accessor: "gender",
        },
        {
            Header: "Action",
            accessor: "university",
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="tableContainer">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default HistoryTable;
