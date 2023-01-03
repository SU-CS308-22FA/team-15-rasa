import React, {useMemo} from 'react';
import {useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import {GlobalFilter} from './GlobalFilter';
import { useState, useEffect } from "react";
import axios from "axios";

const StanCOLUMNS = [
    {
        Header: 'Position',
        accessor: 'teamRank'

    },
    {
        Header: 'Team Name',
        accessor: 'teamName'
    },

    {
        Header: 'All Matches',
        columns:[
            {
                Header: 'Overall',
                accessor: 'O'
            }, 
            {
                Header: 'Win',
                accessor: 'G'
            },
            
            {
                Header: 'Tie',
                accessor: 'B'
            },
            {
                Header: 'Defeat',
                accessor: 'M'
            },
            {
                Header: 'Goal Scored',
                accessor: 'A'
            },
            {
                Header: 'Conceded Goal',
                accessor: 'Y'
            },
            {
                Header: 'Average',
                accessor: 'AV'
            },
            {
                Header: 'Points',
                accessor: 'P'
            },
        ]
    },
]

export const StandingTable = () => {
    const [standings, setStandings] = useState([]);  

    useEffect(() => {
        axios.get("/api/v1/", {
            params: {
                _collection: "standing",
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            if (res && res.status === 200 && res.data.items.length > 0) {                
                setStandings(res.data.items);
            }
        });
    }, []);
    
    const columns = useMemo(()=> StanCOLUMNS, [])  
    const tableInstance = useTable({
        columns: columns,
        data: standings
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