import { useState } from "react"

const state = {}

// Global state hook

function useGlobalState(id, initial) {
    if (!state[id]) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        state[id] = useState(initial)
    }
    return state[id]
}

// Exports

export default useGlobalState