import React, {BaseSyntheticEvent, useState} from "react";
import UserCard from "./UserCard";
import {List, AutoSizer} from "react-virtualized";
import {IUserData} from "../types/types";
import {Col} from "reactstrap";

const ListFavoritesUsers = React.memo(() => {

    const [favoritesUsers, setFavoritesUsers] = useState<IUserData[]>([])

    const addCardListFavorites = (e: BaseSyntheticEvent, userDataDnD: IUserData): void => {
        if (favoritesUsers.filter((favoriteUser: IUserData) => favoriteUser.id === userDataDnD.id).length === 0) {
            userDataDnD.list = 'list_favorites_users';
            setFavoritesUsers([...favoritesUsers, userDataDnD]);
        }
    }

    const moveCardListFavorites = (e: BaseSyntheticEvent, userDataDnD: IUserData): void => {
        e.stopPropagation()
        e.preventDefault()
        e.currentTarget.style.borderTopColor = 'white'

        const idCardOnDropCard: string = e.currentTarget.id

        if (userDataDnD.list === 'list_favorites_users' && userDataDnD.id !== idCardOnDropCard) {
            const indexRemoveCard = favoritesUsers.findIndex(favoriteUser => favoriteUser.id === userDataDnD.id)
            if (indexRemoveCard || indexRemoveCard === 0) {
                favoritesUsers.splice(indexRemoveCard, 1);
                const indexAddCard =+ favoritesUsers.findIndex((favoriteUser: IUserData) => favoriteUser.id === idCardOnDropCard)
                setFavoritesUsers([
                    ...(favoritesUsers.slice(0, indexAddCard)),
                    userDataDnD,
                    ...favoritesUsers.slice(indexAddCard)
                ])
            }
        } else if (userDataDnD.list === 'list_all_users') {
            if (favoritesUsers.filter((favoriteUser: IUserData) => favoriteUser.id === userDataDnD.id).length === 0) {
                const indexCardAdded =+ favoritesUsers.findIndex((favoriteUser: IUserData) => favoriteUser.id === idCardOnDropCard)
                userDataDnD.list = 'list_favorites_users';
                setFavoritesUsers([
                    ...(favoritesUsers.slice(0, indexCardAdded)),
                    userDataDnD,
                    ...favoritesUsers.slice(indexCardAdded)
                ])
            }
        }
    }

    const removeCardListFavorite = (idRemoveUser: string): void => {
        setFavoritesUsers(favoritesUsers.filter((favoriteUser: IUserData) => {
            return favoriteUser.id !== idRemoveUser
        }))
    }

    return (
        <Col
            data-cy='list_favorites'
            style={{height: '90vh'}}
            className='rounded rounded-3 mx-3 d-flex flex-column app_bg-gray'
            onDragOver={e => e.preventDefault()}
            onDrop={(e) => {
                addCardListFavorites(e, JSON.parse(e.dataTransfer.getData('data')))
            }}
        >
            <div className='text-center my-3' data-cy='list_favorites-title'>
                <h3>Избранные пользователи</h3>
            </div>

            <div className='my-2 h-100'>
                <AutoSizer>
                    {({width, height}) => (
                        <List
                            width={width}
                            height={height}
                            rowHeight={100}
                            rowCount={favoritesUsers.length}
                            rowRenderer={({index, style}) => {
                                return (
                                    <UserCard
                                        key={favoritesUsers[index].id}
                                        userData={favoritesUsers[index]}
                                        style={style}
                                        removeCardListFavorite={removeCardListFavorite}
                                        moveCardListFavorites={moveCardListFavorites}
                                    />
                                )
                            }}
                        />
                    )}
                </AutoSizer>
            </div>
        </Col>
    );
});

export default ListFavoritesUsers;