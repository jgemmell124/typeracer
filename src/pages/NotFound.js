import { Button, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NotFound(props) {
  let navigate = useNavigate();
  return (
    <Box style={{textAlign: "center", marginTop: "15%", marginBottom: "15%"}}>
      <h1>Oops! Page not found</h1>
      <h3>404 Page Not Found</h3>
      <Button variant="contained" size="large" onClick={() => navigate("/")}> Return Home </Button>
    </Box>
  )

}