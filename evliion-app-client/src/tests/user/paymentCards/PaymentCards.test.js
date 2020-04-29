const req = require('../../__mocks__/request');
test('fetch logged user cards succeeded', () => {
    return expect(req.getLoggedUserCardsSuccess())
        .resolves.toStrictEqual(req.data);
});
test('tests status code messages when successfully load user cards', () => {
    expect.assertions(1);
    return req.getLoggedUserCardsSuccess().then(e =>
        expect(e.loggedUser.status).toEqual(201)
    );
});

test('fetch logged user cards failed', () => {
    expect.assertions(1);
    return expect(req.getLoggedUserCardsFailed())
        .rejects.toStrictEqual(req.failedData);
});

test('tests status code messages when failed load user cards', () => {
    expect.assertions(1);
    return req.getLoggedUserCardsFailed().catch(e =>
        expect(e.status).toEqual(500)
    );
});



