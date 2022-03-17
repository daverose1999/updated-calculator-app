export default {
  name: "CalculatorView",

  data() {
    return {
      themeIndex: null,
      themeCount: null,
      localTheme: null,
      themes: [
        {
          "--primaryColor": "#3A4764",
          "--secondaryColor": "#ffffff",
          "--toggleBgColor": "#232C43",
          "--toggleKey": "#D03F2F",
          "--numberScreen": "#182034",

          "--color1": "#EAE3DC",
          "--shadow1": "#B4A597",

          "--color2": "#637097",
          "--shadow2": "#93261A",

          "--color3": "#EAE3DC",
          "--shadow3": "#404e72",

          "--keyColor": "#444B5A",
          "--keyColor2": "#ffffff",
          "--keyColor3": "#ffffff",
        },
        {
          "--primaryColor": "#E6E6E6",
          "--secondaryColor": "#35352C",
          "--toggleBgColor": "#D1CCCC",
          "--toggleKey": "#CA5502",
          "--numberScreen": "#EDEDED",

          "--color1": "#EAE3DC",
          "--shadow1": "#B4A597",

          "--color2": "#377F86",
          "--shadow2": "#893901",

          "--color3": "#EAE3DC",
          "--shadow3": "#1B5F65",

          "--keyColor": "#444B5A",
          "--keyColor2": "#ffffff",
          "--keyColor3": "#ffffff",
        },
        {
          "--primaryColor": "#160628",
          "--secondaryColor": "#FFE53D",
          "--toggleBgColor": "#1D0934",
          "--toggleKey": "#00E0D1",
          "--numberScreen": "#1D0934",

          "--color1": "#341C4F",
          "--shadow1": "#871C9C",

          "--color2": "#58077D",
          "--shadow2": "#6CF9F2",

          "--color3": "#00E0D1",
          "--shadow3": "#BC15F4",

          "--keyColor": "#FFE53D",
          "--keyColor2": "#ffffff",
          "--keyColor3": "#1B2428",
        },
      ],
      calculator: {
        displayValue: "0",
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
      },
      value: "",
    };
  },

  mounted() {
    //Activate theme
    document.querySelector(".mode").style.opacity = 1;
    this.localTheme = localStorage.getItem("theme"); //gets stored theme value if any
    this.themeIndex = Number(this.localTheme);
    // console.log(this.localTheme);
    this.activateTheme(this.localTheme);

    //Handle key presses
    const keys = document.querySelector(".grid-container");
    keys.addEventListener("click", (event) => {
      // Access the clicked element
      const { target } = event;

      // Check if the clicked element is a button.
      // If not, exit from the function
      if (!target.matches("li")) {
        return;
      }

      if (target.classList.contains("operator")) {
        console.log("operator", target.textContent);
        // console.log(this.calculator);
        const op = target.textContent;
        this.handleOperator(op === "x" ? "*" : op);
        this.updateDisplay();
        return;
      }

      if (target.classList.contains("decimal")) {
        console.log("decimal", target.textContent);
        console.log(this.calculator);
        this.inputDecimal(target.textContent);
        this.updateDisplay();
        return;
      }

      if (target.classList.contains("all-clear")) {
        console.log("clear", target.textContent);
        this.resetCalculator();
        this.updateDisplay();
        return;
      }

      if (target.classList.contains("delete")) {
        this.deleteNumber();
        this.updateDisplay();
        return;
      }

      console.log("digit", target.textContent);
      console.log(this.calculator);
      this.inputDigit(target.textContent);
      this.updateDisplay();
    });
  },

  watch: {
    themeIndex() {
      for (let i = 0; i < this.themeCount; i++) {
        document.querySelector(`.mode${i}`).style.opacity = 0;
      }
      document.querySelector(`.mode${this.themeIndex}`).style.opacity = 1;
    },

    localTheme() {
      document.querySelector(".mode").style.opacity = 0;
      document.querySelector(`.mode${this.localTheme}`).style.opacity = 1;
    },
  },

  methods: {
    // Update the display
    updateDisplay() {
      // select the element with class of `calculator-screen`
      // update the value of the element with the contents of `displayValue`
      // display.value = this.calculator.displayValue;
      this.value = this.calculator.displayValue.replace(
        /\d(?=(?:\d{3})+$)/g,
        "$&,"
      );
      // this.value = this.value.toLocaleString();
    },

    //. when the user hits an operator after entering the second operand
    //it should calculate and update
    calculate(firstOperand, secondOperand, operator) {
      if (operator === "+") {
        return firstOperand + secondOperand;
      } else if (operator === "-") {
        return firstOperand - secondOperand;
      } else if (operator === "*") {
        return firstOperand * secondOperand;
      } else if (operator === "/") {
        return firstOperand / secondOperand;
      }

      return secondOperand;
    },

    getFocus() {
      document.getElementById("myTextField").focus();
    },

    //Input the digits
    inputDigit(digit) {
      const { displayValue, waitingForSecondOperand } = this.calculator;

      //If the waitingForSecondOperand property is set to true, the displayValue property
      //is overwritten with the digit that was clicked.
      if (waitingForSecondOperand === true) {
        this.calculator.displayValue = digit;
        this.calculator.waitingForSecondOperand = false;
      } else {
        this.calculator.displayValue =
          displayValue === "0" ? digit : displayValue + digit;
      }
    },

    //Input Decimal
    inputDecimal(dot) {
      console.log(this.$refs.screen);
      if (this.calculator.waitingForSecondOperand === true) {
        this.calculator.displayValue = "0.";
        this.calculator.waitingForSecondOperand = false;
        return;
      }

      // If the `displayValue` property does not contain a decimal point
      if (!this.calculator.displayValue.includes(dot)) {
        // Append the decimal point
        this.calculator.displayValue += dot;
      }
    },

    //Handling operators
    handleOperator(nextOperator) {
      // Destructure the properties on the calculator object
      const { firstOperand, displayValue, operator } = this.calculator;

      // `parseFloat` converts the string contents of `displayValue`
      // to a floating-point number
      const inputValue = parseFloat(displayValue);

      // when two or more operators are entered consecutively
      if (operator && this.calculator.waitingForSecondOperand) {
        this.calculator.operator = nextOperator;
        console.log(this.calculator);
        return;
      }
      // verify that `firstOperand` is null and that the `inputValue`
      // is not a `NaN` value
      if (firstOperand === null && !isNaN(inputValue)) {
        // Update the firstOperand property
        this.calculator.firstOperand = inputValue;
      } else if (operator) {
        const result = this.calculate(firstOperand, inputValue, operator);

        // this.calculator.displayValue = String(result);
        this.calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        this.calculator.firstOperand = result;
      }

      this.calculator.waitingForSecondOperand = true;
      this.calculator.operator = nextOperator;
    },

    resetCalculator() {
      this.calculator.displayValue = "0";
      this.calculator.firstOperand = null;
      this.calculator.waitingForSecondOperand = false;
      this.calculator.operator = null;
    },

    deleteNumber() {
      if (this.calculator.displayValue) {
        let removeLastChar = this.calculator.displayValue.slice(
          0,
          this.calculator.displayValue.length - 1
        );
        this.calculator.displayValue = removeLastChar;
      }
    },

    toggleTheme() {
      this.themeIndex++;
      this.themeCount = Object.keys(this.themes).length;
      this.themeIndex =
        this.themeIndex <= this.themeCount - 1 ? this.themeIndex : 0;

      this.theme = this.themeIndex;

      localStorage.setItem("theme", this.theme); // stores theme value on local storage
      this.activateTheme(this.theme);
    },

    activateTheme(theme) {
      for (let prop in this.themes[theme]) {
        document
          .querySelector(":root")
          .style.setProperty(prop, this.themes[theme][prop]);
      }
    },
  },
};
