import React, { useContext } from "react";
import Header from "../Header";
import ChangeTheme from "../ChangeTheme";
import UserBar from "../user/UserBar";
import CreatePost from "../post/CreatePost";
import useWindowSize from "@rehooks/window-size";
import { ThemeContext, StateContext } from '../contexts'

export default function HeaderBar ({ setTheme }) {
    const theme = useContext(ThemeContext)

    const { state } = useContext(StateContext)
    const { user } = state

    const { innerWidth } = useWindowSize()
    const mobilePhone = innerWidth < 640
    return (
        <div>
            <Header text="React Hooks Blog" />
            {!mobilePhone && <ChangeTheme theme={theme} setTheme={setTheme}/>}
            {!mobilePhone && <br/>}
            {!mobilePhone && <React.Suspense fallback={"Loading..."}>
                <UserBar/>
            </React.Suspense>}
            {!mobilePhone && <br/>}
            {user && <CreatePost  />}
        </div>
    )
}
