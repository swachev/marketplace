const data = {
    loggedUser: {
        paymentCards: [
            {
                name: 'Amit',
                number: '4444444444444444',
                expMonth: '12',
                expYear: '2022',
                id: 4
            },
            {
                name: 'Arnaud',
                number: '5555555555555555',
                expMonth: '12',
                expYear: '2020',
                id: 5
            }],
        status: 201,
    }
};
const failedData = {status: 500, error: 'Internal server error'};
const failedDelete = {status: 404, error: 'card not found'};
const duplicateData = {status: 500, error: 'Card already exist'};

const getLoggedUserCardsSuccess = () => {
    return Promise.resolve(data);
};

const getLoggedUserCardsFailed = () => {
    return Promise.reject(failedData);
};

const handleNewCard = (card) => {
    const thisCards = [...data.loggedUser.paymentCards];

    if (card.edit) {
        for (let i = 0; i < thisCards.length; i++) {
            if(card.data.id !== thisCards[i].id && (card.data.number === thisCards[i].number && card.data.expMonth === thisCards[i].expMonth &&
                card.data.expYear === thisCards[i].expYear)) {
                return Promise.reject(duplicateData);
            }
        }
        thisCards[card.target] = card.data;
        return Promise.resolve(thisCards.length);
    }
    for (let i = 0; i < thisCards.length; i++) {
        if(card.data.number === thisCards[i].number) {
            return Promise.reject(duplicateData);
        }
    }
    thisCards.push(card.data);
    return Promise.resolve(thisCards.length);
};


const deleteCard = (card) => {
    const thisCards = [...data.loggedUser.paymentCards];
    let notFound = false;
    for (let i = 0; i < thisCards.length; i++) {
        if(card.data.id !== thisCards[card.target].id) {
           notFound = true;
        }
    }
    return notFound? Promise.reject(failedDelete): Promise.resolve(thisCards.filter(value => value !== thisCards[card.target]).length);
};

exports.addCard = handleNewCard;
exports.updateCard = handleNewCard;
exports.deleteCard = deleteCard;
exports.getLoggedUserCardsSuccess = getLoggedUserCardsSuccess;
exports.getLoggedUserCardsFailed = getLoggedUserCardsFailed;
exports.data = data;
exports.failedData = failedData;
exports.failedDelete = failedDelete;
exports.duplicateData = duplicateData;
