import React from "react";
import BannerCss from "./Banner.scss";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner1.png";
import AwesomeSlider from 'react-awesome-slider';
import Product from "../Product/Product";
import Search from "../Search/Search";
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return(
        <div className="banner">
			<Search></Search>
		    <AutoplaySlider 
			    className='banner-carousell' 
			    cssModule={[BannerCss] }

			    play={true}
			    cancelOnInteraction={false}
			    interval={6000}
		    >
			    <div class="bannerPic" data-src={banner1} />
			    <div class="bannerPic" data-src={banner2} />

		    </AutoplaySlider>
            <Product></Product>
        </div>

    );
};


export default Banner