import arrow from './icon-arrow.svg'; 
import './App.css';
import mark from './loc.svg'
import $ from 'jquery'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet/dist/leaflet.css';
import React, {useState} from 'react';
import Geocode from "react-geocode";
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
function App() {
  const [message, setMessage] = useState('');
  const [ip, setIp] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [isp, setIsp] = useState('');
  const [timezone, setTimezone] = useState('');
  const [g, setG] = useState();
const apiKey = 'at_D1Gl17zmXQuVbsPkNmUpBfKk7WEUV';

const carIcon = new L.Icon({
  iconUrl: mark,
  iconRetinaUrl: mark,
  iconSize: [60, 55],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
})

const handleChange = (event) => {
  setMessage(event.target.value)
}

Geocode.setApiKey("AIzaSyBEMMdVwlERJ-G_O5rvXwpbDoqI73CB46M");

const handleClick = () => {
  setG();
  setIp(message);
  console.log(message);
  findIp(message);
}

const findIp = (ip) => {
  $.ajax({
    url: "https://geo.ipify.org/api/v1",
    data: {apiKey: apiKey, ipAddress: ip},
    success: function(data) {
   setIp(data.ip)
      setTimezone(data.location.timezone);
setCountry(data.location.country);
setRegion(data.location.region);
setCity(data.location.city);
setIsp(data.isp);
Geocode.fromAddress(data.location.city).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);

    setG((<MapContainer center={[lat,lng]} zoom={5} zoomControl= {false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={carIcon} position={[lat,lng]}>

      </Marker>
      </MapContainer>))
  },
  (error) => {
    console.error(error);
  }

);
    }
});
}
  return (
    <div className="App">
    <div id='backgroundWallpaper'></div>
    <div id='main'>
    IP Address Tracker
   <div> <input placeholder='Search for any IP address or domain' onChange={handleChange}
        value={message}></input>
    <button onClick={handleClick}><img alt='arrow' src={arrow}></img></button></div>
    <div id='results'>
      <div className='cont'>
<div className='identificator'>IP ADDRESS</div>
<div className='result'>{ip}</div>
      </div>
      <div className="vl"></div>
      <div className='cont'>
      <div className='identificator'>LOCATION</div>
<div className='result' id='s'>{country} {region} {city}</div>
      </div>
      <div className="vl"></div>
      <div className='cont'>
      <div className='identificator'>TIMEZONE</div>
<div className='result'>{timezone}</div>
      </div>
      <div className="vl"></div>
      <div className='cont'>
      <div className='identificator'>ISP</div>
<div className='result'>{isp}</div>
      </div>
    </div>
    </div>


    <div className="map" id="map" >
{g}
</div>
    </div>
  );
}

export default App;
