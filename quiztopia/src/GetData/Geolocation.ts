interface Position{
    latitude: number;
    longitude: number;
}

const geolocation = async (): Promise<Position>=>{

    return new Promise ((resolve, reject) => {
        if( 'geolocation' in navigator){

                navigator.geolocation.getCurrentPosition(pos => {

                    const position: Position = {
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
            return { 
                latitude: 57.7084641,
                longitude: 11.9875166
            }
    })
    }
export default geolocation