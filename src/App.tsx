import React, {FC, useEffect, useState} from 'react';
import {getSortUsersGroups} from "./utils/utils";
import {IUserData} from "./types/types";
import ListAllUsers from "./components/ListAllUsers";
import ListFavoritesUsers from "./components/ListFavoritesUsers";
import {Container, Row} from "reactstrap";

const App: FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [usersGroup, setUsersGroup] = useState<IUserData[][]>()

    useEffect(() => {
        fetch("https://api.randomuser.me/?results=10" +
            "")
            .then(response => response.json())
            .then(
                (fetchUsers: any) => {
                    setUsersGroup(getSortUsersGroups(fetchUsers))
                    setIsLoaded(false)
                },
                (error) => {
                    setError(error.message)
                    setIsLoaded(false)
                }
            )
    }, [])

    return (
        <Container
            style={{height: '95vh'}}
            className='d-flex align-items-center rounded rounded-3 justify-content-center bg-white shadow-sm'
        >
            {isLoaded && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <Row className='w-100'>
                {usersGroup && <ListAllUsers usersGroup={usersGroup}/>}
                {usersGroup && <ListFavoritesUsers/>}
            </Row>
        </Container>
    );
};

export default App;