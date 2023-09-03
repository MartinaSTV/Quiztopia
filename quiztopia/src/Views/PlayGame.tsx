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

interface PropsSetlingSetlat{
    setlngToQuestion: React.Dispatch<React.SetStateAction<number>>
    setlatToQuestion:  React.Dispatch<React.SetStateAction<number>>
    click: number
}

const PlayGame = ({ setlngToQuestion, setlatToQuestion , click }: PropsSetlingSetlat)=>{
    const navigate = useNavigate()
    const [quizesResponse, setGetQuiz] = useState<QuizesResponse[] | []>([])
    const [selectedQuestions, setSelectedQuestions] = useState<QuizResponseQuestions[]>([])

    const mapContainer = useRef(null)
    const mapGL = useRef<MapGl | null>(null)

    //visar cordinater på karta från geolocation
    const [lng, setlng ]= useState<number>(11.9875166)
    const [lat, setlat ]= useState<number>(57.7084641)
    const [zoom, setzoom ]= useState<number>(10)

    useEffect(()=>{

        getPositionCordinate()

        if(mapGL.current || !mapContainer.current) return
  
        mapGL.current = new MapGl({
          container: mapContainer.current, 
          style: 'mapbox://styles/mapbox/streets-v12', 
          center: [lng, lat],
          zoom: 9,
          });

          const map: MapGl = mapGL.current
          map.on('move',()=>{
            map.getCenter()
            setzoom(map.getZoom())
          }) 

          map.on('click',(e)=>{
            console.log(e)

            const token: string = (localStorage.getItem('token') || '')

            if(token === ''){ 
                console.log('Du måste logga in för att clicka i cordinater')
            }else {
            
            const markerlocation =  new mapboxgl.Marker({color:'#006985'})
            markerlocation.setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);

            const lngLat = markerlocation.getLngLat()
            setlatToQuestion(lngLat.lat)
            setlngToQuestion(lngLat.lng)
            click++

           console.log(click)
            if (click > 1 ){
                markerlocation.remove()
            }

            //funkar ej
            if( click === 0){
                markerlocation.remove()
            }


            }

          })

      },[lat, lng, zoom])

      const getPositionCordinate = async ()=>{
        try{   
        let positionGeo: PositionGeolocation  = await geolocation()
        setlat(positionGeo.latitude)
        setlng(positionGeo.longitude)

        if(mapGL.current === null) {
            //Skriv ut att din position kan inte hittas
            console.log(' tillåt din position för att använda app ')
       } else{ 
        const markerUserPosition =  new mapboxgl.Marker({color:'#FF69B4'})
        markerUserPosition.setLngLat([positionGeo.longitude, positionGeo.latitude])
        markerUserPosition.setPopup(new mapboxgl.Popup().setHTML("<h1>Du är här</h1>"))
        markerUserPosition.togglePopup()
        .addTo(mapGL.current);
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
      
    const QuizElem = quizesResponse.map((quiz, index)=>{
       return <Quiz quiz = { quiz } showQuestions = { showQuestionsOnMap } key = { index }/>
    }) 

    useEffect(() => {
        console.log('selectdQuestions är: ', selectedQuestions); 

        selectedQuestions.forEach(question => {
            if( question.location.latitude ==='undefined' || question.location.longitude === 'undefined' ) return 
            if( question.location.latitude > 90 && question.location.latitude <-90  || question.location.longitude > 90 && question.location.longitude < -90) return 

            if(mapGL.current === null) return
            const markerlocation =  new mapboxgl.Marker({color:'#d6bd8b'})
           // console.log('Location: ', question.location, typeof(question.location.longitude))
            markerlocation.setLngLat([Number(question.location.longitude), Number(question.location.latitude)])
            markerlocation.addTo(mapGL.current);
            markerlocation.setPopup(new mapboxgl.Popup().setHTML(`<h1>${ question.question } Svar: ${ question.answer}</h1>`))
            .addTo(mapGL.current)

        })
    }, [selectedQuestions])

    return(
        <main className="quizview">
            <button onClick={ ()=>{  navigate('/LogIn') }}>Logga In</button>
            <button onClick={ ()=>{ navigate('/CreateUser')} }>Skapa användare</button>
            <button onClick={ ShowQuizes }>Visa alla Quiz</button>
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