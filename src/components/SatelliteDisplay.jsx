//This component intent is to display a dynamic map with a satellite moving 
//based on the iss satelite location api (which moves every second, this change can be 
//seen when the iss web page is refreshed)
import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const SatelliteDisplay = ( {positioning, objectRef, className}) => {
  const satelliteIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/7579/7579604.png', // Image URL
    iconSize: [85, 85], // Size of the icon
    iconAnchor: [15, 15], // Point of the icon which will correspond to marker's location
    // popupAnchor: [0, -15], // Point from which the popup should open relative to the iconAnchor
  });
  
  return (
    <div className={className} >
      <MapContainer center={positioning} zoom={3} ref={objectRef} style={{height: "50vh", width: "50vw"} } className="box"> 
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Additional map layers or components can be added here */}
        <Marker position={positioning} icon={satelliteIcon}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>

      </MapContainer>

    </div>
     
  )
}



export default SatelliteDisplay;