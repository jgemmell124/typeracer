import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import { Alert, AlertTitle } from '@mui/material/';
import AuthContext from '../utils/AuthProvider'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function LogIn() {
  const [error, setError ] = React.useState(false)
  const [visible, setVisible ] = React.useState(false)
  const [resp, setResp] = React.useState('');

  let {loginUser} = React.useContext(AuthContext)

  const handleClickShowPassword = () => {
    setVisible(prev => !prev)
  }

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser(event)
    if (data.get('password').length === 0 ) {
      setError(true);
      return
    }
    let message = { "username": data.get('username'),
                    "password": data.get('password'),
                  }
    console.log(JSON.stringify(message))
    fetch(`http://127.0.0.1:8000/api/token/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    }).then(response => response.json())
    .then(data => {
      if (data?.detail) {
        setResp(data.detail)
      }
      else {
        setResp('')
      }
      console.log('Success:', data);
      
    })
    .catch((error) => {
      console.error('Error:', error);
      setResp('Error communicating with server, try again later')
    })};


  return (
    <Container style={{backgroundColor: 'whitesmoke', borderRadius:'5px', borderColor: 'black', borderWidth: '2px'}} maxWidth="xs">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'green' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoComplete="off"
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={visible ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    error={error}
                    helperText={error ? "Password cannot be empty" : null }
                    onChange={(e) => setError(false)}
                    InputProps={{
                    endAdornment:
                     <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      > 
                      {visible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }}
                  />
                </Grid>
              </Grid>
              { resp === '' ? 
              null :
              <Alert style={{marginTop: '6px'}}variant='filled' severity="error">
                 <AlertTitle>Error</AlertTitle>
                  {resp}
              </Alert>}
              { resp === 'S' ? 
              
              <Alert variant='filled' severity="success">
                  Signed in Successfully!
              </Alert> : null}  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Create one
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Container>
  );
}