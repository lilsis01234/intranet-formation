import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const HomeInvite = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem('jwt')
        if (!token){
            navigate('/');
        }
        const role2 = localStorage.getItem('role2');

        console.log(role2)

        if (role2.toLowerCase() === 'formateurext'){
            console.log('nitovy koa ito')
            navigate('/formateurExt')
        }
    }, [navigate]);
}

export default HomeInvite
