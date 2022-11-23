import React, {useMemo} from 'react';
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table';
import RMOCK_DATA from './RMOCK_DATA.json';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import { GlobalFilter } from './GlobalFilter';

const GROUPED_COLUMNS= [
    {
        Header: 'Id',
        accessor:'id'

    },
    {
        Header: 'Referee',
        columns: [
            {
                Header: 'First Name',
                accessor:'first_name'
            },
            {
                Header: 'Last Name',
                accessor:'last_name'
            },
            {
                Header: 'Age',
                accessor:'age'
            },
        ]
    },
    {
        Header:'Match Statistics',
        columns : [
            {
                Header: 'Number of Yellow Card',
                accessor:'Number of Yellow Card'
            },
            {
                Header: 'Number of Red Card',
                accessor:'Number of Red Card'
            },
            {
                Header: 'Penalty',
                accessor:'Penalty'
            },
        ]
    }
]
export const RefereeTable = () =>{
    const columns = useMemo(()=> GROUPED_COLUMNS, [])
    const data = useMemo(()=> RMOCK_DATA, [])

    const tableInstance = useTable({
        columns: columns,
        data: data
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