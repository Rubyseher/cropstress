import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><b>Team 13</b></Navbar.Brand>
        </Container>
      </Navbar>

      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>
    </div>
  );
}

export default App;
