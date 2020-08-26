const container = document.getElementById("image_container");
const loader = document.getElementById("loader");

const access_key = "cf-jn8U2FhKP8hCr5t_DwKQ8rgK86oyX5EMiqsAdwMg";

const count = 30;

const api_link = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=${count}`;

let photoArray;
let imagesLoaded = 0;
let readyToFetch = false;

// check if all the images are allowed
function imageLoader(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === photoArray.length){
        readyToFetch = true;
        loader.hidden = true;
    }
}

// helper function to set attribute into the dom
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// updating images to the dom

function updatingDomWithImages(){
    imagesLoaded = 0
    photoArray.forEach((photo) => {
        // creating a tag
        const item = document.createElement("a");
        setAttributes(item,{
            href:photo.links.html,
            target:"_blank"
        })
        // creating img tag
        const img = document.createElement("img");
        setAttributes(img,{
            title:photo.alt_description,
            src:photo.urls.regular
        })
        // Event Listener, check when each is finished loading
        img.addEventListener("load",imageLoader);
        // appending img into a tag
        item.appendChild(img);
        // appending a tag into window object
        container.appendChild(item)
    })
}

// fetching photos from api

async function getPhotos(){
    try
    {
    const response = await fetch(api_link);
    photoArray = await response.json();
    updatingDomWithImages();
    }
    catch(error){
        // catching errors
    }
}


// check to see if scrolling near the bottom of page, load more image.

window.addEventListener("scroll",() => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && readyToFetch){
        getPhotos();
        readyToFetch = false;
    }
})

// on load
getPhotos();


