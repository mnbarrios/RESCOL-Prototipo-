// Utilidad React
import {  useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip, FeatureGroup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
// Importa Leaflet y las extensiones necesarias
import L from 'leaflet';
import '../styles/mapa.scss'

import {Switch, FormControlLabel, Typography} from '@mui/material';
import uuid from 'react-uuid';

function Leaflet({ lineData }) {

  const position = [-33.43912288624236, -70.67521211218381]
  const [heapMap, setHeapMap] = useState(false)
  const zoom = 12

  const mapRef = useRef();  // Obtener la referencia del map


  useEffect(()=>{
    setHeapMap(false)
    if(mapRef.current){
      const map = mapRef.current

      if(lineData){
        const bounds = L.geoJSON(lineData.data).getBounds()
        map.fitBounds(bounds)
        setHeapMap(false)
      }else{
        map.flyTo(position,zoom)
      }
    }
  },[lineData]) 

  const getColor = (value) => {
    // Definir los colores para cada intervalo
    if(value === null) return '#9b9b9b'
    else if (value <= 75) return '#008f39';
    else if (value <= 200) return '#e5be01';
    else if (value <= 999) return '#ff2c2c';
    else return 'black'; // Color más alto (más basura)
  };
  
  const style = (feature) => {
    
    const basuraArc = feature.properties['RESIDUOS'];
    return {
        fillColor: 'black',
          weight: 3,  // Ancho de la línea principal
          opacity: 1,
          color: heapMap?getColor(basuraArc):'#239af5',  // Color de la línea principal
          fillOpacity: 1,
      };
  };

  
  const onEachFeature = (feature, layer) => {
    const basuraArc = feature.properties['RESIDUOS'];
    layer.bindTooltip(`Residuos del arco: ${basuraArc?Number.parseFloat(basuraArc).toFixed(2):0}`);
  };


  const onActivateSwitch = () => {
    setHeapMap(!heapMap)
  }

  return (
    <div className='leaflet'>
      {lineData && 
        <div className='leaflet-button'>
          <FormControlLabel 
                label="Mapa de calor"
                control={<Switch  onChange={onActivateSwitch}/>}
                labelPlacement="start"
          />
          {
            heapMap && 
              <div >
                <Typography>Rango de residuos (kg)</Typography>
                <div className='leaflet-range-item'>
                  <div className='leaflet-grey'/>0
                </div>
                <div className='leaflet-range-item'>
                  <div className='leaflet-green'/> 1 - 75
                </div>
                <div className='leaflet-range-item'>
                  <div className='leaflet-yellow'/> 76 - 200
                </div>
                <div className='leaflet-range-item'>
                  <div className='leaflet-red'/> 201 - 999
                </div>
                <div className='leaflet-range-item'>
                  <div className='leaflet-black'/> {'>= 1000'}
                </div>
              </div>
          }
        </div>
      }
      <MapContainer center={position} zoom={zoom} ref={mapRef} style={{height:'100%', width:'100%'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lineData &&   <GeoJSON key={lineData.id} 
                                data={lineData.data} 
                                style={style}
                                onEachFeature={onEachFeature}/>}
      </MapContainer>
    </div>
  );
}

export default Leaflet;
