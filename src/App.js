import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
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
      <br/>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Month
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">January</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Feb</Dropdown.Item>
          <Dropdown.Item href="#/action-3">March</Dropdown.Item>
          <Dropdown.Item href="#/action-1">April</Dropdown.Item>
          <Dropdown.Item href="#/action-2">May</Dropdown.Item>
          <Dropdown.Item href="#/action-3">June</Dropdown.Item>
          <Dropdown.Item href="#/action-1">July</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Aug</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Sep</Dropdown.Item>
          <Dropdown.Item href="#/action-1">Oct</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Nov</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Dec</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default App;
