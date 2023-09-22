import { useEffect, useState } from "react"

export default function Banner() {
    const [banners, setBanners] = useState([])
    useEffect(() => {
        fetch('/api/getBanners')
        .then(res => res.json())
        .then(banners => setBanners(banners))
        .catch((error) => console.log(error))
    }, [])

    
    return (
        <div id='banner'>
            {banners.map((banner, index) => (
                <h4 key={index} >{banner.banners[0] } &ensp; &ensp; &ensp; &ensp; &ensp; { banner.banners[1] } &ensp; &ensp; &ensp; &ensp; &ensp; { banner.banners[2] } &ensp; &ensp; &ensp; &ensp; &ensp; { banner.banners[1] }</h4>
            ))}
        </div>
    )
}