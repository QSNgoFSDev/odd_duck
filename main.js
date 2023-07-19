let sourceData = [
    { title: "bag", imgPath: "./img/bag.jpg" },
    { title: "banana", imgPath: "./img/banana.jpg" },
    { title: "bathroom", imgPath: "./img/bathroom.jpg" },
    { title: "boots", imgPath: "./img/boots.jpg" },
    { title: "breakfast", imgPath: "./img/breakfast.jpg" },

]

function SourceDataItem(title, imgPath) {
    this.title = title
    this.imgPath = imgPath
    this.clickRecord = 0
    this.displayRecord = 0
}.

function DataImport(sourceDataInput) {
    this.sourceDataInput = sourceDataInput  /* create a copy of data go through*/

    this.dataPool = []

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
        let displayRecord = 0;


        // 3 times random
        for (let i = 0; i < 3; i++) {


            do {
                randomIndex = Math.floor(Math.random() * this.dataPool.length);
            } while (indexCheck.includes(randomIndex));

            indexCheck.push(randomIndex)

            // indexCheck.push(randomIndex)
            // for (let k= 0; k<indexCheck.length;k++){
            //     let checker = indexCheck[k];
            //     if(checker != randomIndex){
            //         randomImg = this.dataPool[randomIndex];

            //     }

            // }



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

        //    for (let i=0;i<25;i++){
        // let render = this.renderfunction


        let imgListen = document.querySelectorAll("#img-container img")

        for (let k = 0; k < imgListen.length; k++) {
            let clicked = null;

            imgListen[k].addEventListener("click", () => {

                for (let i = 0; i < this.dataPool.length; i++) {
                    let compareData = this.dataPool[i];
                    if (compareData.imgPath === imgListen[k].getAttribute("src")) {
                        clicked = compareData
                        clicked.clickRecord++;


                    }
                }
                console.log(clicked)

            }
            )

        }




    }

}

let dataPresent = new DataImport(sourceData)
dataPresent.getDataToItem()
dataPresent.renderfunction()
dataPresent.eventListent()
