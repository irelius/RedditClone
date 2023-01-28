import { useState, useContext, createContext } from "react";

export const LikesContext = createContext();
export const useLikes = () => useContext(LikesContext)

export default function LikesProvider({ children }) {
    const [postLikeStatus, setPostLikeStatus] = useState("")
    const [postLikeID, setPostLikeID] = useState(0)

    return (
        <>
            <LikesContext.Provider
                value={{
                    postLikeStatus,
                    setPostLikeStatus,
                    postLikeID,
                    setPostLikeID
                }}
            >
                {children}
            </LikesContext.Provider>
        </>
    )
}
