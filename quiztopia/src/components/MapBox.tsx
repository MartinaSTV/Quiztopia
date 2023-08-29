import { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map as MapGl }from 'mapbox-gl';
import './MapBoxSeize.scss'

mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY as string

function MapBox(){
    let mapContainer = useRef(null)
    let mapGL = useRef<MapGl | null>(null)

  // Startar i göteborg
  const [lng, setlng ]= useState<number>(12.09019)
  const [lat, setlat ]= useState<number>(57.67757)
  const [zoom, setzoom ]= useState<number>(10)

    useEffect(()=>{

      if(mapGL.current || !mapContainer.current) return
      console.log('inne i funktionen')

      mapGL.current = new MapGl({
        container: mapContainer.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 9, // starting zoom
        });

        console.log(3)
        const map: MapGl = mapGL.current
       
        map.on('move',()=>{
          console.log(4)

          // fixa interface position
          const position = map.getCenter()
          setlat(Number(position.lat.toFixed(7)))
          setlng(Number(position.lng.toFixed(7)))
          setzoom(map.getZoom())
        }) 

    },[lat, lng, zoom])
    
    return(
        <main className='map'>
        <header>Map</header>
        <div ref={ mapContainer} className='map-container'></div>
        <p>lat {lat} lng {lng}</p>
        </main>
    )
}
export default { MapBox }