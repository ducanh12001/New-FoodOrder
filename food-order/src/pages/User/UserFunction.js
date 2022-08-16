export class User {
    constructor(id, email, password, fullname, phone) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.phone = phone;
    }
}

export function getUserStore() {
    let myUsers;
    if (localStorage.getItem('users') === null) {
        myUsers = []
    } else {
        myUsers = JSON.parse(localStorage.getItem('users'));
    }
    return myUsers;
}

export function addUserStore(dish) {
    const users = getUserStore();
    users.push(dish);
    localStorage.setItem("users", JSON.stringify(users))
}
