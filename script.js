//display table
async function addTable() {
    try {
        let res = await fetch('https://zackpersonalapi.herokuapp.com/api/investment');
        res = await res.json();

        res.bought.map((e) => {
            //main row
            const mainRow = document.createElement('tr');

            //date column
            const dateColumn = document.createElement('td');
            const dateText = document.createTextNode(e.date.slice(0,10));

            dateColumn.appendChild(dateText);

            mainRow.appendChild(dateColumn);

            //price column
            const priceColumn = document.createElement('td');
            const priceText = document.createTextNode("$ " + e.price);
            
            priceColumn.appendChild(priceText)

            mainRow.appendChild(priceColumn)

            //amount column
            const amountColumn = document.createElement('td');
            const amountText = document.createTextNode("$ " + e.bought);
            
            amountColumn.appendChild(amountText)

            mainRow.appendChild(amountColumn)

            //profit loss
            const percentage = (((res.lastPrice["4. close"] - e.price) / e.price) * 100).toFixed(2)
            const plColumn = document.createElement('td');
            const plText = document.createTextNode(percentage + " %");
            
            plColumn.appendChild(plText)

            if (percentage > 0) {
                mainRow.appendChild(plColumn).className = "green"
            } else {
                mainRow.appendChild(plColumn).className = "red"
            }

            //final
            const finalColumn = document.createElement('td');
            const finalText = document.createTextNode("$ " + e.finalPrice);
            
            finalColumn.appendChild(finalText)

            mainRow.appendChild(finalColumn)

            document.querySelector('tbody').appendChild(mainRow);
        })

        //add everything
        const sum = {
            totalAmount: res.bought.reduce((a, b) => a + b.bought, 0),
            afterRoi: res.bought.reduce((a,b) => a + b.finalPrice, 0)
        }

        document.querySelector('#first').innerHTML = "$ " + sum.totalAmount;
        document.querySelector('#second').innerHTML = "$ " + sum.afterRoi.toFixed(2);
        document.querySelector('#third').innerHTML = (((sum.afterRoi - sum.totalAmount) / sum.totalAmount) * 100).toFixed(2) + " %"
        
        //etf price
        const voo = document.createElement('p');
        const vooText = document.createTextNode("$ " + parseFloat(res.lastPrice["4. close"]).toFixed(2));

        voo.appendChild(vooText);

        document.querySelector('.price').appendChild(voo);

        //to show overall stats
        document.querySelector('.total').classList.add('show');
    } catch(err) {
        throw err;
    }
}

addTable();