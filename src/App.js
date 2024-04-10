import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const years = ['2018', '2019', '2020', '2021', '2022', '2023'];

  const indice = ['NDVI', 'TVI', 'NDMI'];

  const [selectedMonth1, setSelectedMonth1] = useState('January');
  const [selectedYear1, setSelectedYear1] = useState('2022');
  const [selectedIndice1, setSelectedIndice1] = useState('NDVI');
  const [selectedMonth2, setSelectedMonth2] = useState('January');
  const [selectedYear2, setSelectedYear2] = useState('2022');
  const [selectedIndice2, setSelectedIndice2] = useState('NDVI');

  const handleMonthChange = (month) => {
    setSelectedMonth1(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear1(year);
  };

  const handleIndiceChange = (indice) => {
    setSelectedIndice1(indice);
  };

  const handleMonthChange2 = (month) => {
    setSelectedMonth2(month);
  };

  const handleYearChange2 = (year) => {
    setSelectedYear2(year);
  };

  const handleIndiceChange2 = (indice) => {
    setSelectedIndice2(indice);
  };

  const getImageUrl = () => {
    return `${selectedMonth1}_${selectedYear1}_${selectedIndice1}.png`;
  };
  const getImageUrl2 = () => {
    return `${selectedMonth2}_${selectedYear2}_${selectedIndice2}.png`;
  };

  return (
    <div >
      <Navbar bg="success" data-bs-theme="dark" >
        <Container style={{ margin: '5px 0px 5px 50px ' }}>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faLeaf} size='xl' style={{ marginRight: '15px' }} color="var(--blue)" />
            <b>Team 13</b>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <br />

      <div style={{ display: 'flex' }}>
        <div >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-month">
                {selectedMonth1}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {months.map((month) => (
                  <Dropdown.Item key={month} onClick={() => handleMonthChange(month)}>
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="success" id="dropdown-year">
                {selectedYear1}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="success" id="dropdown-year">
                {selectedIndice1}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {indice.map((indice) => (
                  <Dropdown.Item key={indice} onClick={() => handleIndiceChange(indice)}>
                    {indice}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            <h3>Selected Image:</h3>
            <img src={getImageUrl()} alt="Selected" style={{ maxWidth: '100%' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-month">
                {selectedMonth2}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {months.map((month) => (
                  <Dropdown.Item key={month} onClick={() => handleMonthChange2(month)}>
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="success" id="dropdown-year">
                {selectedYear2}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item key={year} onClick={() => handleYearChange2(year)}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="success" id="dropdown-year">
                {selectedIndice2}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {indice.map((indice) => (
                  <Dropdown.Item key={indice} onClick={() => handleIndiceChange2(indice)}>
                    {indice}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            <h3>Selected Image:</h3>
            <img src={getImageUrl2()} alt="Selected" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
