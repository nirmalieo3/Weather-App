const appid = '7b935f26e7452e8e607a4c09fb10f184';


window.addEventListener('load', function() {
    
    document.querySelector('#meteo').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let citta = document.querySelector('#citta').value;
        let stateCode = document.querySelector('#stateCode').value;

       
        creaCardMeteoPromise(citta, stateCode);

    })
})



function caricaMeteoPromise(nomeCitta, stateCode) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${nomeCitta},${stateCode}&appid=${appid}&units=metric&lang=en`)
        // effettuiamo la richiesta con send
        xhr.send();
    })
}


function creaCardMeteoPromise(nomeCitta, stateCode) {
    caricaMeteoPromise(nomeCitta, stateCode).then(
        (infoMeteo) => {
            console.log(infoMeteo)

            let iconURL =  `http://openweathermap.org/img/w/${infoMeteo.weather[0].icon}.png`

            console.log(infoMeteo);
            let card = `
            <div>
                <img src="${iconURL}">
                <h2>${infoMeteo.name}</h2>
                <p> Temperature: ${infoMeteo.main.temp}</p>
                <p> Temperature Max: ${infoMeteo.main.temp_max}</p>
                <p> Temperature Min: ${infoMeteo.main.temp_min}</p>
                <p> Condition: ${infoMeteo.weather[0].description}</p>
            </div>
            `


            document.querySelector('#container').innerHTML = card
        },
        (error) => {
            alert(`c'è stato un errore ${error}`)
        }
    )
}

    