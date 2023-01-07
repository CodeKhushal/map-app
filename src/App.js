import React, { Component } from 'react';
import { MapContainer as LeafletMap, CircleMarker, TileLayer, Popup } from "react-leaflet";
import data from './components/cities'
import "leaflet/dist/leaflet.css";
import './App.css'

class App extends Component {
  render() {
    function getColor(data) {
      if (data <= 300) return '#1E90FF'
      else if (data > 300 && data <= 500) return '#4169E1'
      else if (data > 500 && data <= 1000) return '#0000FF'
      else return '#00008B'
    }
    return (
      <div className='container'>
        <h2 style={{ width: "fit-content", margin: "auto", marginTop: "10px", marginBottom: "10px" }}>Data Usage as per the region</h2>
        <LeafletMap
          className='static-map'
          style={{ height: "600px", width: "90%", margin: "auto", padding: "10px" }}
          zoom={1.5}
          zoomControl={false}
          // scrollWheelZoom={false}
          center={[5, 51.505]}>
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {data.city.map((city, area) => {
            return (
              <CircleMarker
                center={[city["coordinates"][1], city["coordinates"][0]]}
                radius={20 * Math.log(city["data"] / 100)}
                fillColor={getColor(city["data"])}
                fillOpacity={0.5}
                stroke={false}
              >
                <Popup>
                  <span>{city["name"] + ", DATA: " + city["data"]}</span>
                </Popup>
              </CircleMarker>
            )
          })
          }
        </LeafletMap>

        <div className="referenceData" style={{ marginTop: "20px", marginLeft: "4%", marginRight: "4%", width: "100%", boxSizing: "border-box" }}>
          <span>$ Usage</span>
          <svg width='100%' height='40px' padding='5px' margin='auto'>
            <g>
              <rect fill='#1E90FF' width='92%' height='25'></rect>
              <rect fill='#4169E1' width='75%' height='25'></rect>
              <rect fill='#0000FF' width='57%' height='25'></rect>
              <rect fill='#00008B' width='37%' height='25'></rect>
            </g>
          </svg>
          <svg width='100%' height='50px' margin='auto' marginTop='-5px'>
            <g>
              <rect fill='#00008B' width='15px' height='15'></rect>
              <text fill='black' x='25' y='14'>{">$5K"}</text>
              <text fill='black' x='15%' y='15'>36%</text>

              <rect fill='#0000FF' x='37%' y='1' width='15px' height='15'></rect>
              <text fill='black' x='39%' y='15'>{"$1K-5K"}</text>
              <text fill='black' x='47%' y='15'>24%</text>

              <rect fill='#4169E1' x='57%' y='1' width='15px' height='15'></rect>
              <text fill='black' x='59%' y='15'>{"$500-1K"}</text>
              <text fill='black' x='67%' y='15'>20%</text>

              <rect fill='#1E90FF' x='75%' y='1' width='15px' height='15'></rect>
              <text fill='black' x='77%' y='15'>{"<$500"}</text>
              <text fill='black' x='86%' y='15'>20%</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
