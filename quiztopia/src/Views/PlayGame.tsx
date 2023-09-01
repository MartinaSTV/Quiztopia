import { useNavigate } from "react-router-dom";
import './PlayGame.scss'
import geolocation from "../GetData/Geolocation";
import { getQuizes } from "../GetData/QuizAPI";
import Quiz from "../components/Quiz";
import {useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { LngLat, Map as MapGl }from 'mapbox-gl';
import './QuizView.scss'
mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY as string

const PlayGame = ()=>{
    const navigate = useNavigate()
    const [getQuiz, setGetQuiz] = useState<QuizesResponse[] | []>([])
    const [selectedQuestions, setSelectedQuestions] = useState<QuizResponseQuestions[]>([])

    const token = localStorage.getItem('token')
    if(token === ''){ navigate('/LoggedOut')}

    const mapContainer = useRef(null)
    const mapGL = useRef<MapGl | null>(null)
    //visar cordinater på karta från geolocation
    const [lng, setlng ]= useState<number>(11.9875166)
    const [lat, setlat ]= useState<number>(57.7084641)
    console.log(lng ,lat ,'dessa lordinater till map')
    const [zoom, setzoom ]= useState<number>(10)
 
    // skicka till apit för att lägga kordinationer till fråga
    const [latToQuestion, setlatToQuestion] = useState<number>()
    const [lngToQuestion, setlngToQuestion] = useState<number>()
    console.log(latToQuestion,'lat to guestion usetstate')
    localStorage.setItem('latitude', JSON.stringify(latToQuestion))
    localStorage.setItem('longitude',JSON.stringify(lngToQuestion))

    useEffect(()=>{

        getPositionCordinate()

        if(mapGL.current || !mapContainer.current) return
  
        mapGL.current = new MapGl({
          container: mapContainer.current, // container ID
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [lng, lat], // starting position [lng, lat]
          zoom: 9, // starting zoom
          });

          const map: MapGl = mapGL.current
          
          map.on('move',()=>{
            map.getCenter()
            setzoom(map.getZoom())
          }) 

          map.on('click',(e)=>{
            console.log(e)
            
            const markerlocation =  new mapboxgl.Marker({color:'#006985', draggable:true})
            markerlocation.setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);

            const lngLat = markerlocation.getLngLat()
            console.log(lngLat.lat,'markerslocaton')
            setlatToQuestion(lngLat.lat)
            setlngToQuestion(lngLat.lng)

           // vid knapp trycket skicka fråga quizez createquiz
            //const remove = markerlocation.remove(mapGL.current)
           
          })

      },[lat, lng, zoom])


      const getPositionCordinate = async ()=>{
        try{   
        let positionGeo: PositionGeolocation  = await geolocation()
        console.log(positionGeo.latitude,'posiyion KARTA', positionGeo.longitude)
        setlat(positionGeo.latitude)
        setlng(positionGeo.longitude)

        if(mapGL.current === null) {
            //Skriv ut att din position kan inte hittas
       } else{ 
        const markerUserPosition =  new mapboxgl.Marker({color:'#FF69B4', draggable:true})
        markerUserPosition.setLngLat([positionGeo.longitude, positionGeo.latitude])
        markerUserPosition.setPopup(new mapboxgl.Popup().setHTML("<h1>Du är här</h1>"))
        .addTo(mapGL.current);

        mapGL.current.on('mouseenter',() =>{
            markerUserPosition.setPopup(new mapboxgl.Popup().setHTML("<h1>Du är här</h1>"))
        })
         }

      }catch(error){
        console.log('inga kordinater från din position')
      }

      }
      const ShowQuizes = async ()=>{
        await getQuizes( setGetQuiz )
      }

      const showQuestionsOnMap = (questions: QuizResponseQuestions[]) => {
          setSelectedQuestions(questions)
      }
      
    const QuizElem = getQuiz.map((quiz, index)=>{
       return <Quiz quiz = { quiz } showQuestions={ showQuestionsOnMap } key={ index }/>
    }) 

    useEffect(() => {
        console.log('selectdQuestions är: ', selectedQuestions); 

        selectedQuestions.forEach(question => {
            if( question.location.latitude ==='undefined' || question.location.longitude === 'undefined') return
            if(mapGL.current === null) return
            const markerlocation =  new mapboxgl.Marker({color:'#d6bd8b'})
            console.log('Location: ', question.location, typeof(question.location.longitude))
            markerlocation.setLngLat([Number(question.location.longitude), Number(question.location.latitude)])
            markerlocation.addTo(mapGL.current);
        })
    }, [selectedQuestions])

    return(
        <main className="quizview">
            <button onClick={ ()=>{  navigate('/LogIn') }}>Logga In</button>
            <button onClick={ ()=>{ navigate('/CreateUser')} }>Skapa användare</button>
            <button onClick={ ShowQuizes }>Visa Quiz</button>
            <article className='quizview__quizElem'>
                { QuizElem }
            </article>
            <section className='quizview__map'>
            <div ref={ mapContainer} className='map-container'></div>
            <p>Lattitude {lat} Longitude {lng}</p>
            </section>
        </main>
    )
}
export default PlayGame