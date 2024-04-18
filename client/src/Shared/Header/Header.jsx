import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import "./Header.css";

const Header = () => {

    const { user, signOutUser, isChecked } = useContext(AuthContext);

    const [isBtn, setIsBtn] = useState(false);

    const handleLogOut = () => {
        signOutUser()
            .then()
            .catch()
    }

    const handleLogOutToggle = () => {
        setIsBtn(!isBtn);
    }

    return (
        <div>
            <div className="navbar text-lg font-semibold py-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-32">
                            <NavLink activeclassname="active" to={"/"}>Home</NavLink>
                            <NavLink activeclassname="active" to={"/dashboard"}>Dashboard</NavLink>
                            <NavLink activeclassname="active" to={"/contact"}>Contact</NavLink>

                        </div>
                    </div>
                    <div className="hidden lg:flex">
                        <Link to={"/"}>
                            <div className="flex gap-3 items-center">
                                <img className="w-16" src="https://st2.depositphotos.com/3487615/6239/v/450/depositphotos_62396533-stock-illustration-innovation-idea-leaf-growth-logo.jpg" alt="Social Event" />
                                <h2 className="text-3xl font-bold text-[#E84F74]">WorkWave</h2>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center">
                    <div className="lg:flex gap-8 hidden">
                        <NavLink activeclassname="active" to={"/"}>Home</NavLink>
                       <NavLink activeclassname="active" to={"/dashboard"}>Dashboard</NavLink>
                        <NavLink activeclassname="active" to={"/contact"}>Inquiry</NavLink>
                    </div>
                    <div className="lg:hidden ">
                        <Link to={"/"}>
                            <div className="flex gap-3 items-center">
                                <img className="w-12" src="https://st2.depositphotos.com/3487615/6239/v/450/depositphotos_62396533-stock-illustration-innovation-idea-leaf-growth-logo.jpg" alt="Social Event" />
                                <h2 className="text-base font-bold text-[#E84F74] md:flex">ABS</h2>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="flex flex-col items-center justify-center gap-2 border p-2 rounded-lg font-bold">
                                {
                                    isBtn ?
                                        <div className="flex gap-2 justify-center items-center">
                                            <Link className={isChecked ? 'text-[#fff]' : 'text-[#181818]'} onClick={handleLogOut}>LogOut</Link>
                                            <button className="ml-4" onClick={handleLogOutToggle}>
                                                {
                                                    user.photoURL ? <img className="mask mask-circle w-12" src={user.photoURL} /> : <img className="mask mask-circle w-12" src="https://static.vecteezy.com/system/resources/previews/023/982/115/non_2x/robot-head-cyborg-face-on-transparent-background-created-with-generative-ai-png.png" />
                                                }
                                            </button>
                                        </div>
                                        :
                                        <div className="flex gap-2 justify-center items-center">
                                            <button onClick={handleLogOutToggle}>
                                                {
                                                    user.photoURL ? <img className="mask mask-circle w-12" src={user.photoURL} /> : <img className="mask mask-circle w-12" src="https://static.vecteezy.com/system/resources/previews/023/982/115/non_2x/robot-head-cyborg-face-on-transparent-background-created-with-generative-ai-png.pnghttps://static.vecteezy.com/system/resources/previews/023/982/115/non_2x/robot-head-cyborg-face-on-transparent-background-created-with-generative-ai-png.png" />
                                                }
                                            </button>
                                        </div>
                                }


                            </div>
                            :
                            <div className="flex gap-8">
                                <NavLink to={"/login"}>LogIn</NavLink>
                                <NavLink className="md:flex hidden" to={"/register"}>Register Now</NavLink>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;