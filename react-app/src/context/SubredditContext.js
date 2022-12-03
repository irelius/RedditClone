import { useState, useContext, createContext, useEffect } from 'react';

export const SubredditContext = createContext()
export const useSubreddit = () => useContext(SubredditContext)

export default function SubredditProvider({children}) {
    const [subredditEdited, setSubredditEdited] = useState(false)

    return (
        <>
            <SubredditContext.Provider
                value={{
                    subredditEdited,
                    setSubredditEdited
                }}
            >
                {children}
            </SubredditContext.Provider>
        </>
    )
}
