import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import "./Login.css"

function Login(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token){
    const decodedToken = jwt_decode(token)
    if(decodedToken.exp){
    navigate('/home')

    } else {
    localStorage.removeItem('jwt');
    navigate('/')
    }
          
    } 
    }, [navigate])

    //Gestionnaire d'évenement lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email : email,
            password : password
        }
        //Configuration de axios pour resoudre les problème CROSS
        axios.defaults.withCredentials = true;

        // axios.post('http://192.168.16.244:4000/api/auth/login', formData)
        axios.post('http://localhost:4000/api/auth/connect', formData)
        .then((response) => {
            const token = response.data.token;
            const role = response.data.role;
            const id = response.data.id;
            const role2 = response.data.role2;

            localStorage.setItem('jwt', token);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);
            localStorage.setItem('role2', role2);

            // Cookies.set('jwt', token)
            console.log(response)
            navigate('/home');
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return(
        <div className="login">
           <h1 className="login-title">Connexion</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label className="login-label">Adresse email</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="login-input"/>
                </div>
                <div>
                    <label className="login-label">Mot de passe</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="login-input"/>
                </div>
                <button type="submit" className="login-button">Se connecter </button>
            </form> 
            <Link to="/password/reset_request/" className="login-link"> Mot de passe oublié ? Cliquez ici pour le réinitialiser</Link>
        </div>
    )
}

export default Login;