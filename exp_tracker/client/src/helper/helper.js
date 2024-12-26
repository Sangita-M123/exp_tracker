import  _ from 'lodash';

export function getSum(transaction, type){
    let sum = _(transaction)
                      .groupBy("type")
                      .map((objs, key) => {
                        if(!type) return _.sumBy(objs, 'amount'); // [300, 350, 500]
                        return {
                            'type' : key,
                            'color' : objs[0].color,
                            'total' : _.sumBy(objs, 'amount')
                        }
                      })
                      .value()
    return sum;
}

export function getLabels(transaction) {
    let amountSum = getSum(transaction, 'type'); // Summing by type
    let Total = _.sum(getSum(transaction)); // Getting the total of all transactions

    // Make sure "Savings" is included in the sum and percentage calculation
    let percent = _(amountSum)
        .map(objs => _.assign(objs, { percent: (100 * objs.total) / Total }))
        .value();

    // Ensure that all types (including Savings) are present
    const types = ["Investment", "Expense", "savings"];
    types.forEach(type => {
        if (!percent.some(p => p.type === type)) {
            percent.push({
                type: type,
                total: 0,
                percent: 0,
                color: "#f9c74f" // Set a default color for Savings if not present
            });
        }
    });

    return percent;
}


export function chart_Data(transaction, custom){

    let bg = _.map(transaction, a => a.color)
    bg = _.uniq(bg)
    let dataValue = getSum(transaction)

    const config = {
        data : {
          datasets: [{
              data: dataValue,
              backgroundColor: bg,
              hoverOffset: 4,
              borderRadius : 30,
              spacing: 10
            }]
        },
        options : {
            cutout: 115
        }
    }

    return custom ?? config;

}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}