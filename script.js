const generateInformationButton = document.getElementById('generateInformation');
const earthquakeInformation = document.getElementById('earthquake-information');
const container = document.getElementById('container');

const gettingTheApi = (e) =>{
    e.preventDefault();
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
    .then(response =>{
        if(response.ok){
            
            return response.json();
        }
        throw new Error('Request Failed!');
    }, networkError =>{
        console.log(networkError);
    }).then(data =>
        apiToVariables(data)   
        
    )
}

const apiToVariables = (earthquakeArray) =>{
    const mag = earthquakeArray.features;
    mag.forEach(element =>{
        let mag = element.properties.mag;
        let place = element.properties.place;
        let tsunami = element.properties.tsunami;
        let title = element.properties.title;
        let type = element.properties.type;

        createTheCards(mag,place,tsunami,title,type);

          
    }) 


}

const createTheCards = (magni, placeE, tsunamiE, titleE, typeE) =>{
    const newElement = document.createElement('div');
    newElement.setAttribute('class','earthquake-card');
    if(tsunamiE === 0) tsunamiE = "No";
    newElement.innerHTML = 
    `<h2 class="card-title">${titleE}</h2>
    <span>Magnit was: ${magni}</span>
    <span>Place: ${placeE}</span>
    <span>Was there a tsunami? ${tsunamiE}</span>
    <span>Type: ${typeE}</span>`;

    earthquakeInformation.appendChild(newElement);

    generateInformationButton.removeEventListener('click', gettingTheApi);
    generateInformationButton.addEventListener('click', ()=>{
        earthquakeInformation.removeChild(newElement);   

    });
    
    generateInformationButton.setAttribute('value', 'Update the information');  
    container.style.height = 'fit-content';   

}


generateInformationButton.addEventListener('click', gettingTheApi);
