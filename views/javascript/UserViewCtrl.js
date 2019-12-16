var GetUserCompHTML = function(index_name, isOnline) {

    var divHeadStyle = "<div class='data-user-box'>";
    if (isOnline) {
        divHeadStyle = "<div class='data-user-box' style='background-image: url(\"sprite/GREEN.png\")' >";
    }

    return (divHeadStyle+
            "<img src='sprite/Online ICON.png'>"+
            "<h3>Player " + index_name +"</h3>"+
            "</div>");
}


var RenderUserComp = function(maxUser, userNum, domElement) {
    domElement.html("");
    for (let i = 0; i < maxUser; i++) {
        domElement.append( GetUserCompHTML(i + 1, (i < userNum) ));
    }
}