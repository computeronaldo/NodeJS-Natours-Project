module.exports = (el, slugValue) => {
    let output = {};
    output = {
        ...el,
        slug: slugValue
    }
    return output;
};

