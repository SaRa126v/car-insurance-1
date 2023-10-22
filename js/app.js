// Interface OOP.........................................

class Interface {

  // methods:

  // Display message box..............................
  displayMsg(msg) {
    // create message box
    const messageBox = this.errorMsgMaker(msg);
    // show message in dom
    form.insertBefore(messageBox, document.querySelector(".form-group"));

    // remove message box after some sec
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 5000);
  }

  // create message box for error ......................
  errorMsgMaker(msg) {
    const messageBox = document.createElement("div");
    messageBox.classList = "error";
    messageBox.innerText = msg;
    return messageBox;
  }

  // get the current year.................................

  currentYearr() {
    let curentYear = new Date().toLocaleDateString("fa-IR");

    // Slice date
    curentYear = curentYear.slice(0, 4);

    // get max year
    let maxYear = this.fixNumbers(curentYear);
    // previous years
    this.preYears(maxYear);
    return maxYear;
  }

  // convert strings to eng................................

  fixNumbers(fixed) {
    // Convert to number
    let persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ];
    if (typeof fixed === "string") {
      for (var i = 0; i < 10; i++) {
        fixed = fixed
          .replace(persianNumbers[i], i)
          .replace(arabicNumbers[i], i);
      }
    }

    return parseInt(fixed);
  }

  // previous years..................................
  // show previous years based on the current year

  preYears(maxYear, numYear) {
    numYear = config.yearsNumber;
    // get min year
    let minYear = maxYear - numYear;

    // create first option tag for title
    this.optionMaker("", `- انتخاب -`);

    // create a for loop for making all the option tags
    for (let i = maxYear; i >= minYear; i--) {
      this.optionMaker(i, `سال ${i}`);
    }
  }

  // make option tags based on the given value & text....
  // options for select tag year

  optionMaker(optValue, optText) {
    // access to the select tag
    const yearSelectTag = document.querySelector("#year");

    // create option tag
    const optionTag = document.createElement("option");
    optionTag.value = optValue;
    optionTag.innerText = optText;

    // append option to the selectYear
    yearSelectTag.appendChild(optionTag);
  }

  // spinner.............................................

  showSpinner() {
    // show spinner
    spinner.style.display = "block";
  }

  hideSpinner() {
    // hide spinner
    spinner.style.display = "none";
  }

  // result.............................................
  showResult(info, price) {
    // first show the spinner
    this.showSpinner();

    // convert number to car model
    switch (info.make) {
      case "1":
        info.make = "پراید";
        break;
      case "2":
        info.make = "اپتیما";
        break;
      case "3":
        info.make = "پورشه";
        break;
    }

    // convert level to the persian
    if (info.level == "basic") {
      info.level = "ساده";
    } else {
      info.level = "کامل";
    }

    // then hide it and show the result
    // call this function after loading (some time)
    setTimeout(() => {

      this.hideSpinner();

      // show result instead
      const result = document.querySelector("#result");
      // make a div for the quote
      const div = document.createElement("div");
      // template for show result
      div.innerHTML = `
                <p class="header">خلاصه فاکتور</p>
                <p>مدل ماشین: ${info.make}</p>
                <p>سال ساخت ${info.year}</p>
                <p>نوع بیمه: ${info.level}</p>
                <p class="total">قیمت نهایی: ${price}</p>`;
      // append result in the div
      result.appendChild(div);
    }, 3000);
  }
}

// Process OOP...........................................

class Process {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }
  // methods:
  // price calculation ....................................

  calculatePrice() {
    // variables
    let price = config.price;

    console.log(price);
    console.log(this.make);
    // + Calculate the price based on the Make chosen by user
    price = this.calMake(this.make, price);

    console.log(this.make);
    // + Calculate the price based on the Year chosen by user
    const year = new Interface().fixNumbers(this.year);

    // + Calculate year diffrence
    const diffrence = this.yearDiffrence(year);

    console.log(price);

    // + Calculate the price based on the car age of user
    price = this.getsCheaper(price, diffrence);

    console.log(price);
    // + Calculate the price based on the level chosen by user
    price = this.calLevel(this.level, price);

    console.log(price);
    return price;
  }

  // year diffrence.........................................

  yearDiffrence(year) {
    const max = new Interface().currentYearr();
    const diffrence = max - year;
    return diffrence;
  }

  // get the price based on the chosen make ...............

  calMake(chosenMake, price) {
    // variables
    const make = chosenMake;
    const basePrice = config.basePrice;
    const make1 = config.make1;
    const make2 = config.make2;
    const make3 = config.make3;

    switch (make) {
      case "1":
         price = basePrice * make1;
         console.log(price);
         console.log(make1);
      case "2":
         price = basePrice * make2;
         console.log(price);
         console.log(make2);
      case "3":
        price = basePrice * make3;
         console.log(price);
         console.log(make3);
    }
  }

  // calculate the price based on the chosen level.........

  calLevel(chosenLevel, price) {
    const basic = config.basic;
    const complete = config.complete;
    if (chosenLevel == "basic") {
      return (price = price * basic);
    } else {
      return (price = price * complete);
    }
  }

  // calculate the price based on the car age..............

  getsCheaper(price, diffrence) {
    // 3% cheaper for each year
    price = price - ((diffrence * 3) / 100) * price;
    return price;
  }
}

// Variables.............................................
const domm = new Interface();
const form = document.querySelector("#request-quote");
const spinner = document.querySelector("#loading img");
// information storage...................................

// we can change our config here without having to search for them
const config = {
  price: 0,
  basePrice: 2000000,
  make1: 1.15,
  make2: 1.3,
  make3: 1.8,
  // 30%
  basic: 1.3,
  // 50%
  complete: 1.5,
  yearsNumber: 20,
};
// Events................................................

document.addEventListener("DOMContentLoaded", afterLoad);
document.addEventListener("submit", submitForm);

// Functions..............................................
function afterLoad() {
  // get the current year and fix it
  domm.fixNumbers(domm.currentYearr());
}

// submit form...........................................

function submitForm(e) {
  e.preventDefault();

  // read value from the form
  const make = document.querySelector("#make").value;
  const year = document.querySelector("#year").value;
  const level = document.querySelector('input[name="level"]:checked').value;

  // check the value of fileds are correct
  if (make === "" || year === "" || level === "") {
    domm.displayMsg("لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر");
  } else {
    // STEP1: get info

    const info = {
      make: make,
      year: year,
      level: level,
    };

console.log(info.make);

    new Process(info.make, info.year, info.level);

    // loading.............................................
    // wait for some time then call this function
    // cannot be used in oop
    domm.showResult(info, new Process().calculatePrice());
  }
}
