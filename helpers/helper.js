module.exports = {
    makeCards: n => {
        var currentCard = "";
        for (var i = 0; i < n; ++i) 
        currentCard += `<div class="card"></div>`;
        return currentCard;
    },

    numberOfCards: 4
};
