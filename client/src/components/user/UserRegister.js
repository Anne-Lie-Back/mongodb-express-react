import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        }
    }

    handleUsername = event => {
        this.setState({
            username: event.target.value
        })
    }

    handlePassword = event => {
        this.setState({
            password: event.target.value
        })
    }

    sendRegistrationRequest = async() => {
        let data = {
            "username": this.state.username,
            "password": this.state.password
        }
        await fetch(`http://localhost:9000/api/user/`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .catch((err) => {

                console.log(err)

        })
        .then((response) => {
                if(!response.ok){
                    this.setState({
                        errorMessage: response.msg
                    })
                }
                console.log(JSON.stringify(response))
        })
    }

    render(){
        const textfieldStyle = {
            width: "80%",
            marginTop: "1em"
        }
    
        return (
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >   
                <Link to="/">
                    <IconButton color="secondary" size="small">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Typography variant="h5" component="h2">
                    Register
                </Typography>
                    <div>
                        
                    </div>
                </Grid>
                <form>
                    <TextField
                        required
                        label="User"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        style={textfieldStyle}
                        onChange = {this.handleUsername}
                    />
                    <TextField
                        required
                        label="Password"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        style={textfieldStyle}
                        type="password"
                        onChange = {this.handlePassword}
                    />
                    <p style = {{color: 'red', fontWeight: 'bold'}}>{this.state.errorMessage}</p>
                    <Button variant="outlined" color="secondary" style={textfieldStyle} onClick = {this.sendRegistrationRequest}>
                        Register
                    </Button>
                </form>
            </CardContent>
        );

    }
}
