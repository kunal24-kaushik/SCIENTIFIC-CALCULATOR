const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

const historyItems = [];

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

function factorial(n){
    if(n < 0) return NaN;
    if(n === 0) return 1;

    let result = 1;

    for(let i=1;i<=n;i++){
        result *= i;
    }

    return result;
}

function updateHistory(){

    if(historyItems.length === 0){
        historyList.innerHTML = "No history yet.";
        return;
    }

    historyList.innerHTML = "";

    historyItems.slice().reverse().forEach(item => {

        const div = document.createElement("div");

        div.className = "history-item";

        div.textContent = item;

        historyList.appendChild(div);
    });
}

function addHistory(input,result){

    historyItems.push(`${input} = ${result}`);

    updateHistory();
}

function clearHistory(){

    historyItems.length = 0;

    updateHistory();
}

function calculate(){

    try{

        const input = display.value;

        let expr = input;

        expr = expr.replace(/π/g,"3.14");
        expr = expr.replace(/×/g,"*");
        expr = expr.replace(/÷/g,"/");
        expr = expr.replace(/−/g,"-");
        expr = expr.replace(/\^/g,"**");

        expr = expr.replace(/sin\(/g,"Math.sin((Math.PI/180)*");
        expr = expr.replace(/cos\(/g,"Math.cos((Math.PI/180)*");
        expr = expr.replace(/tan\(/g,"Math.tan((Math.PI/180)*");
        expr = expr.replace(/log\(/g,"Math.log10(");

        expr = expr.replace(
            /(\d+(?:\.\d+)?)!/g,
            (m,n)=>`factorial(${n})`
        );

        expr = expr.replace(
            /(\d+(?:\.\d+)?)%/g,
            (m,n)=>`(${n}/100)`
        );

        const result = eval(expr);

        display.value = result;

        addHistory(input,result);

    }
    catch(error){

        display.value = "Error";
    }
}
