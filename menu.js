var filterChecks = ["vegan", "chocolate", "coffee", "strawberry", "Vodka", "Whiskey", "Rum", "Tequila", "Mezcal", "Gin", "Rye", "Brandy", "Sake", "Scotch", "Bourbon"];
document.cookie = "SameSite = none;secure";
var filters = [];
var indexImage = 0;
var numberOfImages = 0;
var imageArray;
var topDiv;
// for .topTitle top spacing
var atLeastOneFilterMade = false;
var atLeastOneTopTile = false;
var subheads = [];
// end
var buttonContainerBeingUsed = false;
var showErrorFlag = true;
var oddevencount = 0
const spinner = document.getElementById("spinner");
const urlParams = new URLSearchParams(window.location.search);
const urlType = urlParams.get('grouping');
const urlCompany = urlParams.get('company');
const urlFilter = urlParams.get('filter');
const topTitle = document.getElementById("topTitle");
const filterContainer = document.getElementById("filterContainer");
const backButton = document.getElementById("backButton");
const backImg = document.getElementById("backImg");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
var url;
var myDict = {};

// excel row data
var descriptionText;
var imgLink;
var rowType;
var detailsText;
var rowCompany;
var link;
var pricesText;
var sizesText;
var titleText;
var ingredientsText;
var filterText;

gifCreation(urlCompany,urlType);
url = createURL(urlFilter, urlCompany);

