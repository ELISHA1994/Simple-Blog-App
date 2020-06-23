import React, { useEffect } from "react";
import { useResource } from "react-request-hook";

import Post from "../post/Post";
import {Link} from "react-navi";

export default function PostPage ({ id }) {
    const [ post, getPost ] = useResource(() => ({
        url: `/posts/${id}`,
        method: 'get'
    }))
    useEffect(getPost, [ id, getPost ])

    return (
        <div>
            <div><Link href={"/"}>Go back</Link></div>
            {(post && post.data)
                ? < Post {...post.data} />
                : 'Loading...'
            }
        </div>
    )
}
