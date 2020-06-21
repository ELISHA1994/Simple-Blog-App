import React, {useReducer, useEffect, useState} from 'react'
import { useResource } from 'react-request-hook'

import PostList from './post/PostList'
import CreatePost from "./post/CreatePost"
import UserBar from "./user/UserBar"
import appReducer from './reducers'
import Header from './Header'
import { ThemeContext, StateContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";



export default function App () {
    const [theme, setTheme ] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral'
    })
    const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [], error: '' })
    const { user, error } = state

    const [ posts, getPosts ] = useResource(() => ({
        url: '/posts',
        method: 'get'
    }))

    useEffect(getPosts, [])

    useEffect(() => {
        if (posts && posts.error ) {
            dispatch({ type: 'POSTS_ERROR' })
        }
        if (posts && posts.data ) {
            dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() })
        }
    }, [posts])

    // useEffect(() => {
    //     fetch('/api/posts')
    //         .then(result => result.json())
    //         .then(posts =>  dispatch({type: 'FETCH_POSTS', posts}))
    // }, [])


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
                    <React.Suspense fallback={"Loading..."}>
                        <UserBar />
                    </React.Suspense>
                    <br/>
                    {user && <CreatePost  />}
                    <br/>
                    <hr />
                    {error && <b>{error}</b>}
                    <PostList />
                </ThemeContext.Provider>
            </StateContext.Provider>
        </div>
    )
}


// ........................Actions...........................
// Implementing Requests Using Axios and react-request-hook Library
// ..........user Actions..................
// { type: 'LOGIN', username: 'Daniel Bugl', password: 'notsosecure42' }
// { type: 'REGISTER', username: 'Daniel Bugl', password: 'notsosecure', passwordRepeat: 'notsosecure' }
// { type: 'LOGOUT' }
//   Eyo 1234

// ............post Actions...................
// { type: 'CREATE_POST', title: 'React Hooks', content: 'The greatest thing since sliced bread!', author: 'Daniel Bugl' }

