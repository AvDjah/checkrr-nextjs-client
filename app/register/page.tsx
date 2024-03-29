"use client"


import Link from "next/link";
import {useState} from "react";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useRouter} from "next/navigation";

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const router = useRouter()

    const registerClick = async () => {
        if (username.length === 0 || password.length === 0) {
            toast.error("Enter correct values", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            })
            return
        }
        fetch("http://localhost:8080/user/register", {
            method: "POST",
            body: JSON.stringify({
                userId: username,
                password,
                name
            }),
            credentials: "include",
            mode: "cors"
        }).then(async res => {
            if (res.status === 201) {
                return res.json()
            } else {
                const json = await res.json()
                toast.error(json, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                })
                throw new Error(json)
            }
        }).then(res => {
            console.log("console log:", res)
            setUsername("")
            setPassword("")
            router.push("/login")

        }).catch(e => console.log("error: ", e))
    }


    return (
        <div className={"mt-10"}>
            <ToastContainer/>
            <div className={"mx-auto bg-white shadow-2xl  w-96 md:w-128 rounded-xl p-8"}>
                <div className={"font-header text-2xl"}>Register</div>
                <div className={"flex flex-col md:flex-row justify-between items-center"}>
                    <div className={"mt-4 font-content"}>
                        <div className={"md:mt-4 mt-2"}>
                            <label
                                className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                                Name</label>
                            <input value={name} onChange={e => setName(e.target.value)}
                                   className={"rounded-xl block  outline-none bg-gray-100  text-xl p-4"}/>
                        </div>
                        <div className={"md:mt-4 mt-2"}>
                            <label
                                className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                                Username</label>
                            <input value={username} onChange={e => setUsername(e.target.value)}
                                   className={"rounded-xl block  outline-none bg-gray-100  text-xl p-4"}/>
                        </div>
                        <div className={"md:mt-4 mt-2"}>
                            <label
                                className={" text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                                Password</label>
                            <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}
                                   className={"rounded-xl block  outline-none bg-gray-100  text-xl p-4"}/>
                        </div>
                    </div>
                    <div className={"mt-4 md:mt-0"}>
                        <button onClick={registerClick}
                                className={"transition-all text-lg text-center duration-75 ease-in p-3 rounded-xl ring-offset-2 ring-offset-slate-50 active:ring-2 ring-blue-300 bg-amber-100 hover:bg-amber-200 active:bg-amber-400"}>Register
                        </button>
                    </div>
                </div>
                <Link href={"/login"}>
                    <div
                        className={" transition-all ease-in-out font-header text-blue-400 mt-8 ml-2 cursor-pointer hover:scale-105 hover:translate-x-4"}>Already
                        have an account
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    )
}