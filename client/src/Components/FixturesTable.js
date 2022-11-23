import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import { GlobalFilter } from './GlobalFilter';
import SMOCK_DATA from './FMOCK_DATA.json'

const FixCOLUMNS = [
    {
        Header: 'Home Team',
        accessor: 'hometeam'
    },
    {
        Header: 'Scores',
        columns : [
            {      
                accessor: 'homescore'
            },
            {
                accessor: 'againstscore'
            },
        ]
    },
    {
        Header: 'Against Team',
        accessor: 'againstteam'
    },    
    {
        Header: 'Date',
        accessor: 'date'
    },
]

export const FixturesTable = () => {
    const columns = useMemo(() => FixCOLUMNS, [])
    const data = useMemo(() => SMOCK_DATA, [])
    const tableInstance = useTable({
        columns: columns,
        data: data
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