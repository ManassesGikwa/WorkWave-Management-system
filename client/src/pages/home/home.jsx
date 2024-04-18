import Banner from "./Banner";
import Blog from "./Blog";
import WorkingStyle from "./WorkingStyle";
import Testimonials from "./Testimonials";

const home = () => {
    return (
        <div>
            <Banner></Banner>
            <Blog></Blog>
            <WorkingStyle></WorkingStyle>
            <Testimonials></Testimonials>
        </div>
    );
};

export default home;