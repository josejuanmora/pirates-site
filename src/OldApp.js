import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";

import './App.css';

function Table({ columns, data }) {
  const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({
   columns,
   data,
 })

 return (
   <table {...getTableProps()}>
     <thead>
       {headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
           ))}
         </tr>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {rows.map((row, i) => {
         prepareRow(row)
         return (
           <tr {...row.getRowProps()}>
             {row.cells.map(cell => {
               return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
 )
}

function App() {
 const [data, setData] = useState([]);

 useEffect(() => {
   axios("http://localhost:8080/api/v1_0/ship/")
     .then((res) => {
       setData(res.data);
     })
     .catch((err) => console.log(err))
 }, []);

 const columns = useMemo(
   () => [
     {
       Header: "Ships",
       columns: [
         {
           Header: "Identifier",
           accessor: "id"
         },
         {
           Header: "Name",
           accessor: "name"
         },
       ]
     }
   ]
 )

 return (
   <div className="App">
     <h1><center>Pirates</center></h1>
     <Table columns={columns} data={data} />
   </div>
 );
}

export default App;
