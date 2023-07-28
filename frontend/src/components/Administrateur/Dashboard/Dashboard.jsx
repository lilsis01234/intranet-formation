import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [maleCollab, setMalCollab] = useState(0);
    const [femaleCollab, setFemaleCollab] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        console.log(token);
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "Administrateur")){
            navigate('/home');
        }

    })

    useEffect(()=> {
        axios
            .get("http://192.168.16.244:4001/api/collaborateur/all_collaborateurs")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        const maleCollab = data.filter((item) => item.sexe === 'Masculin');
        const femaleCollab = data.filter((item) => item.sexe === 'Féminin');
        setMalCollab(maleCollab.length);
        setFemaleCollab(femaleCollab.length);
    }, [data]);

    const chartData = {
        labels : ['Homme', 'Femme'],
        datasets : [
            {
                label : '',
                data : [maleCollab, femaleCollab],
                backgroundColor : [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderWidth : 1,
                borderColor : "#9C1D21",
            }
        ]
    }

    const chartOptions = {
        responsive : true,
        maintainAspectRatio: false,
        width : 150,
        height : 350,
        plugins : {
            legend : {
                display : true,
                position: 'bottom'
            },
        },
    }


  return (
    <div className="dashboard">
        <div className="dashboard_graph">
            <Pie data={chartData} options ={chartOptions} />
        </div>
        <div className="dashboard_description">
            Texte à ajouter, description
        </div>
    </div>
  )
}

export default Dashboard;