import React, {FC, useState} from "react";
import {IUserData} from "../types/types";
import {AutoSizer, List} from 'react-virtualized';
import UserCard from "./UserCard";
import {Col, Row} from "reactstrap";

interface IListAllUsers {
    usersGroup: IUserData[][];
}

const ListAllUsers: FC<IListAllUsers> = React.memo(({usersGroup}) => {

    const [displayList, setDisplayList] = useState<number>(0)
    const [valueInSearch, setValueInSearch] = useState<string>()

    const searchUsers = (): IUserData[][] => {
        if (valueInSearch) {
            return usersGroup.map((group: IUserData[]) => {
                return group.filter((user: IUserData) => user.full_name.toLowerCase().includes(valueInSearch.toLowerCase()))
            })
        }

        return usersGroup
    }

    return (
        <Col
            data-cy='list_all_users'
            style={{height: '90vh'}}
            className='rounded rounded-3 mx-3 d-flex flex-column app_bg-gray'
        >
            <div data-cy='list_all_users-input'>
                <input
                    type="search"
                    className='form-control border-white shadow-sm mt-3 mb-1'
                    placeholder='Поиск...'
                    onChange={(e) => (setValueInSearch(e.target.value))}/>
            </div>

            <div className='my-2'>
                <Row data-cy='group_buttons'>
                    {usersGroup.map((group: IUserData[], index: number) => {
                        return (
                            <Col key={index}>
                                <button
                                    data-cy='group_button'
                                    className={`users-group_btn btn bg-white border-white shadow-sm w-100 d-flex 
                                    justify-content-around ${displayList === index ? 'users-group_btn_focus' : ''}`}
                                    onClick={() => setDisplayList(index)}
                                >
                                    <span data-cy={'group_button_interval'}>От 20{index}0 до 20{index}9</span>
                                    <span
                                        data-cy={'group_button_counter'}
                                        className={`${searchUsers()[index].length === 0 ? 'bg-secondary' : 'bg-info'} 
                                        px-1 rounded rounded-3 text-white`}
                                    >
                                        Нашел: {searchUsers()[index].length}
                                    </span>
                                </button>
                            </Col>
                        )
                    })}
                 </Row>
            </div>

            <div className='my-2 h-100'>
                <AutoSizer>
                    {({width, height}) => (
                        <List
                            width={width}
                            height={height}
                            rowHeight={100}
                            rowCount={searchUsers()[displayList].length}
                            rowRenderer={({index, style}) => {
                                return (
                                    <UserCard
                                        key={searchUsers()[displayList][index].id}
                                        userData={searchUsers()[displayList][index]}
                                        valueInSearch={valueInSearch}
                                        style={style}
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

export default ListAllUsers;