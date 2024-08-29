const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-TN',{
        style : "currency",
        currency : 'TND',
        minimumFractionDigits : 3
    })

    return formatter.format(num)

}

export default displayINRCurrency