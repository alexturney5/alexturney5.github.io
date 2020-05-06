function createMenuCarouselAndName(masterContainer, descriptionText, imgLink, rowID, wifi, aboutText, hoursText, link, stylingText){
    //create temp divs
    let containAll = createNode('div');
    containAll.setAttribute('class', 'containAll');
    let carousel = createNode('div');
    carousel.setAttribute('class', 'carousel');
    let name = createNode('p');
    name.setAttribute('class', 'menuName');
    //attach buttons
    append(masterContainer, containAll);
    append(containAll,carousel);
    //carousel work
    if ( imgLink == "n/a" ) {
        carousel.setAttribute('style','height:0px;margin:0;');
    } else {
        createSwipingCarousel("menu", rowID, descriptionText, imgLink, carousel, link);
    }
    append(containAll,name);
    //assign data
    name.innerText = descriptionText;
    // setting up a container for about, wifi, and hours
    if ( aboutText != "n/a" || hoursText != "n/a" || wifi != "n/a" ) {
        let aboutContainer = createNode('div');
        aboutContainer.setAttribute('class', 'aboutContainer');
        append(containAll, aboutContainer);
        if ( aboutText != "n/a" ) {
            buildAbout(aboutText, aboutContainer);
        }
        if ( hoursText != "n/a" ) {
            buildHours(hoursText, aboutContainer);
        }
        if ( wifi != "n/a" ) {
            buildWifi(wifi, aboutContainer);
        }
    }
    styleBackground(stylingText);
}

function createMenuButton(masterContainer, descriptionText, link, rowCompany, imgLink, stylingText){
    //create temp divs
    let buttonTable = createNode('div');
    buttonTable.setAttribute('class', 'buttonTable');
    let a = createNode('a');
    a.setAttribute('class','menuButton')
    let tempDiv = createNode('div');
    if (oddevencount%2==1) {
        tempDiv.setAttribute('class', 'menuButtonContainer');
        tempDiv.setAttribute('id', 'buttonsecond');
    } else {
        tempDiv.setAttribute('class', 'menuButtonContainer');
        tempDiv.setAttribute('id', 'buttonfirst');
    }
    if ( imgLink != "n/a" ) {
        var tempCSS = "background-image: url("+imgLink+");"
        tempDiv.setAttribute('style',tempCSS);
    } else {
        var tempColor = "#F6A091";
        var tempCSS = "background:"+ tempColor;
        tempDiv.setAttribute('style',tempCSS);// do the #F6A091
    }
    // buton styling = black or white
    console.log("styleButton("+a+","+stylingText+")");
    styleButton(a,stylingText);
    //attach buttons
    append(masterContainer,tempDiv);
    append(tempDiv,buttonTable);
    append(buttonTable,a);
    //assign data
    a.innerText = descriptionText;
    a.setAttribute('href', link);
    a.setAttribute('id',rowCompany + ":" + descriptionText);
}

