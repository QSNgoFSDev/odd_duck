let sourceData = [
    { title: "bag", imgPath: "bag.jpg" },
    { title: "banana", imgPath: "banana.jpg" },
    { title: "bathroom", imgPath: "bathroom.jpg" },
    { title: "boots", imgPath: "boots.jpg" },
    { title: "breakfast", imgPath: "breakfast.jpg" },
    { title: "bubblegum", imgPath: "bubblegum.jpg" },
    { title: "chair", imgPath: "chair.jpg" },
    { title: "cthulhu", imgPath: "cthulhu.jpg" },
    { title: "dog-duck", imgPath: "dog-duck.jpg" },


]

function SourceDataItem(title, imgPath) {
    this.title = title
    this.imgPath = `./img/${imgPath}`
    this.clickRecord = 0
    this.displayRecord = 0


}

function DataImport(sourceDataInput) {
    this.sourceDataInput = sourceDataInput  /* create a copy of data go through - then to use as a flag in loop, to create new instances*/
    this.initialRound = 0;

    this.dataPool = [];

    this.getDataToItem = function () {

        for (let i = 0; i < sourceDataInput.length; i++) {
            let dataAtm = sourceDataInput[i];

            this.dataPool.push(new SourceDataItem(dataAtm.title, dataAtm.imgPath))
        }
        console.log(sourceDataInput);
    }

    this.renderfunction = function () {
        let container = document.getElementById('img-container')
        randomImgString = ''
        let indexCheck = [];



        // 3 times random
        for (let i = 0; i < 3; i++) {


            do {
                randomIndex = Math.floor(Math.random() * this.dataPool.length);
            } while (indexCheck.includes(randomIndex));

            indexCheck.push(randomIndex)

            let randomImg = this.dataPool[randomIndex];
            randomImg.displayRecord++
            randomImgString += `
                    <h4>${randomImg.title}</h4>
                    <img src="${randomImg.imgPath}" alt="${randomImg.title}<">
                    <p>${randomImg.displayRecord}</p>
            `;

        }
        container.innerHTML = randomImgString

    }

    this.eventListent = function () {

        let imgListen = document.querySelectorAll("#img-container img")
        console.log(imgListen)
        console.log(this.dataPool)

        for (let k = 0; k < imgListen.length; k++) {
            let clicked = null;

            imgListen[k].addEventListener("click", () => {

                for (let i = 0; i < this.dataPool.length; i++) {
                    let compareData = this.dataPool[i];
                    if (compareData.imgPath === imgListen[k].getAttribute("src")) {
                        clicked = compareData
                        clicked.clickRecord++;
                        this.startNextRound();

                    }

                }

                console.log(clicked)
            }
            );
        }

    };

}

DataImport.prototype.showResult = function () {

    let showResultdiv = document.getElementById("show-result");
    let showResultItems = '';



    this.dataPool.forEach((dataDisplay) => {

        showResultItems +=
            `
        <ul>
        <li>${dataDisplay.title} had ${dataDisplay.clickRecord} had been display for ${dataDisplay.displayRecord} and </li>
        </ul>
        
        `



    });
    showResultdiv.innerHTML = showResultItems

}

DataImport.prototype.endDisplayfuntion = function () {
    let displayItem = document.getElementById("img-container")
    displayItem.style.display = 'none';

    let button = document.getElementById("result-button")
    button.style.display = 'block';
    this.showResult();

}


const maxRounds = 25;


DataImport.prototype.startNextRound = function () {

    if (this.initialRound < maxRounds) {
        this.initialRound++;
        this.renderfunction();
        this.eventListent();
    } else {
        this.endDisplayfuntion()
    }
}

let dataPresent = new DataImport(sourceData)
dataPresent.getDataToItem()
dataPresent.renderfunction()
dataPresent.eventListent()
