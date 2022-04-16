function processLogin(){
    var accessToken = window.location.toString().split('&')[1].replace("access_token=", "");

    window.location.replace("http://localhost:7070/GSL/login/" + accessToken);
}

processLogin();