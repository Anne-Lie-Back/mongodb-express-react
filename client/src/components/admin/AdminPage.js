import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserList from './UserList'

export default function AdminPage() {
    let entryWidth = {   
        width:'95vw',
    }

    const cardStyle = {
        backgroundColor: '#d1c4e9',
        minHeight: '50vh'
    }

    if(useMediaQuery('(min-width:37em)')){
        entryWidth = {   
            width:'35em',
        }
    }

  return (
    <Container style={entryWidth}>
        <Card style={cardStyle}>
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
                Admin Page
            </Typography>
            <div>
                {/*Needed for the right look*/ }
            </div>
            </Grid>
            <UserList/>
            </CardContent>
        </Card>
    </Container>
  );
}
