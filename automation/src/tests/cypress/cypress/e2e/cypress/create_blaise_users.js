import * as func from '../../support/functions/functions';
var array
var username
var environment = "lms-ts4.tiss.gcp.onsdigital.uk"

function extract_user(payload){
    const re = /lms((.|[\n\r])*)\d/g;
    var array = payload.match(re);
   return array;
 }

describe('Create Users for Blaise', function() {

    it('Create Users for STS in Blaise', function() {
        cy.visit('https://' + environment + '/Blaise/Account/Login?ReturnUrl=%2FBlaise%2F');

        cy.contains('.navbar-brand', 'CATI Dashboard');
        cy.get('[id="Username"]').clear();
        cy.get('[id="Username"]').type("Root");
        cy.get('[id="Username"]').should('have.value', "Root");
        cy.get('[id="Password"]').clear();
        cy.get('[id="Password"]').type("Root");
        cy.get('[id="Password"]').should('have.value', "Root");
        cy.contains('.btn', "Login").click();


        /* need a loop here doing 100 at a time or it runs out of mem and gets slow... */
        for (let count = 0; count < 100; count++){

        cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=users_add.csv').then((response) => {
            expect(response).property('status').to.equal(200);
            cy.log(response.body);
            username = extract_user(response.body);
            cy.log(username);
            const user = username[0].split(",");
            cy.log(username[0])

        cy.get('.nav.active > .dropdown > .dropdown-toggle').click();
        cy.get('.nav.active > .dropdown > .dropdown-menu > :nth-child(1) > a').click();
        cy.get('#btnAddUser').click();
        cy.get('#Name').clear();
        cy.get('#Name').type(user[0]);
        cy.get('#Password').clear();
        cy.get('#Password').type(user[1]);
        cy.get('#PasswordConfirm').clear();
        cy.get('#PasswordConfirm').type(user[1]);
        // cy.get('#RoleId').select('1');
        cy.get('.modal-footer > .btn-primary').click();


    });
};
    });
});

