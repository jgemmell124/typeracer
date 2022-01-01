import { Button, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const isMobile = window.innerWidth < 600;



// TESTING THE API remember to delete
export function Users(props) {

  const [users, setUsers] = useState(null)


  const getUsers = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/users')
    let data = await response.json()
    console.log(data)
    setUsers(data)
  }

  var margin = (!isMobile ? {marginRight: '30%',
  marginLeft: '30%'} : {marginRight: '5%',
  marginLeft: '5%'});

  useEffect(() => {
    getUsers();
  }, [])

  const userDetails = () => {
    var userList = null;
    if (!isMobile) {
    userList = users.map((user, key) => 
    <Item key={key} style={margin}>
      <Stack
        direction="row"
        alignItems="center"
        
        spacing={2}>
        <Item  style={{maxWidth: '30%'}}>
          <img src={`http://127.0.0.1:8000${user.profile_image}`} style={{width: '100%', height: 'auto'}} />
        </Item>
        <Item style={{boxShadow:'none'}}></Item>
        <Item   style={{textAlign:'center', maxWidth: '100%', boxShadow:'none'}}>
          <div>
            <h2>{user.username} </h2>
          </div>
          <div>
            <p>- Avg WPM: {user.average_wpm}</p>
            <p>- Best WPM {user.best_wpm}</p>
          </div>
        </Item>
      </Stack>
      {/* <h2>{user.username} </h2>
      <p>- Avg WPM: {user.average_wpm}</p>
      <p>- Best WPM {user.best_wpm}</p> */}

    </Item> )}
    else {
      userList = users.map((user, key) => 
      <Item key={key} style={margin}>
        <h2>{user.username} <img src={`http://127.0.0.1:8000${user.profile_img}`} style={{width: '250px', height: 'auto'}} /></h2>
        <p>- Avg WPM: {user.average_wpm}</p>
        <p>- Best WPM {user.best_wpm}</p>
    
      </Item>
    )}
    return userList
  }


  let navigate = useNavigate();

  return (
    <Box style={{textAlign: "center", marginTop: "15%", marginBottom: "15%"}}>
      <h1>All Users</h1>
      {users ? <Stack style={{textAlign: "center"}} spacing={4}>{userDetails()}</Stack> : <CircularProgress /> }
      <Grid sx={{ '& button': { m: 1 } }} style={{marginTop: '5%'}}>
        <div><Button variant="contained" size="large" onClick={() => navigate("/")}> Return Home </Button></div>
      </Grid>
    </Box>
  )

}