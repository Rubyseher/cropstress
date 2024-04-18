import React, { useState ,useContext, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-bootstrap/Carousel';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
import './App.css';
import useDB from './useDB';

function App() {
  // async function getCities(db) {
  //   const citiesCol = collection(db, 'cities');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   return cityList;
  // }
  const months = [
    'February', 'December'
  ];
  const years = ['2021'];
  const carouselType = [
    'scatter1', 'scatter2'

  ];
  const timelapseValues = ['Nov 2021 - Apr 2022', 'Nov 2022 - Apr 2023', 'Nov 2021 - Apr 2022 & Nov 2022 - Apr 2023'];
  const indice = ['NDVI', 'TVI', 'NDMI'];
  const [imageList1,setImagesList1] = useState([]);

  const [selectedMonth1, setSelectedMonth1] = useState('January');
  const [selectedYear1, setSelectedYear1] = useState('2022');
  const [selectedIndice1, setSelectedIndice1] = useState('NDVI');
  const [selectedMonth2, setSelectedMonth2] = useState('January');
  const [selectedYear2, setSelectedYear2] = useState('2022');
  const [selectedIndice2, setSelectedIndice2] = useState('NDVI');
  const [showTimeLapse, setShowTimeLapse] = useState(false);
  const [selectedTimeLapse, setSelectedTimeLapse] = useState('Nov 2021 - Apr 2022');
  const [showHomePage, setShowHomePage] = useState(true);
  const backgroundStyle = {
    backgroundImage: 'url(cropBg3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    FontWeight: 'bold',
    fontSize: '34px',
    textAlign: 'center',
  };

  const handleMonthChange = (month) => { setSelectedMonth1(month); };

  const handleYearChange = (year) => { setSelectedYear1(year); };

  const handleIndiceChange = (indice) => { setSelectedIndice1(indice); };

  const handleMonthChange2 = (month) => { setSelectedMonth2(month); };

  const handleYearChange2 = (year) => { setSelectedYear2(year); };

  const handleIndiceChange2 = (indice) => { setSelectedIndice2(indice); };

  const getImageUrl = () => {
    return imageList1[0];
    // return `${selectedMonth1}_${selectedYear1}_${selectedIndice1}.png`;
  };
  const getImageUrl2 = () => {
    return `${selectedMonth2}_${selectedYear2}_${selectedIndice2}.png`;
  };

  const renderCarouselItems = (month, year, indice) => {
    return carouselType.map((type) => (
      <Carousel.Item key={type}>
        <img
          className="d-block w-100"
          src={`./images/${month}_${year}_${indice}_${type}.png`}
          alt={`${month} ${year} ${indice}`}
        />
      </Carousel.Item>
    ));
  };

  const {getStorageItem} = useDB();
  
useEffect(() => {
  getStorageItem('2022/February/NDVI/1-1.5_NDVI_02_02_2022.png', (url) => {
    console.log(url);
    setImagesList1([url])
})
}, [])


  // const getImagePlotUrl = (month, year, indice, img) => {
  //   if (img === 'scatter') {
  //     return `${month}_${year}_${indice}_scatter.png`;
  //   } else if (img === 'histogram') {
  //     return `${month}_${year}_${indice}_histogram.png`;
  //   } else {
  //     return `${month}_${year}_${indice}_scatter.png`;
  //   }
  // };

  return (
    <div >
      <Navbar bg="success" data-bs-theme="dark" >
        <Container style={{ margin: '5px 0px 5px 50px ' }}>
          <Navbar.Brand href="#home" onClick={() => { setShowHomePage(true); setShowTimeLapse(false) }}>
            <FontAwesomeIcon icon={faLeaf} size='xl' style={{ marginRight: '15px' }} color="var(--blue)" />
            <b>Team 13</b>
          </Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link href="#home" style={{ color: 'white' }} onClick={() => { setShowTimeLapse(false); setShowHomePage(false) }}><b>Home</b></Nav.Link>
            <Nav.Link href="#timelapse" style={{ color: 'white' }} onClick={() => { setShowTimeLapse(true); setShowHomePage(false) }}><b>TimeLapse</b></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      {
        showHomePage === true && <div style={backgroundStyle}>
          {/* <img src='cropBg3.jpg' alt="Selected"  style={{height:'103vh',width:'176vh'}} /> */}
          <div onClick={() => { setShowTimeLapse(false); setShowHomePage(false) }}>
            <h1 style={{ fontSize: '83px' }}>Crop Stress Management</h1>
          </div>
        </div>
      }
      <br />

      {showTimeLapse === false && showHomePage === false && <div style={{ display: 'flex' }}>
        <div >
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
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
            <img src={imageList1[0]  } alt="Selected" style={{ width: '700px', height: '600px' }} />
          </div>

          {/* <div style={{ marginTop: '20px' }}>
            <h3>Image Type:</h3>
            <ButtonGroup>
              <ToggleButton
                id="scatter"
                type="radio"
                variant="primary"
                name="imageType"
                value="scatter"
                checked={imageType === 'scatter'}
                onChange={() => handleImageTypeChange('scatter')}
              >
                Scatter
              </ToggleButton>
              <ToggleButton
                id="histogram"
                type="radio"
                variant="primary"
                name="imageType"
                value="histogram"
                checked={imageType === 'histogram'}
                onChange={() => handleImageTypeChange('histogram')}
              >
                Histogram
              </ToggleButton>
            </ButtonGroup>
          </div> */}
          {/* <img src={getImagePlotUrl(selectedMonth1, selectedYear1, selectedIndice1, imageType)} alt="Selected" style={{ width: '600px', height: '500px' }} /> */}
          {/* <div style={{ marginTop: '20px', width: '600px', margin: '0 auto' }}>
            <Carousel>
              {renderCarouselItems(selectedMonth1, selectedYear1, selectedIndice1)}
            </Carousel>
          </div> */}
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
            <img src={getImageUrl2()} alt="Selected" style={{ width: '700px', height: '600px' }} />
          </div>

          {/* <div style={{ marginTop: '20px' }}>
            <h3>Image Type:</h3>
            <ButtonGroup>
              <ToggleButton
                id="scatter2"
                type="radio"
                variant="primary"
                name="imageType2"
                value="scatter"
                checked={imageType2 === 'scatter'}
                onChange={() => handleImageTypeChange2('scatter')}
              >
                Scatter
              </ToggleButton>
              <ToggleButton
                id="histogram2"
                type="radio"
                variant="primary"
                name="imageType2"
                value="histogram"
                checked={imageType2 === 'histogram'}
                onChange={() => handleImageTypeChange2('histogram')}
              >
                Histogram
              </ToggleButton>
            </ButtonGroup>
          </div> */}
          {/* <img src={getImagePlotUrl(selectedMonth2, selectedYear2, selectedIndice2, imageType2)} alt="Selected" style={{ width: '600px', height: '500px' }} /> */}

          <div style={{ marginTop: '20px', width: '600px', margin: '0 auto' }}>
            <Carousel>
              {renderCarouselItems(selectedMonth2, selectedYear2, selectedIndice2)}
            </Carousel>
          </div>

        </div>
      </div>
      }

      {showTimeLapse === true && <div >
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <Dropdown style={{ marginLeft: '10px' }}>
            <Dropdown.Toggle id="dropdown-year" variant="success" >
              <b>{selectedIndice1}</b>
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
          <h3>Selected Timelapse:</h3>
          <img src={`${selectedIndice1}.mp4`} alt="Selected" />
        </div>

      </div>
      }

    </div>
  );
}

export default App;
