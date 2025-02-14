
const url = '././json/table.json'

async function addItemList(nameSelector, url) {
    try {
        var selector = document.querySelector(nameSelector)
        const response = await fetch(url)
        const content = await response.json()

        let items = content
            .map(item =>
                ` <tr><th>${item.name}</th>
                    <td>${item.values.current}</td>
                    <td>${item.values.yesterday}</td>
                    <td>${item.values.thisday}</td></tr>`
            )
            .join('\n')

        selector.innerHTML = items
        var arrayItem = content.map(e => e)
        createCanvas(arrayItem)
    } catch (e) {
        console.error('addItemList:', e)
        if (selector)
            selector.innerHTML = e
    }
}

addItemList('.body', url);

const createCanvas = (arrayItem) => {

    var speedCanvas = document.querySelector('canvas');
    speedCanvas.id = 'speedChart';
    var data = arrayItem
        .map(elem => {
            return ({
                current: elem.values.current,
                yesterday: elem.values.yesterday,
                thisday: elem.values.thisday,
            })
        }
        )
    console.log(Object.values(data[0]))
    var speedData = {
        labels: ['Текущий день', 'Вчера', 'Этот день недели'],
        datasets: [{
            label: 'Показатель, руб.',
            data: Object.values(data[0])

        }]
    };
    console.log(JSON.stringify(arrayItem))
    var chartOptions = {
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 40,
                fontColor: 'black'
            }
        }
    };

    var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: {
        }, chartOptions,
    }
    )
    return lineChart
};

document.addEventListener("DOMContentLoaded", hiddenCloseclick());
document.getElementById('click-to-hide').addEventListener("click", hiddenCloseclick);
function hiddenCloseclick() {
    let addStyleBlockHidden = document.getElementById('hidden-element');
    if (addStyleBlockHidden.style.display == "none") {
        addStyleBlockHidden.style.display = "block";
    } else {
        addStyleBlockHidden.style.display = "none"
    }
};
