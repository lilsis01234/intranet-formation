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
            // console.log('Redirection vers le page administrateur');
        } if (role.toLowerCase() === 'user'){
            navigate('/user/profile')//A changer quand une nouvelle module soit installer
            // console.log('Redirection vers le page user')
        }
        if(role.toLowerCase() === 'invite'){
            console.log('io fa nitovy')
            navigate('/invite')
        }
    }, [navigate]);
}

export default Home
