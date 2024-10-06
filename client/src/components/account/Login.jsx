import { useState, useContext, useEffect } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../contents/Dataprov';
import { useNavigate } from 'react-router-dom';

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
};

const loginInitialValues = {
    username: '',
    password: ''
};

const Login = ({isUserAuthenticated}) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError('');
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });

            // Assuming this is a state update or method
            isUserAuthenticated(true);

            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! Please try again later');
        }
    };
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! Please try again later');
        }
    };
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };



    return (
        
        <Box sx={{ width: 300,mx: 'auto',boxShadow:'5px 2px 5px 2px rgb(0 0 0/0.6)'}}> 
            <img src={imageURL} alt='login'sx={{width:1/2,mx:'auto',display:'flex',padding:'50px 0px 0px'}}></img>
            {
                account === 'login' ? 
            <Box sx={{padding:'25px 35px', display:'flex',flex:'1',flexDirection:'column'}}>
            <TextField sx={{mt:'20px',}} variant='standard'label="Enter Username"/>
            <TextField sx={{mt:'20px'}}variant='standard' label="Enter Password" />
            <Button sx={{mt:'20px',textTransform:'none',bgcolor:'#FB6418',height:'48px',borderRadius:'2px'}} variant='contained'>Login</Button>
            <Typography sx={{mt:'20px' ,textAlign:'center' ,fontSize:'14px'}}>Or</Typography>
            <Button onClick={()=> toggleSignup} sx={{textTransform:'none',bgcolor:'#fff',color:'#2874f0',height:'48px',borderRadius:'2px'}}>Create an account</Button>
            </Box>
:
<Box sx={{padding:'25px 35px', display:'flex',flex:'1',flexDirection:'column'}}>
<TextField sx={{mt:'20px',}} variant='standard'label="Enter Name"/>
<TextField sx={{mt:'20px',}} variant='standard'label="Enter Username"/>
<TextField sx={{mt:'20px'}}variant='standard' label="Enter Password" />
{error && <Typography sx={{fontSize:'10px'}}>{error}  </Typography>}
<Button onClick={() => signupUser()} sx={{mt:'20px',textTransform:'none',bgcolor:'#FB6418',height:'48px',borderRadius:'2px'}} >Signup</Button>
<Typography sx={{mt:'20px' ,textAlign:'center' ,fontSize:'14px'}}>Or</Typography>
<Button onClick={() =>toggleSignup()} sx={{textTransform:'none',bgcolor:'#fff',color:'#2874f0',height:'48px',borderRadius:'2px'}} variant='contained'>Already have an account</Button>
            </Box>
}  
        </Box>
        
    );

}
export default Login
