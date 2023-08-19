import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import "../css/history-page.css";

const HistoryTable = () => {
    const data = [
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "George",
            date: "19/08/2023",
            towards_away: "away",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Job",
            lead_name: "Scott",
            date: "19/08/2023",
            towards_away: "away",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
        {
            id: 1, // key "id" matches `accessorKey` in ColumnDef down below
            act_name: "Career",
            lead_name: "John",
            date: "19/08/2023",
            towards_away: "towards",
            action: "",
        },
    ];

    // accessor will be the name defined inside dataset
    const columns = useMemo(() => [
        {
            header: "Number",
            accessorKey: "id",
        },
        {
            header: "Name ACT Matrix",
            accessorKey: "act_name",
        },
        {
            header: "Lead Member",
            accessorKey: "lead_name",
        },
        {
            header: "Date",
            accessorKey: "date",
        },
        {
            header: "Towards/Away",
            accessorKey: "towards_away",
        },
        {
            header: "Action",
            accessorKey: "action",
        },
    ]);
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection //enable some features
            enableColumnOrdering
            enableGlobalFilter={true} //turn off a feature
            muiTableHeadCellProps={{
                //simple styling with the `sx` prop, works just like a style prop in this example
                sx: {
                    fontWeight: 600,
                    fontSize: "16px",
                },
            }}
            muiTableBodyProps={{
                sx: {
                    "& tr:nth-of-type(odd)": {
                        backgroundColor: "#F7F6FE",
                    },
                },
            }}
        />
    );
};
export default HistoryTable;
