import React, {useMemo} from 'react';
import {useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import {GlobalFilter} from './GlobalFilter';
import { useState, useEffect } from "react";
import axios from "axios";

const GROUPED_COLUMNS= [    
    {
        Header: 'Referee',
        columns: [
            {
                Header: 'Name',
                accessor:'name'
            },

            {
                Header: 'Age at First Match',
                accessor:'ageAtFirstMatch'
            },
        ]
    },
    {
        Header:'Match Statistics',
        columns : [
            {
                Header: 'Total Matches',
                accessor:'totalMatches'
            },
            {
                Header: 'Total Yellow Card',
                accessor:'totalYellow'
            },
            {
                Header: 'Average Yellow',
                accessor:'averageYellow'
            },            
            {
                Header: 'Total Red Card',
                accessor:'totalRed'
            },
            {
                Header: 'Average Red',
                accessor:'averageRed'
            },
            {
                Header: 'Total Penalty',
                accessor:'totalPenalty'
            },
            {
                Header: 'Average Penalty',
                accessor:'averagePenalty'
            }
        ]
    }
]
export default function RefereeTable() {
    const [referees, setReferees] = useState([]);  
    useEffect(() => {
        axios.get("/api/v1/", {
            params: {
                _collection: "ref_stats",
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            if (res && res.status === 200 && res.data.items.length > 0) {                
                setReferees(res.data.items);
            }
        });
    }, []);
    const columns = useMemo(()=> GROUPED_COLUMNS, [])
    const tableInstance = useTable({
        columns: columns,
        data: referees
    }, useGlobalFilter,
    useSortBy, usePagination)
    const {getTableProps, getTableBodyProps, headerGroups, page, nextPage, canNextPage, canPreviousPage, previousPage, prepareRow, state, setGlobalFilter} = tableInstance
    const {globalFilter} = state
    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table{...getTableProps()}>
                <thead>
                {
                    headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column)=>(
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
                    page.map((row)=> {
                        prepareRow(row)
                        return (
                            <tr{...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>})}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div>
                <br></br>
                <Button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={()=> nextPage()} disabled={!canNextPage}>Next</Button>
            </div>
        </>
    )
}