import React, {useReducer, useEffect, useState} from 'react'

import PostList from './post/PostList'
import CreatePost from "./post/CreatePost"
import UserBar from "./user/UserBar"
import appReducer from './reducers'
import Header from './Header'
import { ThemeContext, StateContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";

const defaultPosts = [
  { title: 'React Hooks', content: 'The greatest thing since sliced bread!', author: 'Daniel Bugl' },
  { title: 'Using React Fragments', content: 'Keeping the DOM tree clean!', author: 'Daniel Bugl' }
]

export default function App () {
    const [theme, setTheme ] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral'
    })
    const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: defaultPosts })
    const { user } = state

    useEffect(() => {
        if (user) {
            document.title = `${user} - React Hooks Blog`
        } else {
            document.title = 'React Hooks Blog'
        }
    }, [user])



    return (
        <div style={{ padding: 8 }} >
            <StateContext.Provider value={{ state, dispatch }} >
                <ThemeContext.Provider value={theme} >
                    <Header text="React Hooks Blog" />
                    <ChangeTheme theme={theme} setTheme={setTheme} />
                    <br />
                    <UserBar />
                    <br/>
                    {user && <CreatePost  />}
                    <br/>
                    <hr />
                    <PostList />
                </ThemeContext.Provider>
            </StateContext.Provider>
        </div>
    )
}


// ........................Actions...........................
// ..........user Actions..................
// { type: 'LOGIN', username: 'Daniel Bugl', password: 'notsosecure' }
// { type: 'REGISTER', username: 'Daniel Bugl', password: 'notsosecure', passwordRepeat: 'notsosecure' }
// { type: 'LOGOUT' }

// ............post Actions...................
// { type: 'CREATE_POST', title: 'React Hooks', content: 'The greatest thing since sliced bread!', author: 'Daniel Bugl' }

