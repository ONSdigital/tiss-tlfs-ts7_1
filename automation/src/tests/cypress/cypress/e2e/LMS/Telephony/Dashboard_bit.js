import * as func from '../../../support/functions/functions';
import * as daybatch from '../../../support/functions/daybatch';
import { framework } from '../framework/framework';
new Date();
var all_text = ""
var caseid = ""
var dbsurvey = ""
var dbcountry = ""
// var environment = "lms-ts5.tiss.gcp.onsdigital.uk"
var scripts = "bp104_lmb_england_to,hh08_lms_wales_to,bp58_lmb_scotland_to,bp78_lms_england_to,bp99_lmb_wales_to,hh18_lms_scotland_to"
//var scripts = "hh18_lms_scotland_to"
//var
describe('CATI TS5_1', { retries: { runMode: 1 } }, function() {
	it('CATI TS5', function() {
        cy.visit('https://cati.preprod-blaise.gcp.onsdigital.uk/Blaise/Account/Login?ReturnUrl=%2FBlaise%2F');

        cy.contains('.navbar-brand', 'CATI Dashboard');
        cy.get('[id="Username"]').clear();
        cy.get('[id="Username"]').type("testeng1");
        cy.get('[id="Password"]').clear();
        cy.get('[id="Password"]').type("testeng1", { log: false });
        cy.contains('.btn', "Login").click();
		cy.wait(120000);
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.nav.active > :nth-child(3) > a').click();
        cy.get('.filter-row > .btn').click();
        cy.get(':nth-child(2) > .form-control').clear('4');
        cy.get(':nth-child(2) > .form-control').type('430010');
        cy.get('.filter-button').click();
        cy.get(':nth-child(19) > a > .glyphicon').click();
		cy.wait(120000);
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.nav.active > :nth-child(3) > a').click();
        cy.get('.filter-row > .btn').click();
        cy.get(':nth-child(2) > .form-control').clear('4');
        cy.get(':nth-child(2) > .form-control').type('430010');
        cy.get('.filter-button').click();
        cy.get(':nth-child(19) > a > .glyphicon').click();
        /* ==== End Cypress Studio ==== */
    })
})
