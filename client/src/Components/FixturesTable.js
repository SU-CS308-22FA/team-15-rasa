import React, {useMemo} from 'react';
import {useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import {GlobalFilter} from './GlobalFilter';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const FixCOLUMNS = [
    {
        Header: 'Home Team',
        accessor: 'homeTeam'
    },
    {
        Header: 'Scores',
        columns : [
            {      
                accessor: 'scoreHome'
            },
            {
                accessor: 'scoreAway'
            },
        ]
    },
    {
        Header: 'Away Team',
        accessor: 'awayTeam'
    },    
    {
        Header: 'Date',
        columns:[
            {
                accessor: 'matchTime'
            },
            {
                accessor: 'matchYear'
            },
            {
                accessor: 'matchStatus'
            }
        ]       
    },
]

export const FixturesTable = () => {
    const [fixtures, setFixtures] = useState([]);  
    useEffect(() => {
        axios.get("/api/v1/", {
            params: {
                _collection: "fixture",
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            if (res && res.status === 200 && res.data.items.length > 0) {     
                const fix = res.data.items;
                fix.forEach((row, index) => {
                    fix[index].matchTime = moment.unix(row.matchTime).format("DD/MM/YYYY HH:mm");
                     
                })           
                setFixtures(res.data.items);
            }
        });
    }, []);

    
    const columns = useMemo(() => FixCOLUMNS, [])
    const tableInstance = useTable({
        columns: columns,
        data: fixtures
    }, useGlobalFilter,
        useSortBy, usePagination)
    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, canNextPage, canPreviousPage, previousPage, prepareRow, state, setGlobalFilter } = tableInstance
    const { globalFilter } = state
    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table{...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? '▴' : '▾') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody{...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr{...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <br></br>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
            </div>
        </>
    )
}