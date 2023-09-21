import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem('jwt')
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role');
        console.log(role)

        if (role.toLowerCase() === 'administrateur'){
            navigate('/admin/home')
        } if (role.toLowerCase() === 'user'){
            navigate('/user/home')
        }
        if(role.toLowerCase() === 'invite'){
            navigate('/invite')
        }
    }, [navigate]);
}

export default Home
