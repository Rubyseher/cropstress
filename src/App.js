import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';

function App() {
  return (
    <div >
      <Navbar bg="success" data-bs-theme="dark" >
        <Container style={{ margin: '5px 0px 5px 50px ' }}>
          <Navbar.Brand href="#home">
          <FontAwesomeIcon icon="fa-solid fa-leaf" />
            <b>Team 13</b>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default App;
