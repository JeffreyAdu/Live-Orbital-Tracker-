import React, { useState, useEffect, useRef } from 'react';
import SatelliteDisplay from '../components/SatelliteDisplay';
import PeopleList from '../components/PeopleList';
import './App.css'


//I wrote the comments just to help me visualize my understanding 

const App = () => {
  const [issPosition, setIssPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default position 
  const [spaceIndividuals, setspaceIndividuals] = useState([]);
  //useRef to take note of the Leaflet instance changes without re-rendering the component
  const mapRef = useRef(null);
  const timeoutIdRef = useRef(null); // Use a ref to keep track of the timeout ID for cleanup

  useEffect(() => {
    // Initial call to start moving the ISS on the map
    const moveISS = async function () {
      try {
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // const issApi = ;
        const response = await fetch('/api/iss-now');
        const data = await response.json();
        const lat = parseFloat(data.iss_position.latitude); //Just to be safe
        const lng = parseFloat(data.iss_position.longitude); //Just to be safe
        setIssPosition({ lat, lng }); 
        const map = mapRef.current;
        if (map) {
          map.flyTo([lat, lng], map.getZoom(), { animate: true });
        }
      } catch (err) {
        console.error("ooooooops", err);
      }
  
      const timeoutId = setTimeout(moveISS, 3000);
      return () => clearTimeout(timeoutId);
      
      
    };

    moveISS();
    const peopleInSpace = async function(){
      try{
        const secondResponse = await fetch('http://api.open-notify.org/astros.json');
        const data = await secondResponse.json();
        // const nameOfAstraunots = data.people.name;
        setspaceIndividuals(data);
      }catch (err) {
        console.error("ooooooops", err);
      }
    }
    
    peopleInSpace();  

    //Just to be safe , for future purposes 
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };

  }, []); // Empty dependency array means this effect runs once on mount
   
  
 
  return (
    <div>
    <h1 className="live-orbital-tracker">Live Orbital Tracker: Witness the International Space Station in Real-Time!</h1>
    <h2 className='tc'>Track the ISS as it orbits Earth and discover who's aboard!</h2>
    <SatelliteDisplay className="flex items-center justify-center map-container "  positioning={issPosition} objectRef={mapRef}/>
    <h3 className='tc'>Data updated every 3 seconds!</h3>
    <h3 className='header-fullwidth'>Live from Space: The ISS Crew</h3>
    <PeopleList astronauts={spaceIndividuals.people || []} />
    <footer className='tc'>Built with React and Leaflet for seamless real-time data visualization.</footer>
    </div>
  );
  
}
export default App;



