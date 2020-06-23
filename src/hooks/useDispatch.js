import { useContext } from 'react'
import { StateContext } from "../contexts";

export default function useDispatch() {
    const { dispatch } = useContext(StateContext)
    return dispatch
}
