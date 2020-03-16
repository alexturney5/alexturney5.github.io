var foodChecks = ["chocolate", "coffee", "strawberry"];
var flavorChecks = ["vegan", "vegetarian","gluten free","healthy choice", "pescatarian"];
var alcoholChecks = ["Vodka", "Whiskey", "Rum", "Tequila", "Mezcal", "Gin", "Rye", "Brandy", "Sake", "Scotch", "Bourbon"];
var filterChecks = [];
filterChecks.push(...foodChecks, ...flavorChecks, ...alcoholChecks);
console.log(filterChecks);
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
var descriptionText,imgLink,rowType,detailsText,rowCompany,link,pricesText,sizesText,titleText,ingredientsText,filterText,disclaimerText,OOSFlag,quantityText,caloriesText,markdownText,wifiText,hoursText;

gifCreation(urlCompany,urlType);
url = createURL(urlFilter, urlCompany);

showSpinner();
fetch(url,{mode: "cors"})
.then((resp) => resp.json()) // transform the data into json
.then(function(data) {
    hideSpinner();
    let jsonResponse = data.values;
    var arrayLength = jsonResponse.length;
    var arrayCount=0;
    // go through each row of the google sheet
    for (var i = 0; i < arrayLength; i++) {
        setJsonVariables(jsonResponse,i);
        if (disclaimerText != "n/a"){console.log(disclaimerText);}
        // MENU
        if (isMenu()) {
            incrementOddEvenCount()
            showErrorFlag = false;
            if (rowType=="menu") {
                createMenuCarouselAndName(one, descriptionText, imgLink, rowID);
            } else if (rowType=="section") {
                createMenuButton(one, descriptionText, link, rowCompany);
            }
        }
        // SUB MENU
        else if (rowType == urlType && rowCompany == urlCompany) {
            incrementOddEvenCount()
            showErrorFlag = false;
            backButton.setAttribute("href","?grouping=menu&company="+urlCompany);
            backImg.src = "http://alexturney.com/imgBin/xcta.png"
            createButtonFilters(filterText,filters);
            createSubMenuItem(one, descriptionText, link, imgLink, rowID, ingredientsText, sizesText, pricesText, detailsText)
        }
    }
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
        $( ".filterbutton" ).addClass( "clickedFilter" );
        $( ".filterbutton" ).removeClass( "unclickedFilter" );
    } else {
        $( ".filterbutton" ).addClass( "unclickedFilter" );
        $( ".filterbutton" ).removeClass( "clickedFilter" );
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
  disclaimerText = jsonresponse[i][12];
  OOSFlag = jsonresponse[i][13];
  quantityText = jsonresponse[i][14];
  caloriesText = jsonresponse[i][15];
  markdownText = jsonresponse[i][16];
  wifiText = jsonresponse[i][17];
  hoursText = jsonresponse[i][18];
}

function showSpinner() {
  spinner.className = "show";
}

function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

function createNode(element) { return document.createElement(element); }
function append(parent, el) { return parent.appendChild(el); }
