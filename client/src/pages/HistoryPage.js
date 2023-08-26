import React, { useEffect } from "react";
import "../css/history-page.css";
import { Sidebar } from "react-pro-sidebar";
import SearchBar from "../Components/SearchBar";
import HistoryTable from "../Components/HistoryTable";

const HistoryPage = () => {
    /* TODO: CHANGE HAMBURGER MENU */
    return (
        <div>
            <div id="header">
                <h4>Teamoji</h4>
            </div>
            <div id="title-search">
                <h2>History</h2>
                <SearchBar></SearchBar>
            </div>
            <div id="main-content">
                <HistoryTable></HistoryTable>
            </div>
            <div id="pages"></div>
        </div>
    );
};

export default HistoryPage;
