// For getting input from buttons

function getInput(num) {
  document.getElementById("floatingInput").value += String(num);
}

// For clearing whole expression from screen

function clearInput() {
  document.getElementById("floatingInput").value = "";
}

// This function is called when '=' is pressed

function calculate() {
  let inputString = document.getElementById("floatingInput").value;

  let res = evaluate(inputString);

  addHistory(inputString, res);

  document.getElementById("floatingInput").value = String(res);
}

// Main function responsible for working of calculator

function evaluate(expression) {
  let exp = expression.split("");

  let values = [];

  let ops = [];

  for (let i = 0; i < exp.length; i++) {
    if (exp[i] == " ") {
      continue;
    }

    if (exp[i] >= "0" && exp[i] <= "9") {
      let num = "";

      while (i < exp.length && exp[i] >= "0" && exp[i] <= "9") {
        num = num + exp[i++];
      }
      values.push(parseFloat(num, 10));

      i--;
    } else if (
      exp[i] == "+" ||
      exp[i] == "-" ||
      exp[i] == "*" ||
      exp[i] == "/"
    ) {
      while (ops.length > 0 && hasPrecedence(exp[i], ops[ops.length - 1])) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }

      ops.push(exp[i]);
    }
  }

  while (ops.length > 0) {
    values.push(applyOp(ops.pop(), values.pop(), values.pop()));
  }

  return values.pop();
}

// function to check precedence of operators
function hasPrecedence(op1, op2) {
  if ((op1 == "*" || op1 == "/") && (op2 == "+" || op2 == "-")) {
    return false;
  } else {
    return true;
  }
}

// function to calculate answer
function applyOp(op, b, a) {
  switch (op) {
    case "+":
      return parseFloat(a + b);
    case "-":
      return parseFloat(a - b);
    case "*":
      return parseFloat(a * b);
    case "/":
      if (b == 0) {
        document.getElementById("floatingInput").value = "Infinity";
      }
      return parseFloat(a / b, 10);
  }
  return 0;
}

// function to add history of calculations
function addHistory(expression, res) {
  let newRow = document.createElement("tr");

  let cell1 = document.createElement("td");
  let newText1 = document.createTextNode(expression);
  cell1.appendChild(newText1);
  newRow.appendChild(cell1);

  let cell2 = document.createElement("td");
  let newText2 = document.createTextNode(String(res));
  cell2.appendChild(newText2);
  newRow.appendChild(cell2);

  const tablBody = document.getElementById("tableBody");
  tablBody.appendChild(newRow);
}

function removeHistory() {
  const tablBody = document.getElementById("tableBody");

  while (tablBody.hasChildNodes()) {
    tablBody.removeChild(tablBody.firstChild);
  }

  console.log(tablBody);
}
