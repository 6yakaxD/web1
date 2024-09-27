

function validateForm() {

    const xChecked = document.querySelector('input[name="x"]:checked');
    if (!xChecked) {
        alert("Выберите значение X!");
        return false;
    }

    const y = document.getElementById('y').value;
    if (!y || isNaN(y)) {
        alert("Поле Y должно быть числом!");
        return false;
    } else if (y < -3 || y > 3) {
        alert("Значение Y должно лежать в диапазоне от -3 до 3");
        return false;
    }

    const r = document.getElementById('r').value;
    if (!r || isNaN(r)) {
        alert("Поле R должно быть числом!");
        return false;
    } else if (r < 2 || r > 5) {
        alert("Значение R должно лежать в диапазоне от 2 до 5");
        return false;
    }

    return true;
}


function sendData() {
    const x = document.querySelector('input[name="x"]:checked')?.value;
    const y = document.getElementById('y').value;
    const r = document.getElementById('r').value;

    if (validateForm()) {
        const data = JSON.stringify({
            x: parseFloat(x),
            y: parseFloat(y),
            r: parseFloat(r)
        });

        fetch('/fcgi-bin/server.jar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                const table = document.querySelector("#result-table tbody");
                let newRow = table.insertRow(0);
                newRow.innerHTML =
                    `<tr>
                       <td>${json.x}</td>
                       <td>${json.y}</td>
                       <td>${json.r}</td>
                       <td>${json.result}</td>
                       <td>${json.currentTime}</td>
                       <td>${json.executionTime}</td>
                    </tr>`

                const results = JSON.parse(localStorage.getItem('results')) || [];
                results.push(json);
                localStorage.setItem('results', JSON.stringify(results));

            }).catch(error => console.error('Error:', error));
    }
}

// Подгружаем результаты из LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const table = document.querySelector("#result-table tbody");
    results.forEach(result => {
        const newRow = table.insertRow(0);
        newRow.innerHTML =
            `<tr>
               <td>${result.x}</td>
               <td>${result.y}</td>
               <td>${result.r}</td>
               <td>${result.result}</td>
               <td>${result.currentTime}</td>
               <td>${result.executionTime}</td>
            </tr>`
    });
});