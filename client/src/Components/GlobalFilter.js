import React from 'react'
import InputLabel from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
export const GlobalFilter = ({filter, setFilter}) => {
  return (
    <span>
        <Typography component="h3" variant="h7" className="">
            <InputLabel
                label="Search"
                htmlFor="component-simple"
                value= {filter || ''} onChange={(e) => setFilter(e.target.value)}><SearchIcon>aa</SearchIcon>

            </InputLabel>
        </Typography>
    </span>
  )
}
