import NightlightText from "./NightlightText";
import {IUserData} from "../types/types";
import {BaseSyntheticEvent, CSSProperties, FC} from "react";

interface IUserCard {
    userData: IUserData,
    style: CSSProperties,
    valueInSearch?: string,
    moveCardListFavorites?(e: BaseSyntheticEvent, userDataDnD: IUserData): void,
    removeCardListFavorite?(idRemoveUser: string): void
}

const UserCard: FC<IUserCard> = (
    {
        userData,
        style,
        valueInSearch,
        moveCardListFavorites,
        removeCardListFavorite
    }
) => {

    const animationAddCard = (e: BaseSyntheticEvent) => {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        e.currentTarget.style.borderTopColor = '#0DCAF0'
    }

    return (
        <div
            style={style}
        >
            <div
                data-cy='card_user'
                className='bg-white shadow-sm rounded py-2 d-flex align-items-center justify-content-around'
                onDragStart={(e) => e.dataTransfer.setData('data', JSON.stringify(userData))}
                onDrop={moveCardListFavorites && ((e) => moveCardListFavorites(e, JSON.parse(e.dataTransfer.getData('data'))))}
                onDragOver={moveCardListFavorites && (e => animationAddCard(e))}
                onDragLeave={e => (e.currentTarget.style.borderTopColor = 'white', e.preventDefault())}
                onDragEnd={e => (e.currentTarget.style.borderTopColor = 'white', e.preventDefault())}
                draggable={true}
                id={userData.id}
                style={{border: '3px solid white'}}
            >
                <div>
                    <img data-cy='card_user-photo' className='rounded-circle' src={userData.photo} alt='Loading...'/>
                </div>
                <div className='w-50'>
                    {valueInSearch ?
                        <div>
                            <NightlightText
                                full_name={userData.full_name}
                                valueInSearch={valueInSearch}
                                date={userData.date}
                            />
                        </div>
                        : <div>
                            <span data-cy='card_user-full_name'>{userData.full_name}</span>|
                            <span data-cy='card_user-date'>{userData.date}</span>
                        </div>
                    }
                    <span data-cy='card_user-email'>{userData.email}</span>
                </div>
                <div>
                    {removeCardListFavorite &&
                    <div
                        data-cy='card_user-button_remove'
                        className='remove-btn rounded-circle d-flex align-items-center justify-content-center'
                        onClick={() => removeCardListFavorite(userData.id)}
                    >
                        <span className="remove-btn-cross text-center">&times;</span>
                    </div>}
                </div>

            </div>
        </div>
    );
};

export default UserCard;