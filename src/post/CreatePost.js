import React, { useEffect } from 'react'
import { useNavigation} from "react-navi";
import {useInput} from "react-hookedup";
import {useDispatch, useDebouncedUndo, useUserState, useAPICreatePost } from "../hooks";

export default function CreatePost () {
    const { dispatch } = useDispatch()
    const { user } = useUserState()


    const { value: title, bindToInput: bindTitle } = useInput('')

    const [ content, setContent, { undo, redo, canUndo, canRedo } ] = useDebouncedUndo()
    //https://nikgraf.github.io/react-hooks/
    const [ post, createPost ] = useAPICreatePost()

    const navigation = useNavigation()

    useEffect(() => {
        console.log('mounted')
        if (post && post.data) {
            dispatch({ type: 'CREATE_POST', ...post.data})
            navigation.navigate(`/view/${post.data.id}`)
        }
    }, [post, dispatch, navigation])

    function handleContent(e) {
        const { value } = e.target
        setContent( value )
    }

    function handleCreate() {
        createPost({ title, content, author: user })
    }

    return (
        <form onSubmit={e => {e.preventDefault(); handleCreate()}}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} {...bindTitle} name="create-title" id="create-title" />
            </div>
            <textarea value={content} onChange={handleContent} />
            <button type="button" onClick={undo} disabled={!canUndo}>Undo</button>
            <button type="button" onClick={redo} disabled={!canRedo}>Redo</button>
            <input type="submit" value="Create" />
        </form>
    )
}
