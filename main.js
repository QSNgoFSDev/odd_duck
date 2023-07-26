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
    { title: "dragon", imgPath: "dragon.jpg" },
    { title: "pen", imgPath: "pen.jpg" },
    { title: "pet-sweep", imgPath: "pet-sweep.jpg" },
    { title: "scissors", imgPath: "scissors.jpg" },
    { title: "shark", imgPath: "shark.jpg" },
    { title: "sweep", imgPath: "sweep.png" },
    { title: "tauntaun", imgPath: "tauntaun.jpg" },
    { title: "unicorn", imgPath: "unicorn.jpg" },
    { title: "water-can", imgPath: "water-can.jpg" },
    { title: "wine-glass", imgPath: "wine-glass.jpg" },




]

function SourceDataItem(title, imgPath) {
    this.title = title
    this.imgPath = `./img/${imgPath}`
    this.clickRecord = 0
    this.displayRecord = 0
    


}

function ODDduckVoting(sourceDataInput) {
    this.sourceDataInput = sourceDataInput  /* create a copy of data go through - then to use as a flag in loop, to create new instances*/
    this.initialRound = 0;
    this.maxRounds = 25;
    this.numberOfTimesRandom = 3
    this.imgRenderCheck = [];


    this.dataPool = [];

    this.getDataToItem = function () {

        for (let i = 0; i < sourceDataInput.length; i++) {
            let dataAtm = sourceDataInput[i];

            this.dataPool.push(new SourceDataItem(dataAtm.title, dataAtm.imgPath))
        }
        console.log(sourceDataInput);
    }

    ODDduckVoting.prototype.renderfunction = function () {

        let container = document.getElementById('img-container');
        let randomImgString = '';
        let indexCheck = [];
        let lastThreeDistinctiveItems = this.imgRenderCheck.slice(-3);



        for (let i = 0; i < this.numberOfTimesRandom; i++) {
            let randomIndex;
            

            do {
                randomIndex = Math.floor(Math.random() * this.dataPool.length);
            } while (
                indexCheck.includes(randomIndex) ||
                lastThreeDistinctiveItems.some(function (img) {
                    return img.imgPath === this.dataPool[randomIndex].imgPath; // Fix: return the result of the comparison
                }.bind(this)
            //    this where im wrong. 
                // imgRenderCheck.some(function (img) {
                //     return img.imgPath === this.dataPool[randomIndex].imgPath;
                //     }.bind(this))
                )
            );

            indexCheck.push(randomIndex);

            let randomImg = this.dataPool[randomIndex];
            randomImg.displayRecord++;
            this.imgRenderCheck.push(randomImg);

            randomImgString += '<div class="img-content">' +
                '<div class="img-content__child">' +
                '<img src="' + randomImg.imgPath + '" alt="' + randomImg.title + '">' +
                '</div>' +
                '<h4>' + randomImg.title + '</h4>' +
                '<p> display ' + randomImg.displayRecord + ' times </p>' +
                '<p> have number of ' + randomImg.clickRecord + ' vote</p>' +
                '</div>';
        }

        container.innerHTML = randomImgString;
        
    };

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


            }
            );
        }

    };



    ODDduckVoting.prototype.showResult = function () {

        let showResultdiv = document.getElementById("show-result");

        showResultItems = ''



        this.dataPool.forEach((dataDisplay) => {

            showResultItems +=
                `
        
       
        <p>${dataDisplay.title} has ${dataDisplay.clickRecord}vote, and was seen ${dataDisplay.displayRecord} times </p>
      
        `



        });


        showResultdiv.innerHTML = showResultItems



    }

    ODDduckVoting.prototype.endDisplay = function () {
        let displayItem = document.getElementById("img-container")
        displayItem.style.display = 'none';

        let button = document.getElementById("result-button")
        button.style.display = 'block'

        let resultdiv = document.getElementById('show-result')
        resultdiv.style.display = 'block'



    }

    ODDduckVoting.prototype.buttonListener = function () {
        let that = this
        document.getElementById('result-button').addEventListener('click', function () {
            that.showResult();
        })
    }





    ODDduckVoting.prototype.startNextRound = function () {

        if (this.initialRound < this.maxRounds) {
            this.initialRound++;
            this.renderfunction();
            this.eventListent();
        } else {
            this.endDisplay();
            this.buttonListener();
        }
    }

}
let dataPresent = new ODDduckVoting(sourceData)
dataPresent.getDataToItem()
dataPresent.renderfunction()
dataPresent.eventListent()
dataPresent.buttonListener()