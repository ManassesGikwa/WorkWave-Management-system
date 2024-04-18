
const Blog = () => {
    return (
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-10">
                <img className="w-full" src="https://www.kindpng.com/picc/m/108-1080127_social-media-apps-on-mobile-phone-on-social.png" alt="" />
            </div>
            <div className="md:w-1/2 p-10">
                <h2 className="text-5xl font-semibold mt-8">Checkout our Social Platforms!</h2>
                <p className="text-2xl font-medium my-6">Like. Follow. Comment.<br />Stay Updated.</p>
            </div>
        </div>
    );
};

export default Blog;