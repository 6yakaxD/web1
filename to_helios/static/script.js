function validateForm() {
    const y = document.getElementById("y").value;
    const r = document.getElementById("r").value;

    if (!y || isNaN(y)) {
        alert("Поле Y должно быть числом!");
        return false;
    } else if (y < -3 || y > 3) {
        alert("Значение Y должно лежать в диапазоне от -3 до 3")
        return false;
    }

    if (!y || isNaN(y)) {
        alert("Поле R должно быть числом!");
        return false;
    } else if (y < 2 || y > 5) {
        alert("Значение R должно лежать в диапазоне от -3 до 3")
        return false;
    }

    return true;

}





function sendData() {
    const x = document.querySelector('input[name="x"]:checked')?.value;
    const y = document.getElementById('y').value;
    const r = document.getElementById('r').value;

    const data = JSON.stringify({
        x: parseFloat(x),
        y: parseFloat(y),
        r: parseFloat(r)
    });

    fetch('/fcgi-bin/app.jar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
    })
        .then(response => response.json())
        .then(json => {
            const table = document.querySelector("#result tbody");
            let newRow = table.insertRow(-1);
            newRow.innerHTML =
                `<table>
                    <tr>
                        <td>${json.x}</td>
                        <td>${json.y}</td>
                        <td>${json.r}</td>
                        <td>${json.result}</td>
                        <td>${json.currentTime}</td>
                        <td>${json.executionTime}</td>
                    </tr>
                </table>`

        }).catch(error => console.error('Error:', error));
}
