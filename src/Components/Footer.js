
import '../Styles/Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';


export function Footer() {
  return (
    <div id="footer" >
      <span>Built by John Gemmell</span>
      <p><a id="bug" style={{color: "inherit"}} href="mailto:gemmell.j@northeastern.edu">Report a Bug <BugReportIcon fontSize="small"/></a></p>
      <p><a id="bug" style={{color: "inherit"}} href="https://github.com/jgemmell124/typeracer" target="_blank">View Source Code <GitHubIcon fontSize="small"/></a></p> 
    </div>
  )
}