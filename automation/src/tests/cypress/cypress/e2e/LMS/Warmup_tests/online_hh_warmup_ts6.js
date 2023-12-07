/*----------------------------------------------------------------------------------------------------------------
Script: HH6
Open Defects:
Closed Defects:
Author: RH
Last Update: 16/11/2021 ML, v27
----------------------------------------------------------------------------------------------------------------*/
//const { first } = require("lodash");
import * as func from '../../../support/functions/functions';
var array
var guid
var survey = "lmb"
var country = "sco"

describe('LMS Online Survey - Warm the server baby', function() {
  Cypress._.times(1, (k) =>{
    it('Warming the server as it is chilly on restart', function() {
      //Setting large timeout as warming server
      Cypress.config('defaultCommandTimeout', 1000000);
      //initialise sts
      func.check_sts();
      func.getuac(survey, country, "ts7", "a", "ts7");
      func.save_sts();

    //set up global api listener
    cy.intercept('POST', '**/api/application/*').as('saveCont');


      func.save_sts();

      cy.get('[role="button"]').contains('Start Now').click();
      cy.task('log', 'Starting 1st user...');

      //set up global api listener
      cy.intercept('POST', '**/api/application/*').as('saveCont');

      //Let's get going
      cy.contains('.text-container', 'Enter your details');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').type('Harry');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').type('Michael');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').type('Potter');
      func.save_cont();

      cy.contains('.text-container', 'What is your sex?');
      cy.get('.text-container').contains('Male').click();
      func.save_cont();

      cy.contains('.text-container', 'Is the address below your main residence');
      func.yes_no("No");

      cy.contains('.text-container', 'is not your main residence. What type of address is it?');
      cy.get('.text-container').contains('My holiday home').click();
      func.save_cont();

      cy.contains('.text-container', 'Is there anyone else who classes');
      func.yes_no("No");

      cy.contains('.text-container', 'Unfortunately, we cannot progress this study any further. ');
      func.save_cont();

      cy.contains('.text-container', 'Thank you, this part of the Shape Tomorrow study is now complete. You may close your browser.');

    });
    });
  });
