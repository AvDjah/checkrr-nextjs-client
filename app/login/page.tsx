'use client'

import Link from "next/link";
import {useState} from "react";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const loginClick = () => {
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

        fetch("http://localhost:8080/user/authenticate", {
            method: "POST",
            body: JSON.stringify({
                userId: username,
                password
            }),
            credentials: "include",
            mode: "cors"
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                toast.error("Wrong Password")
                throw new Error("Invalid Authentication")
            }
        }).then(res => {
            console.log("res: ", res)
            router.push("/")
        }).catch(e => console.log("err: ", e))


    }

    const checkLogin = () => {
        fetch("http://localhost:8080/user/details", {
            credentials: "include",
            method: "GET"
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Issue in request")
                return {}
            }
        }).then(res => {
            console.log("res")
        }).catch(e => console.log("err:", e))
    }

    return (
        <div className={"mt-10"}>
            <ToastContainer/>
            <div className={"bg-white mx-auto shadow-2xl w-2/3 md:w-128 rounded-xl p-8"} style={{width: "600px"}}>
                <div className={"font-header ml-2 text-2xl"}>
                    Login
                </div>
                <div className={"flex flex-col md:flex-row justify-between  items-center"}>
                    <div className={"mt-4 flex flex-col  font-content"}>
                        <div className={"md:mt-4 mt-2"}>
                            <label
                                className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                                Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)}
                                   className={"rounded-xl block  outline-none bg-gray-100  text-xl p-4"}/>
                        </div>
                        <div className={"md:mt-4 mt-2"}>
                            <label
                                className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                                Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={"password"}
                                   className={"rounded-xl block  outline-none bg-gray-100  text-xl p-4"}/>
                        </div>
                    </div>
                    <div className={"mt-8 text-xl md:ml-8 ml-4"}>
                        <button onClick={loginClick}
                                className={"bg-amber-100 hover:bg-amber-200 active:bg-amber-400 transition-all ease-in p-3 rounded-xl " +
                                    " active:ring-2 hover:ring-2 ring-offset-2 ring-offset-slate-50 ring-amber-500"}>Login
                        </button>
                        <button onClick={checkLogin}
                                className={"bg-amber-100 hover:bg-amber-200 active:bg-amber-400 transition-all ease-in p-3 rounded-xl " +
                                    " active:ring-2 hover:ring-2 ring-offset-2 ring-offset-slate-50 ring-amber-500"}>Check
                        </button>
                    </div>
                </div>
                <Link href={"/register"}>
                    <div
                        className={" transition-all ease-in-out font-header text-blue-400 mt-8 ml-2 cursor-pointer hover:scale-105 hover:translate-x-4"}>Register
                        Now
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