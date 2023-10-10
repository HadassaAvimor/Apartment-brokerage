export const userLogin = (obj) => {
    return {
        type: "USERLOGIN",
        playload: {obj}
    }
}