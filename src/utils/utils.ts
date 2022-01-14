import {INTERVAL_REGISTRATION_YEAR} from '../variables/variables';
import {IUserData} from "../types/types";

export const getSortUsersGroups = (fetchUsers: any): IUserData[][] => {
    const sortUsersGroups: IUserData[][] = [];
    for (const user of fetchUsers.results) {
        const currentGroup: number = Math.ceil(user.registered.age / INTERVAL_REGISTRATION_YEAR - 1)
        if (!sortUsersGroups[currentGroup]) {
            sortUsersGroups[currentGroup] = []
        }
        sortUsersGroups[currentGroup].push(getCurrentFieldsUser(user))
    }

    return sortUsersGroups
}

function getCurrentFieldsUser(user: any): IUserData {
    return ({
        'id': user.login.uuid,
        'full_name': (user.name.first + ' ' + user.name.last),
        'date': user.dob.date.split('T')[0].split('-').reverse().join("."),
        'email': user.email,
        'photo': user.picture.medium,
        'list': 'list_all_users'
    })
}