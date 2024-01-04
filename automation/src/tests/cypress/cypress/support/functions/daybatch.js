import * as func from '../functions/functions';
var array
var guid
var username
/*----------------------------------------------------------------------------------------------------------------
Script: Create Daybatch for defined country
Author: ML
Created: 01/12/2021
Last Update:
----------------------------------------------------------------------------------------------------------------*/

function daybatch(dbsurvey, dbcountry, environment){

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    //cy.visit('https://lms.technical-testers.census-gcp.onsdigital.uk/Blaise/Account/Login?ReturnUrl=%2FBlaise%2F');
    cy.visit('https://' + environment + '/Blaise/Account/Login?ReturnUrl=%2FBlaise%2F');

    cy.contains('.navbar-brand', 'CATI Dashboard');
    cy.get('[id="Username"]').clear();
    cy.get('[id="Username"]').type("Root");
    cy.get('[id="Username"]').should('have.value', "Root");
    cy.get('[id="Password"]').clear();
    cy.get('[id="Password"]').type("Root", { log: false });
    cy.get('[id="Password"]').should('have.value', "Root");
    cy.contains('.btn', "Login").click();
    //Delete the exisiting daybatch to minimise issues - removed because it deleted other daybatches from other surveys
    cy.get('.nav.active > :nth-child(1) > a').click();
    // This only works for TS7
    // @Todo - change the integer for each survey - get it in a table or something
    cy.get(':nth-child(1) > :nth-child(9) > .modal-action > .glyphicon').click();
    // cy.contains('.modal-title', 'Backup and clear CATI data');
    cy.get('#chkBackupAll').uncheck();
    cy.get('#chkBackupAll').should('not.be.checked');
    cy.get('#chkClearAll').check();
    cy.get('#chkClearAll').should('be.checked');
    cy.get('.btn-primary').click();
    cy.get('.filter-row').click();
    cy.get('.toast-success',{timeout: 15000}).should('be.visible')
    cy.contains('.toast-success','Backup and clear CATI data Completed')
    cy.wait(2000);
    if (dbsurvey != "" && dbcountry != ""){
    //Now change the specification to correct Country and Survey - Skip if already the same
        cy.get('.nav.active > :nth-child(10) > a').click();
        cy.get('.nav.active > :nth-child(10) > a').click();
        cy.get('#InstrumentId').select('LMS2311_TS7');// Change this for different package names
        cy.get(':nth-child(7) > .panel-heading > .panel-title > .accordion-toggle').click();
        cy.get('#btnEditSelectFields').click();
        cy.get('.form-horizontal > :nth-child(11) > :nth-child(2) > :nth-child(2)').click();
        //checking to see if the spec loaded is the same as the test params
        cy.get('body').then(($body) => {
          if ($body.text().includes(dbcountry) && $body.text().includes(dbsurvey))  {
            cy.contains('.btn-default', 'Close').click();
            cy.wait(2000);
        }
          else {
            cy.get('#Fields_2__Values').clear();
            cy.get('#Fields_2__Values').type(dbcountry);
            cy.get('#Fields_3__Values').clear();
            cy.get('#Fields_3__Values').type(dbsurvey);
            cy.get('.modal-footer > .btn-primary').click();
            cy.get('.toast-success',{timeout: 15000}).should('be.visible')
            cy.contains('.toast-success','Select field settings have been updated')
            cy.wait(2000);
    }});
  }
    //getting today's date and formating it
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    //We don't need to have these, but might be useful if using elsewhere?
    // if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;
    const daybatch_date = mm + '/' + dd + '/' + yyyy;
    //and onwards
    cy.get('.nav.active > :nth-child(2) > a').click();
    cy.get('[style="margin-top:20px;"] > .col-md-12 > #btnCreateDaybatch').click();
    cy.get('#InstrumentId').select('LMS2311_TS7');//Change this for the daybatch setup on a different package
    cy.get('#DaybatchDay_SelectedSurveyDay').select(daybatch_date);
    cy.get('.modal-footer > .btn-primary').click();
    cy.get('.modal-footer > .btn-default').click();
    cy.get('.toast-message').should('be.visible');
    cy.get('.toast-title',{timeout: 60000}).should('be.visible');
    cy.get('#MVCGrid_Loading_DaybatchGrid',{timeout: 90000}).should('not.be.visible');
    cy.wait(120000)
    cy.get('.nav.active > :nth-child(1) > a').click();
    cy.wait(1000);
    cy.get('.nav.active > :nth-child(2) > a').click();
    cy.wait(1000);
    cy.contains('#MVCGridTableHolder_DaybatchGrid > :nth-child(1) > :nth-child(1)','Showing 1 to ').should('be.visible');


  };

  function no_answer() {
    cy.contains('.text-container', 'No Answer').click();
    cy.contains('.text-container', 'No reply').click();
    func.save_cont();
  }

  function refusals() {
    var refusal_list = ['Interviewer', 'Survey Enquiry Line - Refusal', 'Survey Enquiry Line - Other']
    let answer = refusal_list[Math.floor(Math.random() * refusal_list.length)];
    cy.contains('.text-container', 'Refusals').click();
    cy.contains('.text-container', answer).click();
    func.save_cont();
    if (answer == 'Interviewer'){
      cy.contains('.text-container', 'Impossible to contact').click();
      func.save_cont();
      cy.wait(1000);
      func.save_cont();

    }
    if (answer == 'Survey Enquiry Line - Refusal'){
      cy.wait(1000);
      cy.get('[data-fieldname="CATINonResp.QSELRefusal.QNotes.MakeNote"][role="button"]').contains('No').click();
      func.save_cont();
      cy.wait(1000);
      cy.get('[data-fieldname="CATINonResp.QSELRefusal.PhoneChk"][role="button"]').contains('No').click();
      func.save_cont();
      cy.wait(1000);
      cy.contains('.text-container', 'Will not complete Questionnaire').click();
      func.save_cont();
      cy.wait(1000);
      cy.contains('.text-container', 'Not willing to take part').click();
      func.save_cont();
    }
    if (answer == 'Survey Enquiry Line - Other'){
      cy.wait(1000);
      cy.get('[data-fieldname="CATINonResp.QSELOther.QNotes.MakeNote"][role="button"]').contains('No').click();
      func.save_cont();
      cy.wait(1000);
      cy.get('[data-fieldname="CATINonResp.QSELOther.PhoneChk"][role="button"]').contains('No').click();
      func.save_cont();
      cy.wait(1000);
      cy.contains('.text-container', 'Cannot complete Questionnaire').click();
      func.save_cont();
      cy.wait(1000);
      cy.contains('.text-container', 'Letter returned by Royal Mail, no trace of address').click();
      func.save_cont();
      cy.wait(1000);
      func.save_cont();
    }

  }

  function init_daybatch(dbsurvey, dbcountry, environment) {

    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=TRUE&FILENAME=users-sel.csv').then((response) => {
            expect(response).property('status').to.equal(200);
            cy.log(response.body);
            username = func.extract_user(response.body);
            cy.log(username);
            const user = username[0].split(",");
            cy.log(username[0])

    cy.visit('https://' + environment + '/lms2311_ts7/?layoutset=CATI-Interviewer_Large'); //Change here for a change in package

    cy.contains('.login-description', 'Login Required');
    cy.get('.login-username > .ng-untouched').clear();
    cy.get('.login-username > .ng-untouched').type(user[0]);
    //cy.get('.login-password > .ng-touched').clear();
    cy.get('.login-password > .ng-untouched').type(user[1]);
    cy.get('.login-actions > input').click();

    cy.wait(1000);

    cy.get('body').then(($body) => {
        if ($body.text().includes('No suitable case found')) {
          cy.log('There are no cases, going to re-run the daybatch if that fails then LOOP!');
          daybatch(dbsurvey, dbcountry);
          cy.visit('https://' + environment + '/lms2311_ts7/?layoutset=CATI-Interviewer_Large');

          cy.contains('.login-description', 'Login Required');
          cy.get('.login-username > .ng-untouched').clear();
          cy.get('.login-username > .ng-untouched').type(user[0]);
          //cy.get('.login-password > .ng-touched').clear();
          cy.get('.login-password > .ng-untouched').type(user[1]);
          cy.get('.login-actions > input').click();
        }
        });
      });
  }
  export { daybatch, refusals, no_answer, init_daybatch };