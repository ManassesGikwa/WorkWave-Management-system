import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



//const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
//const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

//the users can now login as either of these
    const role = [
        { name: 'Employee' },
        { name: 'Manager' },
        { name: 'Administrator' },
    ]

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selected, setSelected] = useState(role[0]);


//allow the new user to input their details
    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const paymentMode = e.target.paymentMode.value;
        const location = e.target.location.value;
        const contact = e.target.contact.value;
        const salary = e.target.salary.value;
        const department = e.target.department.value;
        const password = e.target.password.value;
        const role = selected.name;

//const profile = {image: data.image[0]}
        console.log(name + " " + email + " " + role);
        const user = { name, email, accountNo, location, contact, salary, department, role }

//set minimum passward requirements
        if (password.length < 8) {
            toast("Ensure password is 8 characters and more.");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast("C'mmon, include an Uppercase letter");
            return;
        }
        else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            toast("Your password is missing a special character.");
            return;
        }

//set out the email requirements
        createUser(email, password)
            .then(result => {
                console.log(result.user);

                toast("Welcome Aboard! Account has been created.");

                updateProfile(result.user, {
                    displayName: name,
                })
                    .then()
                    .catch()

                fetch('https://employee-server-wine.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch(error => {
                console.error(error);
                toast(error.message);
            })
    }

    return (
        <div className="grid lg:grid-cols-5 grid-cols-2">

            <div className=" col-span-2 flex flex-col items-center justify-center">

                <h2 className="text-4xl mt-8 font-bold">Let's Create Your Account</h2>
                <p className="text-base font-medium mt-6 mb-4">Enter Your Details</p>
               
                <div className="flex flex-col justify-center items-center">
                    <form onSubmit={handleRegister} className="flex flex-col justify-center items-center" action="">
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Full Name" type="text" name="name" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Email" type="email" name="email" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Preffered Mode of Payment" type="text" name="paymentMode" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Location" type="location" name="location" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Contact" type="email" name="email" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Salary" type="text" name="salary" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Department" type="text" name="department" required />
                        <input className="h-10 rounded-2xl mt-4 file-input file-input-bordered  w-full max-w-xs" type="file" name="image" />

                        <Listbox className="" value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                                <Listbox.Button className="border px-6 py-2 font-semibold text-lg text-black rounded-2xl mt-4 w-80 relative cursor-default bg-white text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {role.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={person}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {person.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Input Password" type="password" name="password" required />
                        <input className="cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Create Account"} />
                    </form>
                    <Link to={"/login"} className="text-base font-bold text-black">Your Account Exists,Click LogIn.</Link>
                </div>
                <ToastContainer />

            </div>
            <div className="flex justify-center items-center col-span-3">
                <img className="w-3/4" src="https://harrisongreetings.com/wp-content/uploads/2023/01/8116-front.png" alt="" />
            </div>
        </div>
    );
};

export default Register;