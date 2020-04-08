function createMenuCarouselAndName(masterContainer, descriptionText, imgLink, rowID, wifi, aboutText, hoursText, link){
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
        createSwipingCarousel(rowID, descriptionText, imgLink, carousel, link);
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
    if ( stylingText != "n/a" ) {
        if ( stylingText == "whitetext" ) {
            var tempClass = "white"
            a.className += " " + tempClass;
        } else if ( stylingText == "blacktext" ) {
            var tempClass = "black"
            a.className += " " + tempClass;
        }
    }
    //attach buttons
    append(masterContainer,tempDiv);
    append(tempDiv,buttonTable);
    append(buttonTable,a);
    //assign data
    a.innerText = descriptionText;
    a.setAttribute('href', link);
    a.setAttribute('id',rowCompany + ":" + descriptionText);
}

function createSubMenuItem(masterContainer, descriptionText, link, imgLink, rowID, ingredientsText, sizesText, pricesText, detailsText, disclaimerText){
    //create temp divs
    let containAll = createNode('div');
    containAll.setAttribute('class', 'containAll');
    topDiv = createNode('div'); // container for top
    topDiv.setAttribute('class', 'topDiv');
    let carousel = createNode('div');
    carousel.setAttribute('class', 'carousel');
    let bottomDiv = createNode('div'); // container for top
    bottomDiv.setAttribute('class', 'bottomDiv');
    let name = createNode('p'); // name of the menu item
    name.setAttribute('class', 'name');
    let spacebreak = createNode('div');
    spacebreak.setAttribute('class', 'spacebreak');
    let a = createNode('a');
    let tapToLearn = createNode("p");
    let details = createNode('p');
    details.setAttribute('class', 'details');
    let ingredients = createNode('p');
    ingredients.setAttribute('class', 'ingredients');
    let prices = createNode('p');
    prices.setAttribute('class', 'prices');
    let sizes = createNode('p');
    sizes.setAttribute('class', 'sizes');
    let newTopTitle = createNode('div');
    newTopTitle.setAttribute('id','topTitle')

    // newTopTitle.setAttribute('class', 'topTitle');
    // newTopTitle.setAttribute('id','newTopTitle')

    let disclaimerContainer = createNode('div');
    disclaimerContainer.setAttribute('class', 'disclaimerContainer');
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
    //attach buttons
    append(masterContainer, containAll);
    append(containAll,topDiv);
    append(containAll,bottomDiv);
    append(bottomDiv,name);
    append(bottomDiv,disclaimerContainer);
    append(containAll,spacebreak);
    //assign data
    if (descriptionText != "n/a") {
        name.innerText = descriptionText;
    }
    if ( detailsText != "n/a" ) {
        append(bottomDiv,details);
        details.innerText = detailsText;
    }
    if (ingredientsText[0] != "n/a") {
        append(bottomDiv,ingredients);
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
        append(bottomDiv,sizes);
        sizes.innerText=sizesText;
    }
    if ( pricesText != "n/a" ) {
        append(containAll,prices);
        prices.innerText = pricesText;
    }
    if ( link != "n/a" ) {
        a.setAttribute('href', link);
        append(bottomDiv,a);
        append(a,tapToLearn);
        tapToLearn.innerText="tap to learn more.";
        tapToLearn.setAttribute('class','tapToLearn');
    }
    if ( disclaimerText != "n/a" ) {
        let tempP = createNode('p');
        append(disclaimerContainer,tempP);
        tempP.innerText=disclaimerText;
        tempP.setAttribute('class','disclaimer');
    }
    if (imgLink != "n/a") {
        append(bottomDiv,carousel);
        createSwipingCarousel(rowID, descriptionText, imgLink, carousel, link);
    }
}
















