import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email + " " + password);


        signInUser(email, password)
            .then(result => {
                console.log(result.user);

                toast("Welcome back,You're now in.");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            )
            .catch(error => {
                console.error(error);
                if (error.code === 'auth/user-not-found') {
                    toast('Check-out the email you provided.');
                } else if (error.code === 'auth/wrong-password') {
                    toast('That is not your password.');
                } else {
                    toast('Login failed: ' + error.message);
                }
                navigate("/login");
            }
            )
    }


    return (
        <div className="grid lg:grid-cols-5 grid-cols-2">

            <div className=" col-span-2 flex flex-col items-center justify-center">

                <h2 className="text-4xl font-bold mt-8">Karibu Tena!</h2>
                <p className="text-base font-medium mt-6 mb-4">Enter Your Details</p>
                
                <div className="flex flex-col justify-center items-center">
                    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center" action="">
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Type Email" type="email" name="email" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Input Password" type="password" name="password" required />
                        <input className=" cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Login"} />
                    </form>
                    <Link to={"/register"} className="text-base font-bold text-black">New Here? Please Signup</Link>
                </div>

                <ToastContainer />
            </div>
            <div className="flex justify-center items-center col-span-3">
                <img className="w-3/4" src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg" alt="" />
            </div>
        </div>
    );
};

export default Login;