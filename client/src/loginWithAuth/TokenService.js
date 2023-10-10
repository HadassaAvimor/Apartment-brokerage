
export const getToken = () => {
    var tokens = sessionStorage.getItem("token");
    return tokens;
}

export const setTokens = (token) =>{
    sessionStorage.setItem("token", token);
}

