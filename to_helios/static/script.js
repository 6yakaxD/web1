

function sendData() {
    const x = document.querySelector('input[name="x"]:checked')?.value;
    const y = document.getElementById('y').value;
    const r = document.querySelector('input[name="r"]:checked')?.value;

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
            const table = document.getElementById('result-table');
            let newRow = table.insertRow(-1);
            newRow.innerHTML = `
                <td>${json.x}</td>
                <td>${json.y}</td>
                <td>${json.r}</td>
                <td>${json.currentTime}</td>
                <td>${json.executionTime}</td>
                <td>${json.result}</td>
            `;

        }).catch(error => console.error('Error:', error));
}
