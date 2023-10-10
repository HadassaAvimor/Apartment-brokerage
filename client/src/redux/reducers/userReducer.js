const initialState = {  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERLOGIN": {
            console.log(action.playload.obj);
            state = action.playload.obj;
            return state;
        }
    }
    return state;
}
export default userReducer;