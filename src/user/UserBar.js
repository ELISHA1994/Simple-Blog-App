import React from 'react'

import Login from "./Login"
import Logout from "./Logout"
import Register from "./Register"

export default function UserBar () {
    const user = 'Elisha Bello'

    if (user) {
        return<Logout user={user} />
    } else {
        return (
            <React.Fragment>
                <Login />
                <Register />
            </React.Fragment>
        )
    }
}
