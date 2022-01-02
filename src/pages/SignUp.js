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

export function SignUp() {
  const [error, setError ] = React.useState(false)
  const [visible, setVisible ] = React.useState(false)
  const [taken, setTaken ] = React.useState(false)
  // send the current username to the server, server checks if its valid and sends back info

  const checkUsername = async (event) => {
    let message = { 'username': `${event.target.value}`}
    fetch(`http://127.0.0.1:8000/api/usernames/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    }).then(
      (response) =>  {
        console.log(response)
        if (!response.ok) {
          setTaken(true); 
        }
        else {
          setTaken(false);
        }
      }
    )
  }

  const handleClickShowPassword = () => {
    setVisible(prev => !prev)
  }

  const [resp, setResp] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== data.get('password2') || data.get('password') === '') {
      setError(true);
      return
    }
    let message = { "username": data.get('username'),
                    "email":    data.get('email'),
                    "password": data.get('password'),
                  }
    console.log(JSON.stringify(message))
    fetch(`http://127.0.0.1:8000/api/create-user/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    }).then(response => response.json())
    .then(data => {
      if (data.error?.email) {
        setResp(data.error.email)
      }
      else if (data.error?.non_field_errors) {
        setResp(data.error.non_field_errors[0])
      }
      else if (data.error?.username) {
        setResp(data.error.username[0])
      }
      else {
        //TODO LOGIN AFTER SUCCESSFUL SIGN UP AND REDIRECT TO HOME
        setResp('S')
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
              Sign up
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
                    onChange={(e) => checkUsername(e)}
                    helperText={taken ? "Username already taken" : null }
                    error={taken}
                    autoComplete="off"
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type={visible ? "text" : "password"}
                    id="password2"
                    autoComplete="new-password2"
                    error={error}
                    helperText={error ? "Passwords do not match" : null }
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              { resp === '' || resp === 'S' ? 
              null :
              <Alert variant='filled' severity="error">
                 <AlertTitle>Error</AlertTitle>
                  {resp}
              </Alert>}
              { resp === 'S' ? 
              
              <Alert variant='filled' severity="success">
                  Account Created Successfully!
              </Alert> : null}  
              <Button
                disabled={taken}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
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