import React, { useState } from 'react';
import { Card, CardContent, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const CustomerTable = ({ customers }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);

  //Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  //Sort
  const handleSort = (field) => {
    setSortBy(field);
    setCurrentPage(0);
  };

  //PageSize
  const pageSize = 20;

  //Filter Customers Data
  let filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  //Sort Data Based On Date , Time
  if (sortBy) {
    filteredCustomers.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time);
      } else if (sortBy === 'time') {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
      }
    });
  }


  //Total Pages
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  //Required Variables 
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  //Table Card Returning
  return (
    <div className="container" style={{ margin: '20px', border: '2px solid black' }}>
      <Card style={{ backgroundColor: 'lightgrey' }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', color: 'black' }}>Customer Details</h2>

          <TextField
            fullWidth
            // variant="outlined"
            placeholder="Search by Name or Location"
            value={searchTerm}
            onChange={handleSearchChange}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment   position="start">
            //       <i className="fas fa-search"></i>
            //     </InputAdornment>
            //   ),
            // }}
            style={{ marginBottom: '20px', border: '2px solid lightblue' }}
          />
          {filteredCustomers.length === 0 && (
            <h2 style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>No results found with <span style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }} > {searchTerm}</span> [ Name , Location ]</h2>
          )}
          {filteredCustomers.length > 0 && (
            <TableContainer component={Paper}>
              <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <TableHead>
                  <TableRow >
                    <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={() => handleSort('name')}>SL No.</TableCell>
                    <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={() => handleSort('name')}>Customer Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={() => handleSort('age')}>Age</TableCell>
                    <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={() => handleSort('location')}>Location</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }} colSpan={2} onClick={() => handleSort('date')}>Created At</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc' }}  ></TableCell>

                    <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleSort('date')}>Date</TableCell>
                    <TableCell style={{ fontWeight: 'bold', cursor: 'pointer', textAlign: 'center' }} onClick={() => handleSort('time')}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {currentCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ borderRight: '1px solid #ccc', textAlign: 'center' }}>{index + 1}</TableCell>
                      <TableCell style={{ borderRight: '1px solid #ccc', textAlign: 'center' }}>{customer.name}</TableCell>
                      <TableCell style={{ borderRight: '1px solid #ccc', textAlign: 'center' }}>{customer.age}</TableCell>
                      <TableCell style={{ borderRight: '1px solid #ccc', textAlign: 'center' }}>{customer.location}</TableCell>
                      <TableCell style={{ borderRight: '1px solid #ccc', textAlign: 'center', }}>{customer.date}</TableCell>
                      <TableCell style={{ borderRight: '1px solid #ccc', textAlign: 'center' }}>{customer.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)}
          <TablePagination
            rowsPerPageOptions={[pageSize]}
            component="div"
            count={filteredCustomers.length}
            rowsPerPage={pageSize}
            page={currentPage}
            onPageChange={handleChangePage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

//Exporting Customers Table
export default CustomerTable;
