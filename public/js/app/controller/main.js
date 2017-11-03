function checkLogIn() {
    if(sessionStorage.getItem("user")) {
        return true
    } else {
        return false
    }
}