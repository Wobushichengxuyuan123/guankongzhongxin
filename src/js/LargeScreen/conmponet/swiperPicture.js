import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay]);
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Pic: []
        }
    }
    componentDidMount() {
        this.Piclists()
    }
    Piclists() {
        fetch("nelda-smcc/video/file")
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    this.setState({
                        Pic: b.data
                    })
                }
            })
    }
    openimg(item) {
        this.props.openImg.openImg2(item)
    }
    render() {
        const { Pic } = this.state
        return (
            <Swiper style={{ height: '100%', cursor: 'pointer' }}
                pagination={{ clickable: true }}
                spaceBetween={30}
                effect={'fade'}
                autoplay={true}
                loop={true}
                navigation={true}
                keyboard={{ "enabled": true }}
                className="mySwiper" >
                {
                    Pic.map((item, index) => {
                        let src = item.split('.').pop()
                        if (src == 'png' || src == 'jpg') {
                            return <SwiperSlide key={index} >
                                <img style={{ width: '100%', height: '100%' }} src={item} key={index} onClick={this.openimg.bind(this, item)} />
                            </SwiperSlide>
                        }
                    })
                }
            </Swiper >
        )
    }
}

export default Video