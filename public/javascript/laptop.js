(async function () {

    const laptopsSelectEl = document.getElementById("laptops-select");
    const laptopsEl = document.getElementById("laptops");
    const imageEl = document.getElementById("laptop-img-card");
    const laptopBuyHeaderEl = document.getElementById("buy-laptop-header");
    const laptopBuyTextEl = document.getElementById("buy-laptop-text");
    const laptopPriceTextEl = document.getElementById("laptop-price-text");
    
    const baseURL = "https://noroff-komputer-store-api.herokuapp.com/";

    /**
    * Fetches a number of laptops from a remote URL.
    * If the fetching was unsuccessful an error is thrown.
    */
    async function getLaptops() {
        try {
            return (await fetch(baseURL + "computers")).json();
        } catch (error) {
            console.log(error);
        }
    }

    /**
    * Adds an option html element to the DOM, which displayes the
    * laptops argument passed in the parameter.
    * This function the checks if the current laptop is the selected laptop
    * and displays information in regards to it.
    */
    function addOptionsToDOM(laptops = []) {
        laptops.map(function (laptop) {
            const laptopOptionEl = document.createElement("option");
            changeElementText(laptopOptionEl, laptop.title);
            laptopsSelectEl.appendChild(laptopOptionEl);
            if(isSelectedLaptop(laptop))
                displaySelectedOptionSpecs(laptop);
        });
    }

    /**
    * Retrieves all laptops, and then limits the information that
    * will be displayed to title, description, image, price and also
    * filters out the number of specs to 3.
    */
    const laptops = (await getLaptops()).map(function (laptop) {
        return {
            title: laptop.title,
            description: laptop.description,
            image: laptop.image,
            price: laptop.price,
            specs: laptop.specs.filter(function (spec, index) {
                return index < 3;
            })
        }
    });

    /**
    * Adds a select option for the current laptop,
    * and displays all of its content to the user.
    *
    */
    function displaySelectedOptionSpecs(laptop) {
        removeChildFromElement(laptopsEl);
        
        const laptopPEl = document.createElement("div");
        laptopPEl.innerText = formatString(laptop);
        laptopsEl.appendChild(laptopPEl);
        displayImage(laptop);
        changeElementText(laptopBuyHeaderEl, laptop.title);
        changeElementText(laptopBuyTextEl, laptop.description);
        changeElementText(laptopPriceTextEl, laptop.price);
    }

    /**
    * Displays the image of the currently selected laptop.
    * If the laptop image URL couldn't be found, then a
    * image is used instead.
    */
    function displayImage(laptop) {
        removeChildFromElement(imageEl);
        const imageToAddEl = document.createElement("img");
        
        imageToAddEl.src = baseURL + laptop.image;

        imageToAddEl.onerror = function() {
            imageToAddEl.src = "../images/placeholder.png";
        }
        imageToAddEl.className = "computerImage";
        imageEl.appendChild(imageToAddEl);
    }

    function changeElementText(element, text) {
        element.innerText = text;
    }

    function removeChildFromElement(element) {
        if(element.hasChildNodes())
            element.removeChild(element.firstChild);
    }

    function formatString(laptop) {
        return laptop.specs.reduce((previous, current) => (previous === "") ? current : previous + "\n" + current);
    }

    function isSelectedLaptop(laptop) {
        return laptop.title === laptopsSelectEl.value;
    }

    function getSelectedLaptop(laptops) {
        return laptops.filter(laptop => isSelectedLaptop(laptop))[0];
    }

    addOptionsToDOM(laptops);

    laptopsSelectEl.addEventListener("change", function () {
        displaySelectedOptionSpecs(getSelectedLaptop(laptops));
    });

    /**
    * Fires up when the buy button is pressed.
    * This function gets the price of the currently selected laptop,
    * and checks if the user can afford it.
    * If the price is too high then the user is alerted about this, otherwise
    * the price is subtracted from the users bank balance.
    */
    let buy = function() {
        const price = getSelectedLaptop(laptops).price;
        if(isBalanceHighEnough(price) !== true)
            alert("You can't afford this laptop!")
        else {
            payment(price);
            alert("You are the owner of a new laptop!")
        }
    }

    document.querySelector("#buyButton").addEventListener("click", buy);

})();
