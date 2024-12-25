import Banner from "../Components/Banner";
import DriversSection from "../Components/DriversSection";
import RecentListings from "../Components/RecentListings";
import WhyChooseUs from "../Components/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <DriversSection></DriversSection>
        </div>
    );
};

export default Home;