function createSubMenuItem(masterContainer, descriptionText, link, imgLink, rowID, ingredientsText, sizesText, pricesText, detailsText, disclaimerText, stylingText){
    //create temp divs
    let containAll = createNode('div');
    containAll.setAttribute('class', 'containAll');
    let a = createNode('a');
    let tapToLearn = createNode("p");
    let details = createNode('p');
    details.setAttribute('class', 'details');
    let ingredients = createNode('div');
    ingredients.setAttribute('class', 'ingredients');
    let sizes = createNode('p');
    sizes.setAttribute('class', 'sizes');
    let newTopTitle = createNode('div');
    newTopTitle.setAttribute('id','topTitle')

    //topTitle Spacing Margin
    if (titleText != "n/a") {
        if (subheads.length==0) {
            newTopTitle.setAttribute('class','toptopTitle');
        }
        if (!subheads.includes(titleText)) {
            if (atLeastOneFilterMade == false && atLeastOneTopTile == false) {
                // newTopTitle.style.marginTop = "80px";
                append(containAll,newTopTitle);
                newTopTitle.innerText=titleText;
                subheads.push(titleText);
                atLeastOneTopTile = true;
            } else if (atLeastOneFilterMade == true && atLeastOneTopTile == false) {
                // newTopTitle.style.marginTop = "24px";
                append(containAll,newTopTitle);
                newTopTitle.innerText=titleText;
                subheads.push(titleText);
                atLeastOneTopTile = true;
            } else {
                append(containAll,newTopTitle);
                newTopTitle.innerText=titleText;
                subheads.push(titleText);
            }
        }
    }
    append(masterContainer, containAll);
    if (descriptionText != "n/a") {
        let menuItem = createNode('div');
        menuItem.setAttribute('class', 'menuItem');
        let textContainer = createNode('div'); // container for top
        textContainer.setAttribute('class', 'textContainer');
        let name = createNode('p'); // name of the menu item
        name.setAttribute('class', 'name');
        append(containAll, menuItem);
        let clickableContainer = createNode('div');
        clickableContainer.setAttribute('class', 'clickableContainer');
        append(menuItem,textContainer);
        append(textContainer,clickableContainer);
        append(clickableContainer,name);
        name.innerText = descriptionText;
        if ( pricesText != "n/a" ) {
            let prices = createNode('p');
            prices.setAttribute('class', 'prices');
            append(clickableContainer,prices);
            prices.innerText = pricesText;
        }
        if (ingredientsText[0] != "n/a" || link != "n/a" || sizesText != "n/a" || detailsText != "n/a" || imgLink != "n/a"){
            let expandArrowContainer = createNode('div');
            expandArrowContainer.setAttribute('class', 'expandArrowContainer');
            let expandArrow = createNode('img');
            expandArrow.setAttribute('class', 'expandArrow');
            append(clickableContainer,expandArrowContainer);
            append(expandArrowContainer,expandArrow);
        }
        let clearDiv = createNode('div');
        clearDiv.setAttribute('class', 'clearDiv');
        append(clickableContainer,clearDiv);
        let expandableSection = createNode('div');
        expandableSection.setAttribute('class', 'expandableSection');
        append(textContainer,expandableSection);
        if ( detailsText != "n/a" ) {
            append(expandableSection,details);
            details.innerText = detailsText;
        }
        if (ingredientsText[0] != "n/a") {
            append(expandableSection,ingredients);
            for (i = 0; i < ingredientsText.length; i++) {
                let tempP = createNode('p');
                append(ingredients,tempP);
                tempP.innerText=ingredientsText[i];
                if (i==0) {
                    tempP.setAttribute('class','ingredient')
                } else {
                    tempP.setAttribute('class','ingredientDisclaimer')
                }
            }
        }
        if ( sizesText != "n/a" ) {
            append(expandableSection,sizes);
            sizes.innerText=sizesText;
        }
        if ( link != "n/a" ) {
            for (i = 0; i < link.length; i++) {
                append(expandableSection,a);
                append(a,tapToLearn);
                if (i==0) {
                    a.setAttribute('href', link[i]);
                    tapToLearn.setAttribute('class','tapToLearn');
                    tapToLearn.innerText="tap to learn more.";
                } else {
                    tapToLearn.innerText=link[i];
                }
            }
        }
        if (imgLink != "n/a") {
            let carousel = createNode('div');
            carousel.setAttribute('class', 'carousel');
            append(expandableSection,carousel);
            // createSwipingCarousel("subMenu", rowID, descriptionText, imgLink, carousel, link);
            createSwipingCarouselArrow("subMenu", rowID, descriptionText, imgLink, carousel, link);
        }
    } // end menu item
    if ( disclaimerText != "n/a" ) {
        let tempP = createNode('p');
        append(containAll,tempP);
        tempP.innerText=disclaimerText;
        tempP.setAttribute('class','disclaimer');
    }
    styleBackground(stylingText);
}

//index.js
function sendEmail(email) {
    console.log(email);
    var isValidEmail = isEmailAddress(email);
    if (isValidEmail) {
        console.log("valid email pass");
        var url = "https://entuxfi62bm8rhh.m.pipedream.net?text="+email;
        fetch(url,{mode: "cors"})
        .then((resp) => resp.json()) // transform the data into json
        .then(function(data) {
            console.log("data: " + data);
            let jsonResponse = data.message;
            console.log("jsonResponse: " + jsonResponse);
            alert("Thank you, we will be in touch soon!");
            document.getElementById("email").value = "";
            window.scrollTo(0, 0);
            return jsonResponse;
        })
        .catch(function(error) {
            displayError();
            console.log(error);
        });
    } else {
        console.log("invalid email fail");
        alert("Please enter a valid email.");
    }
}

function styleBackground(stylingText){
  for (var i = 0; i < stylingText.length; i++) {
    var temp = stylingText[i].split('~');
    var element = temp[0];
    var styling = temp[1];
    console.log(element + " : "+styling);
    if (element === "bodyBackgroundColor"){
        document.body.style.background = styling;
    } else if (element ==="bodyTextColor"){
        document.body.style.color = styling;
    }
  }
}


function styleButton(toStyle, stylingText){
  for (var i = 0; i < stylingText.length; i++) {
    var temp = stylingText[i].split('~');
    var element = temp[0];
    var styling = temp[1];
    console.log(element + " : "+styling);
    if (element === "buttonTextColor"){
      console.log("styling button");
      if ( styling != "n/a" ) {
            if ( styling == "whitetext" ) {
                var tempClass = "white"
                toStyle.className += " " + tempClass;
            } else if ( styling == "blacktext" ) {
                var tempClass = "black"
                toStyle.className += " " + tempClass;
            }
        }
    }
  }
}

function isEmailAddress(str) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    console.log("match: "+str.match(pattern));
    return str.match(pattern);
}