showSpinner();
fetch(url,{mode: "cors"})
.then((resp) => resp.json()) // transform the data into json
.then(function(data) { // console.log(data);

    hideSpinner();
    let jsonResponse = data.values;
    var arrayLength = jsonResponse.length;
    var arrayCount=0;

    for (var i = 0; i < arrayLength; i++) { //iterate on sheet rows

        setJsonVariables(jsonResponse,i);

        let hr = createNode('hr'); // initiate all of the things
        hr.setAttribute('id','hr');
        let containAll = createNode('div'); // container for everything
        containAll.setAttribute('class', 'containAll');
        topDiv = createNode('div'); // container for top
        topDiv.setAttribute('class', 'topDiv');
        let bottomDiv = createNode('div'); // container for top
        bottomDiv.setAttribute('class', 'bottomDiv');
        let img = createNode('img'); // image
        let containName = createNode('div'); // container for the name
        containName.setAttribute('class', 'containName');
        let button = createNode('button');
        let prices = createNode('p');
        prices.setAttribute('class', 'prices');
        let sizes = createNode('p');
        sizes.setAttribute('class', 'sizes');
        var a = createNode('a');
        let name = createNode('p'); // name of the menu item
        let details = createNode('p');
        details.setAttribute('class', 'details');
        let ingredients = createNode('p');
        ingredients.setAttribute('class', 'ingredients');
        let spacebreak = createNode('div');
        spacebreak.setAttribute('class', 'spacebreak');
        let buttonContainer = createNode('div');
        let newTopTitle = createNode('div');
        newTopTitle.setAttribute('class', 'column');
        newTopTitle.setAttribute('id','topTitle')
        //carousel
        let carousel = createNode('div');
        carousel.setAttribute('class', 'carousel');
        carousel.setAttribute('id','carousel')

        buttonContainer.setAttribute('class', 'buttonContainer');

        if (isMenu()) {
            incrementOddEvenCount()
            showErrorFlag = false;
            if (rowType=="menu") { // once, for top of menu
                append(one, containAll);
                append(containAll,a);
                append(a,carousel);
                createSwipingCarousel(rowID, descriptionText,imgLink,carousel);
                // createCirclesTwo(rowID, a);
                append(a,bottomDiv);
                append(bottomDiv,name);
                name.setAttribute('class', 'menuName');
                name.innerText = descriptionText;
                topDiv.crossOrigin = "anonymous";
                document.getElementById("filterContainer").style.margin = "0px 0px 0px 0px";
            } else if (rowType=="section") { // for every menu button
                append(one, containAll);
                if (oddevencount%2==1) {
                    containAll.setAttribute('class', 'buttonsecond');
                } else {
                    containAll.setAttribute('class', 'buttonfirst');
                }
                 //override class for div
                append(containAll,buttonContainer);
                append(buttonContainer,a);
                a.innerText = descriptionText;
                a.setAttribute('href', link);
                a.setAttribute('class','menuButton')
                a.setAttribute('id',rowCompany + ":" + descriptionText);
            }
        }
        // SUB PAGES ()
        // ????? DO I NEED TO SPECIFY ONLY rowType = SUBPAGE ?????
        else if (rowType == urlType && rowCompany == urlCompany) {
            incrementOddEvenCount()
            showErrorFlag = false;
            backButton.setAttribute("href","?grouping=menu&company="+urlCompany);
            backImg.src = "http://alexturney.com/imgBin/xcta.png"
            createButtonFilters(filterText,filters);
            // SECTION OF MENU: NO IMAGES ON PAGE
            if ( imgLink == "n/a" ) {
                arrayCount += 1;
                if (arrayCount % 4 == 1) {
                    append(one, containAll);
                // } else if (arrayCount % 4 == 2) {
                //     append(two, containAll);
                // } else if (arrayCount % 4 == 3) {
                //     append(three, containAll);
                // } else if (arrayCount % 4 == 0) {
                //     append(four, containAll);
                } else {
                  append(one, containAll);
                }
                if (titleText != "n/a") {
                    if (!subheads.includes(titleText)) {
                        if (atLeastOneFilterMade == false && atLeastOneTopTile == false) {
                            newTopTitle.style.marginTop = "80px";
                            append(containAll,newTopTitle);
                            newTopTitle.innerText=titleText;
                            subheads.push(titleText);
                            atLeastOneTopTile = true;
                        } else if (atLeastOneFilterMade == true && atLeastOneTopTile == false) {
                            newTopTitle.style.marginTop = "24px";
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
                append(containAll,name);
                name.setAttribute('class', 'name');
                if (ingredientsText != "n/a") {
                    append(containAll,ingredients);
                    ingredients.innerText=ingredientsText;
                }
                if ( detailsText != "n/a" ) {
                    append(containAll,details);
                    details.innerText = detailsText;
                }
                if ( sizesText != "n/a" ) {
                    append(containAll,sizes);
                    sizes.innerText = sizesText;
                }
                 if ( pricesText != "n/a" ) {
                    append(containAll,prices);
                    prices.innerText = pricesText;
                }
                append(containAll,spacebreak);
                name.innerText = descriptionText;
            // SECTION OF MENU: IMAGES ON PAGE
            } else {
                arrayCount += 1;
                if (arrayCount % 4 == 1) {
                    append(one, containAll);
                // } else if (arrayCount % 4 == 2) {
                //     append(two, containAll);
                // } else if (arrayCount % 4 == 3) {
                //     append(three, containAll);
                // } else if (arrayCount % 4 == 0) {
                //     append(four, containAll);
                } else {
                  append(one, containAll);
                }
                append(containAll,topDiv);
                append(topDiv,carousel);
                append(containAll,bottomDiv);
                append(bottomDiv,name);
                name.setAttribute('class', 'name');
                name.innerText = descriptionText;
                createSwipingCarousel(rowID, descriptionText,imgLink, carousel);
                // createImageCarouselTwo(rowID, descriptionText,imgLink);
                // createCirclesTwo(rowID);
                // topDiv.setAttribute("style","background-image: url("+imgLink+");");
                // topDiv.setAttribute("style","background-image: url("+imgLink+"), url('https://optinmonster.com/wp-content/uploads/2018/06/lego_404.png');");
                if (ingredientsText != "n/a") {
                    append(bottomDiv,ingredients);
                    ingredients.innerText=ingredientsText;
                }
                if (sizesText != "n/a") {
                    append(bottomDiv,sizes);
                    sizes.innerText=sizesText;
                }
                if ( detailsText != "n/a" ) {
                    append(bottomDiv,details);
                    details.innerText = detailsText;
                }
                append(bottomDiv,a);
                if (link != "n/a") {
                    a.setAttribute('href', link);
                    let tapToLearn = createNode("p");
                    append(a,tapToLearn);
                    tapToLearn.innerText="tap to learn more.";
                    tapToLearn.setAttribute('class','tapToLearn');
                }
                append(containAll,spacebreak);
            } // END IMAGE SUB PAGE
        } // END SUB PAGE
    } //END FOR LOOP
    $('hr:last').remove();
    filterButtonColor();
    if (showErrorFlag) {
        displayError();
    }
}) // END DOING WORK ON JSON
.then(() => {
    var buttonwidth = $(".buttonContainer").width();
    $(".buttonContainer").height(buttonwidth*.75);
})
.catch(function(error) {
    displayError();
    console.log(error);
});

//  FUNCTIONS FUNCTIONS FUNCTIONS

function createButtonFilters(filterText, filters){
    var matchexists = 0;
    for (f of filterText) {
        var matchexists = 0;
        for (filter of filters) {
            if ( filter == f ) {
                matchexists = 1;
            }
        }
        if (matchexists == 0) {
            if (f != null) {
                filters.push(f);
                if (f != "n/a") {
                    if (urlFilter != null && f!=urlFilter) {
                    } else {
                        $("#filterContainer").addClass("filterContainerStyling");
                        let aforfilterbutton = createNode("a");
                        aforfilterbutton.setAttribute("id",f);
                        aforfilterbutton.setAttribute("class","filterbutton");
                        if (urlFilter != null) {
                            aforfilterbutton.setAttribute('href', "?grouping="+urlType+"&company="+urlCompany);
                        } else {
                            aforfilterbutton.setAttribute('href', "?grouping="+urlType+"&company="+urlCompany+"&filter="+f);
                        }
                        aforfilterbutton.innerText=f;
                        append(filterContainer,aforfilterbutton);
                        atLeastOneFilterMade = true;
                    }
                }
            }
        }
    }
}

function createCirclesTwo(rowID, a){
  if (myDict[rowID]["numberOfImages"] > 1) {
    var i;
    let circleContainer = createNode('div');
    circleContainer.setAttribute('class', 'circleContainer');
    append(a, circleContainer);
    let circleInnerContainer = createNode('div');
    circleInnerContainer.setAttribute('class', 'circleInnerContainer');
    append(circleContainer, circleInnerContainer);
    for (i = 0; i < myDict[rowID]["numberOfImages"]; i++) {
      let circle = createNode('div'); // container for everything
      circle.setAttribute('class', 'circle');
      circle.setAttribute('id', 'circle'+i);
      append(circleInnerContainer, circle);
      if (i==myDict[rowID]["indexImage"]) {
        $('#circle'+i).css("background-color","grey");
      } else {
        $('#circle'+i).css("background-color","grey");
      }
    }
    var tempWidth = 20 * myDict[rowID]["numberOfImages"];
    $(".circleInnerContainer").css("width",tempWidth + "px");
  }
}

function createSwipingCarousel(rowID, key, imageArray, appendTo){
    for (i = 0; i < imageArray.length; i++) {
        let innerCarousel = createNode('div');
        innerCarousel.setAttribute('class', 'innerCarousel');
        innerCarousel.setAttribute('id',i)
        var tempCSS = "background-image: url("+imageArray[i]+");"
        myDict[rowID] = {"key":key,"imageArray":imageArray,"indexImage":0,"numberOfImages":imageArray.length};
        numberOfImages++; // this is redundant if we keep the dictionary;
        innerCarousel.setAttribute("style",tempCSS);
        append(appendTo,innerCarousel);
    }
}

function createImageCarouselTwo(rowID, key, imageArray){
    var tempCSS = "background-image: url("+imageArray[0]+");"
    topDiv.setAttribute("style",tempCSS);
    topDiv.setAttribute("id",rowID);
    myDict[rowID] = {"key":key,"imageArray":imageArray,"indexImage":0,"numberOfImages":imageArray.length};
}

function changeImageCarouselTwo(rowID){
    // console.log(images);
    incrementImageIndexTwo(rowID);
    var tempIndex = myDict[rowID]["indexImage"];
    var tempCSS = "url("+myDict[rowID]["imageArray"][tempIndex]+");"
    console.log(tempCSS);
    tempID = "#"+rowID;
    console.log(tempID);
    $(tempID).css("background-image","url("+myDict[rowID]["imageArray"][tempIndex]+")");
    // $(tempID).css("background-image",tempCSS); DOES NOT WORK
    for (i = 0; i < myDict[rowID]["numberOfImages"]; i++) {
      if (i==myDict[rowID]["indexImage"]) {
        $('#circle'+i).css("background-color","#F0F0F0");
      } else {
        $('#circle'+i).css("background-color","grey");
      }
    }
}

function incrementImageIndexTwo(rowID){
  if (myDict[rowID]["indexImage"] + 1 == myDict[rowID]["numberOfImages"]){
    myDict[rowID]["indexImage"] = 0;
  } else {
    myDict[rowID]["indexImage"] = myDict[rowID]["indexImage"] + 1;
  }
}

function printDict(rowID) {
    console.log(myDict[rowID]["imageArray"]);
    console.log(myDict[rowID]["indexImage"]);
    console.log(myDict[rowID]["numberOfImages"]);
}

//debug
function debug() {
  if (urlCompany == null) {
    console.log('Company in URL is NULL');
  } else {
    console.log('Company: ' + urlCompany + '   Grouping: ' + urlType);
  }
}

function displayError() {
    let errorLabel = createNode('p'); // container for top
    errorLabel.setAttribute('class', 'errorLabel');
    append(one,errorLabel);
    errorLabel.innerText = "Sorry, the interwebs had a small bloop.";
}

function filterButtonColor() {
    if (urlFilter != null) {
        // $( ".filterbutton" ).css( "display", "none" );
        // document.getElementById(urlFilter).style.display = "inline-block";
        $( ".filterbutton" ).css( "backgroundColor", "#DDD" );
        $( ".filterbutton" ).css( "borderColor", "#FFF" );
    }
    else {
        $( ".filterbutton" ).css( "backgroundColor", "#FFF" );
        $( ".filterbutton" ).css( "borderColor", "#DDD" );
    }
}

function createURL(urlfilter, urlcompany) {
  var return_url = "empty";
  for (var i = 0; i < filterChecks.length; i++) {
    if (urlFilter === filterChecks[i]) {
        return_url = 'http://gsheets.herokuapp.com/menu?company='+urlCompany+'&filter='+filterChecks[i];
    }
  }
  if (return_url=="empty") {
    return_url = 'https://gsheets.herokuapp.com/menu?company='+urlCompany;
    }
  return return_url;
  // if (urlFilter == 'vegan'){
  //   return_url = 'http://gsheets.herokuapp.com/menu?company='+urlCompany+'&filter=vegan';
  // } else if (urlFilter == 'chocolate') {
  //   return_url = 'http://gsheets.herokuapp.com/menu?company='+urlCompany+'&filter=chocolate';
  // } else if (urlFilter == 'coffee') {
  //   return_url = 'http://gsheets.herokuapp.com/menu?company='+urlCompany+'&filter=coffee';
  // } else if (urlFilter == 'strawberry') {
  //   return_url = 'http://gsheets.herokuapp.com/menu?company='+urlCompany+'&filter=strawberry';
  // } else if (urlFilter == 'Vodka') {
  //   return_url = 'http://gsheets.herokuapp.com/menu?company='+urlCompany+'&filter=Vodka';
  // } else {
  //   return_url = 'https://gsheets.herokuapp.com/menu?company='+urlCompany;
  // }
}

function gifCreation(urlcompany, urltype) {
  if (urlcompany=="barista" && urltype!="menu") {
    $("#gif").attr("src", "143.gif");
    $("#gifContainer").css("visibility","visible");
  } else if (urlcompany=="saltandstraw" && urltype!="menu") {
    $("#gif").attr("src", "icecream.gif");
    $("#gifContainer").css("visibility","visible");
  }
}

function incrementOddEvenCount(){
  oddevencount = oddevencount + 1;
}

function isMenu() {
  if (urlType=="menu" && rowCompany == urlCompany && (
            rowType == "menu" || rowType == "section")) {
    return true;
  } else {
    return false;
  }
}

function setJsonVariables(jsonresponse,i){
  // excel row data
  rowID = jsonresponse[i][0];
  descriptionText = jsonresponse[i][1];
  imgLink = jsonresponse[i][2];
  imgLink = imgLink.split(',');
  rowType = jsonresponse[i][3];
  detailsText = jsonresponse[i][4];
  rowCompany = jsonresponse[i][5];
  link = jsonresponse[i][6];
  pricesText = jsonresponse[i][7];
  sizesText = jsonresponse[i][8];
  titleText = jsonresponse[i][9];
  ingredientsText = jsonresponse[i][10];
  filterText = jsonresponse[i][11];
  filterText = filterText.split(',');
}

function showSpinner() {
  spinner.className = "show";
}

function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

function createNode(element) { return document.createElement(element); }
function append(parent, el) { return parent.appendChild(el); }
