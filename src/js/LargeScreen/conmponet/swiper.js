
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import './css/index.css'
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Keyboard, Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Keyboard, Navigation, Pagination]);

export default function App() {
    const [video, setvideo] = useState([])
    let videolists = () => {
        fetch("nelda-smcc/video/file")
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    setvideo(b.data)
                }
            })
    }
    useEffect(() => {
        videolists()
    }, [])
    return (
        <Swiper style={{ height: '100%' }}
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            keyboard={{ "enabled": true }}
            className="mySwiper"
            onSlideChange={(swiper) => {
                var videos = document.getElementsByTagName('video')
                for (var i = 0; i < videos.length; i++) {
                    videos[i].pause()
                }
            }}>
            {video.map((item, index) => {
                let src = item.split('.').pop()
                if (src == 'mp4') {
                    return <SwiperSlide key={index}>
                        <video style={{ width: '100%', height: '100%' }} src={item} key={index} controls="controls" className='video' />
                    </SwiperSlide>
                }
            })}
        </Swiper>
    )
}