import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
const LOGIN_URL = process.env.LOGIN_URL

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [passe, setPasse] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setSuccess(false);
    }, [])
    

    useEffect(() => {
      setErrMsg('');
    }, [email, passe])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({email, pass: passe}),
                credentials: 'include'
            }
            
            )

            const data = await response.json();

            const user = data?.email;
            const name = data?.name;

            setAuth({ email: user, name });
            navigate('/');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Servidor parou de responder');
            } else if (err.response?.status === 400) {
                setErrMsg('Email ou palavra-passe incorretos.');
            } else if (err.response?.status === 401) {
                setErrMsg('Não autorizado');
            } else {
                setErrMsg('Falha no login');
            }
            errRef.current.focus();
        }
    }

    
    return (
        <div className="flex justify-center xs:h-screen sm:h-screen md:h-auto lg:h-auto h-screen">
            <section className="xs:w-full sm:w-full md:w-1/2 lg:w-1/3 w-full bg-gray-100 rounded-lg p-8 flex flex-col xs:mt-0 sm:mt-0 md:mt-10 lg:mt-10">                
                    <h2 className="text-xl text-gray-900 font-medium mb-5">Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-gray-600">
                                Email
                            </label>
                            <input 
                                type="email"
                                id="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-outS"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                value={email}
                            />
    
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="password"  className="leading-7 text-gray-600">
                                Palavra-passe:
                            </label>
                            <input 
                                type="password"
                                id="password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-outS"
                                onChange={(e) => setPasse(e.target.value)}
                                required
                                value={passe}
                            />
                        </div>
                        <p ref={errRef} className={errMsg ? "errmsg text-red-500 mb-3 text-center" : "offscreen"} aria-live="assertlive">{errMsg}</p>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-3 self-center">
                    </p>
            </section>
        </div>
    )
}

export default Login