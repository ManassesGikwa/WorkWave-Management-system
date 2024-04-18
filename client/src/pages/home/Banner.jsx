
const Banner = () => {
    return (
        <div>
            <div className="mt-4">
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src="https://princetoninternetmarketing.com/wp-content/uploads/2017/02/seo-working.jpg" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-square">prev</a>
                            <a href="#slide2" className="btn btn-square">nxt</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src="https://mlgurvlmmgnk.i.optimole.com/cb:XBER.507a3/w:847/h:300/q:mauto/f:avif/https://digijar.co.in/wp-content/uploads/2023/08/careers-banner-generic-1.jpg" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-square">prev</a>
                            <a href="#slide3" className="btn btn-square">nxt</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src="https://www.a4fertility.com/img/career-banner.webp" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-square">prev</a>
                            <a href="#slide1" className="btn btn-square">nxt</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;