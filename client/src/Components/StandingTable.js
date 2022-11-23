import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import { GlobalFilter } from './GlobalFilter';
import SMOCK_DATA from './SMOCK_DATA.json'

const StanCOLUMNS = [
    {
        Header: 'Position',
        accessor: 'Position'

    },
    {
        Header: 'Team Name',
        accessor: 'Team'
    },

    {
        Header: 'All Matches',
        columns:[
            {
                Header: 'Against',
                accessor: 'Against'
            }, 
            {
                Header: 'Drawn',
                accessor: 'Drawn'
            },
            
            {
                Header: 'Goal Difference',
                accessor: 'Goal Difference'
            },
            {
                Header: 'Lost',
                accessor: 'lost'
            },
            {
                Header: 'Played',
                accessor: 'played'
            },
            {
                Header: 'Won',
                accessor: 'won'
            },
            {
                Header: 'Total Points',
                accessor: 'total points'
            },
        ]
    },
    
]

export const StandingTable = () => {
    const columns = useMemo(() => StanCOLUMNS, [])
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