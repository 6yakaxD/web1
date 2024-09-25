document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".data-form");
    const resultTable = document.querySelector("#result-table");
    const resultButton = document.querySelector("#resultButton");

    resultButton.addEventListener("click", function(event) {
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        const xValue = document.querySelector('input[name="x"]:checked').value;
        const yInput = document.querySelector("#y");
        const rInput = document.querySelector("#r");

        let yValue, rValue;

        if (yInput.value.trim() === "") {
            alert("Введите Y");
            return;
        } else if (![-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0].includes(parseFloat(yInput.value))) {
            alert("Y должен быть в диапазоне [-3, 3]");
            return;
        } else {
            yValue = parseFloat(yInput.value);
        }

        if (rInput.value.trim() === "") {
            alert("Введите R");
            return;
        } else if (![2.0, 3.0, 4.0, 5.0].includes(parseFloat(rInput.value))) {
            alert("R должен быть в диапазоне [2, 5]");
            return;
        } else {
            rValue = parseFloat(rInput.value);
        }

        const jsonData = {
            x: parseFloat(xValue),
            y: yValue,
            r: rValue
        };

        xhr.send(JSON.stringify(jsonData));

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                  <td>${response.x}</td>
                  <td>${response.y}</td>
                  <td>${response.r}</td>
                  <td>${response.currentTime}</td>
                  <td>${response.executionTime}</td>
                  <td>${response.result ? "true" : "false"}</td>
                `;
                resultTable.appendChild(newRow);
            } else {
                alert("Error");
                console.error("Error:", xhr.statusText);
            }
        };
    });
});