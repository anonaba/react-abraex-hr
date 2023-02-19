const initialState = {
    status: 0,
    error: "",
    message: "",
    data: {
    }
}

type Action = { type: "Success", payload: { prop: string, status: string } }
    | { type: '' }

export default function(state = initialState, action : Action ) {
    switch (action.type) {
        case "Success":
            return {
                ...state,
                status: action.payload.status
            }
            break;
    
        default:
            return state;
    }
} 