var active = false;
var isActive;
document.addEventListener('DOMContentLoaded', function() {
    isActive = function() {
        
        if(!active){
            document.getElementById('loginBtn').setAttribute('class', 'is-active')
            active = true;
        } else {
            document.getElementById('loginBtn').removeAttribute('class', 'is-active')
            active = false;
        }
    }
})
