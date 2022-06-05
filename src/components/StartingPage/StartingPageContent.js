import classes from './StartingPageContent.module.css';
import React , {useState,useEffect} from 'react';
import { useTable } from 'react-table'
import { useHistory } from 'react-router-dom';
import { defaultFormat } from 'moment';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

const StartingPageContent = () => {


const history = useHistory();
const [users, setUsers]  = useState([]);
useEffect(() => {

  fetch('https://goat-dev.plan4better.de/api/v1/users')
  .then((response) =>  response.json())
  .then((json) =>{
    console.log(json);
    setUsers(json);
   });
  
},[]);



const data = React.useMemo(
    () => users,
    [users]
  )

 const columns = React.useMemo(
  () => [{  
    Header: 'First Name',  
    accessor: 'first_name'  
   },{  
    Header: 'Last Name',  
    accessor: 'last_name'  
   },{  
   Header: 'Email',  
   accessor: 'email'  
   },{  
    Header: 'Roles',  
    accessor: 'roles'  
   },
   {  
    Header: 'Action',  
    accessor: 'action'  
   },
   
   ] ,
     []
    );


const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = useTable({ columns, data })


  return (
    <section className={classes.elevation}>
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
     
         {headerGroups.map(headerGroup => (
                
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px gray',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                     }}
                   >
                     {cell.render('Cell')}
                    
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </section>
  );
};


export default StartingPageContent;
