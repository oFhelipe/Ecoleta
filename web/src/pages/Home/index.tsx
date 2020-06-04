import React, { useEffect, useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/logo.svg';

const Home = () =>{

    const [ success, setSuccess ] = useState<boolean>(true);

    useEffect(()=>{

        if(success == true){
            setSuccess(true);
            setTimeout(()=>{setSuccess(false);}, 2000);
        }

    },[]);

    return(
        <div id="page-home">
            <div className="content">
                    <div id="alert_created_user" style={success ? {display:'flex'} : {}} >
                        <FiCheckCircle id="check_icon" />
                        <h1 id="success_cad">Cadastro concluído!</h1>
                    </div>         
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                
                    <Link to="/create-point" >
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadsatre um ponto de coleta</strong>
                    </Link>

                </main>
            </div>
        </div>
    );
}

export default Home;