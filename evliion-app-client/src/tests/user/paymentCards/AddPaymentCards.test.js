const req = require('../../__mocks__/request');
test('add user cards successfully', () => {
    const card = {
        data:{
            name: 'Amit5',
            number: '4444444444444449',
            expMonth: '12',
            expYear: '2024',
            id: 6
        },
    };
    expect.assertions(1);
    return expect(req.addCard(card))
        .resolves.toBeGreaterThan(req.data.loggedUser.paymentCards.length);
});
test('update user cards successfully', () => {
    const card = {
        data:{
            name: 'Adhim',
            number: '4444444444444499',
            expMonth: '12',
            expYear: '2022',
            id: 4
        },
        target: 0,
        edit: true
    };
    expect.assertions(1);
    return expect(req.updateCard(card))
        .resolves.toEqual(req.data.loggedUser.paymentCards.length);

});

test('add user cards failed', () => {
    const card = {
        data:{
            name: 'Al azim',
            number: '5555555555555555',
            expMonth: '12',
            expYear: '2020',
            id: 6
        }
    };
    expect.assertions(1);
    return expect(req.addCard(card))
        .rejects.toStrictEqual(req.duplicateData);
});
test('update user cards failed', () => {
    const card = {
        data:{
            name: 'Arnaud',
            number: '5555555555555555',
            expMonth: '12',
            expYear: '2020',
            id: 4
        },
        target: 1,
        edit: true
    };
    expect.assertions(1);
    return expect(req.updateCard(card))
        .rejects.toStrictEqual(req.duplicateData);
});

test('delete user cards successfully', () => {
    const card = {
        data:{
            name: 'Arnaud',
            number: '5555555555555555',
            expMonth: '12',
            expYear: '2020',
            id: 5
        },
        target: 1,
    };
    expect.assertions(1);
    return expect(req.deleteCard(card))
        .resolves.toBeLessThan(req.data.loggedUser.paymentCards.length);
});
test('delete user cards failed', () => {
    const card = {
        data:{
            name: 'Arnaud',
            number: '5555555555555555',
            expMonth: '12',
            expYear: '2020',
            id: 10
        },
        target: 1,
    };
    expect.assertions(1);
    return expect(req.deleteCard(card))
        .rejects.toStrictEqual(req.failedDelete);
});



