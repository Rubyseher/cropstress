import React, { useState, useContext, useEffect } from 'react';
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
  const months = {
    2021: ['November', 'December'],
    2022: ['November', 'December', 'January', 'February', 'March', 'April'],
    2023: ['January', 'February', 'March', 'April']
  };
  const years = [2021, 2022, 2023];
  const carouselType = [
    'scatter1', 'scatter2'

  ];
  const timelapseValues = ['Nov 2021 - Apr 2022', 'Nov 2022 - Apr 2023', 'Nov 2021 - Apr 2022 & Nov 2022 - Apr 2023'];
  const indice = ['NDVI', 'TVI', 'NDMI'];
  const [imageList1, setImagesList1] = useState([]);
  const [imageList2, setImagesList2] = useState([]);
  const [baseImg1, setBaseImg1] = useState();
  const [baseImg2, setBaseImg2] = useState();


  const [selectedMonth1, setSelectedMonth1] = useState(months['2022'][0]);
  const [selectedYear1, setSelectedYear1] = useState('2022');
  const [selectedIndice1, setSelectedIndice1] = useState('NDVI');
  const [selectedMonth2, setSelectedMonth2] = useState(months['2022'][0]);
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

  const handleYearChange = (year) => { setSelectedYear1(year); setSelectedMonth1(months[year][0]) };

  const handleIndiceChange = (indice) => { setSelectedIndice1(indice); };

  const handleMonthChange2 = (month) => { setSelectedMonth2(month); };

  const handleYearChange2 = (year) => { setSelectedYear2(year); setSelectedMonth2(months[year][0]) };

  const handleIndiceChange2 = (indice) => { setSelectedIndice2(indice); };

  const getBaseImg = () => {
    if (imageList1 && imageList1.length > 0) {
      return imageList1; // Assuming the first item in the list is the URL of the image
    } else {
      return 'placeholder_image_url.jpg';
    }
  };

  const getImageUrl2 = () => {
    return `${selectedMonth2}_${selectedYear2}_${selectedIndice2}.png`;
  };

  const renderCarouselItems = (number) => {
    if (number === 1) {
      return imageList1.map((imageUrl, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={imageUrl} alt={`Image ${index}`}/>
        </Carousel.Item>
      ));
    } else if (number === 2) {
      return imageList2.map((imageUrl, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={imageUrl} alt={`Image ${index}`}/>
        </Carousel.Item>
      ));
    } else {
      console.error('Invalid number argument:', number);
      return null;
    }
  };

  const { getStorageItem } = useDB();

  useEffect(() => {
    const fetchSlideShowImages = async (year, month, indices, number) => {
      try {
        const folderRef = `${year}/${month}/${indices}`;
        const response = await getStorageItem(folderRef);
        const imageUrls = response.items.map(item => item.downloadURL);
        if (number === 1) { setImagesList1(imageUrls); }
        else if (number === 2) { setImagesList2(imageUrls); }
        else console.error('Invalid number argument:', number);

        
        if (number === 2) { console.log(imageUrls)}
      } catch (error) {
        console.error('Error fetching  images:', error);
      }
    };
    const fetchBaseImg = async (year, month, indices, number) => {
      try {
        const folderRef = `${year}/${month}/${indices}/baseImg`;
        const response = await getStorageItem(folderRef);
        const imageUrls = response.items.map(item => item.downloadURL);
        if (number === 1) { setBaseImg1(imageUrls); }
        else if (number === 2) { setBaseImg2(imageUrls); }
        else console.error('Invalid number argument:', number);

        // console.log(imageUrls)
      } catch (error) {
        console.error('Error fetching  images:', error);
      }
    };
    fetchSlideShowImages(selectedYear1, selectedMonth1, selectedIndice1, 1);
    fetchBaseImg(selectedYear1, selectedMonth1, selectedIndice1, 1);
    fetchSlideShowImages(selectedYear2, selectedMonth2, selectedIndice2, 2);
    fetchBaseImg(selectedYear2, selectedMonth2, selectedIndice2, 2);
  }, [getStorageItem]);

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
            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="outline-success" id="dropdown-year"> <b>{selectedYear1}</b></Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>{year}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="outline-success" id="dropdown-month"><b>{selectedMonth1}</b></Dropdown.Toggle>
              <Dropdown.Menu>
                {months[selectedYear1].map((month) => (
                  <Dropdown.Item key={month} onClick={() => handleMonthChange(month)}>{month}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="outline-success" id="dropdown-year"><b>{selectedIndice1}</b></Dropdown.Toggle>
              <Dropdown.Menu>
                {indice.map((indice) => (
                  <Dropdown.Item key={indice} onClick={() => handleIndiceChange(indice)}>{indice}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            <img src={baseImg1} alt="Selected" style={{ width: '700px', height: '600px' }} />
          </div>

          <div style={{ marginTop: '20px', width: '600px', margin: '0 auto' }}>
            <h3>Plots:</h3><Carousel>{renderCarouselItems(1)} </Carousel>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="outline-success" id="dropdown-year"> <b>{selectedYear2}</b></Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item key={year} onClick={() => handleYearChange2(year)}>{year}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="outline-success" id="dropdown-month"><b>{selectedMonth2}</b></Dropdown.Toggle>
              <Dropdown.Menu>
                {months[selectedYear2].map((month) => (
                  <Dropdown.Item key={month} onClick={() => handleMonthChange2(month)}>{month}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="outline-success" id="dropdown-year"><b>{selectedIndice2}</b></Dropdown.Toggle>
              <Dropdown.Menu>
                {indice.map((indice) => (
                  <Dropdown.Item key={indice} onClick={() => handleIndiceChange2(indice)}>{indice}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            <img src={baseImg2} alt="Selected" style={{ width: '700px', height: '600px' }} />
          </div>

          <div style={{ marginTop: '20px', width: '600px', margin: '0 auto' }}>
            <h3>Plots:</h3><Carousel>{renderCarouselItems(2)} </Carousel>
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
