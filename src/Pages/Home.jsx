import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import DriversSection from "../Components/DriversSection";
import RecentListings from "../Components/RecentListings";
import SpecialOffers from "../Components/SpecialOffers";
import WhyChooseUs from "../Components/WhyChooseUs";
import TestimonialsSlider from "../Components/TestimonialsSlider";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NeoDrive | Home</title>
            </Helmet>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <SpecialOffers></SpecialOffers>
            <DriversSection></DriversSection>
            <TestimonialsSlider></TestimonialsSlider>
           
        </div>
    );
};

export default Home;