
const geolocation = async ()=>{

    return new Promise ((resolve, reject) => {
        if( 'geolocation' in navigator){

                navigator.geolocation.getCurrentPosition(pos => {

                    const position= {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                    resolve(position)
                    }, error => {
                    reject(error.message)
                })

            } else{
                reject('Kan inte använda din position')
            }
    })

        

    }
export default geolocation