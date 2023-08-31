import { useNavigate } from "react-router-dom";
import geolocation from "../GetData/Geolocation";
import { getQuizes } from "../GetData/QuizAPI";
import Quiz from "../components/Quiz";

import {useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { LngLat, Map as MapGl }from 'mapbox-gl';
import './QuizView.scss'
import { isCompositeComponent } from "react-dom/test-utils";
mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY as string

const PlayGame = ()=>{
    const navigate = useNavigate()

    const [getQuiz, setGetQuiz] = useState<QuizesResponse[] | []>([])
    console.log(getQuiz)

    let mapContainer = useRef(null)
    let mapGL = useRef<MapGl | null>(null)
    //visar cordinater på karta onmove
    const [lng, setlng ]= useState<number>(11.9875166)
    const [lat, setlat ]= useState<number>(57.7084641)
    const [zoom, setzoom ]= useState<number>(10)

    // skicka till apit för att lägga kor till fråga
     const [latToQuestion, setlatToQuestion] = useState<number>()
    const [lngToQuestion, setlngToQuestion] = useState<number>()
    localStorage.setItem('latitude', JSON.stringify(latToQuestion))
    localStorage.setItem('longitude',JSON.stringify(lngToQuestion))

    useEffect(()=>{

        if(mapGL.current || !mapContainer.current) return
  
        mapGL.current = new MapGl({
          container: mapContainer.current, // container ID
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [lng, lat], // starting position [lng, lat]
          zoom: 9, // starting zoom
          });

          const map: MapGl = mapGL.current
         
          map.on('move',()=>{
            const position = map.getCenter()
            setlat(Number(position.lat.toFixed(7)))
            setlng(Number(position.lng.toFixed(7)))
            setzoom(map.getZoom())
          }) 

          map.on('click',(e)=>{
            console.log(e)
            setlatToQuestion(e.lngLat.lat)
            setlngToQuestion(e.lngLat.lng)
          })

      },[lat, lng, zoom])

      const getPositionCordinate= async()=>{
        try{   
        let position: PositionGeolocation  = await geolocation()
        console.log(position.latitude)
        setlat(position.latitude)
        setlng(position.longitude)

      }catch(error){
        console.log('inga kordinater från din position')
      }

      }

      const ShowQuizes = async ()=>{
        await getQuizes( setGetQuiz )
      }
    const QuizElem = getQuiz.map((quiz)=>{
       return <Quiz quiz = { quiz } key={ quiz.userId}/>
    }) 

    return(
        <main className="quizview">
            <button onClick={ ()=>{  navigate('/LogIn') }}>Logga In</button>
            <button onClick={ ()=>{ navigate('/CreateUser')} }>Skapa användare</button>
            <button onClick={ getPositionCordinate }>Hitta Quiz nära dig</button>
            <button onClick={ ShowQuizes }>Visa Quiz</button>
            <article className='quiz__quizElem'>
                { QuizElem }
            </article>
            <section className='quiz__map'>
            <div ref={ mapContainer} className='map-container'></div>
            <p>Lattitude {lat} Longitude {lng}</p>
            </section>
        </main>

    )


}
export default PlayGame