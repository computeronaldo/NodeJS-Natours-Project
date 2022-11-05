module.exports = (template, el) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, el.productName);
    output = output.replace(/{%IMAGE%}/g, el.image);
    output = output.replace(/{%QUANTITY%}/g, el.quantity);
    output = output.replace(/{%PRICE%}/g, el.price);
    output = output.replace(/{%ID%}/g, el.id);
    output = output.replace(/{%DESCRIPTION%}/g, el.description);
    output = output.replace(/{%FROM%}/g, el.from);
    output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
    output = output.replace(/{%SLUG%}/g, el.slug);
    if(!el.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
};

