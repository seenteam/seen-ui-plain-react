describe("Main page spec", () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    it('Should contain the string "Seen"',  () => {
        cy.get('main').should('contain', 'Seen')

    })










})
