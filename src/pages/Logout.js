import { Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LogOut(props) {
  let navigate = useNavigate();
  return (
    <Box style={{textAlign: "center", marginTop: "15%", marginBottom: "15%"}}>
      <h1>You have successfully logged out!</h1>
      <Grid sx={{ '& button': { m: 1 } }}>
        <div><Button variant="contained" size="large" onClick={() => navigate("/login")}> Log in </Button> </div>
        <div><Button variant="contained" size="medium" onClick={() => navigate("/")}> Return Home </Button></div>
      </Grid>
    </Box>
  )

}