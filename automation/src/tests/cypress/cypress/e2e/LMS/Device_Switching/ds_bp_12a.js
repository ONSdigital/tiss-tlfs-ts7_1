
var array
var guid
var uac = ""
import * as func from '../../../support/functions/functions';
// import { bp12_online } from '../../../../support/functions/bp12_online'
import { framework } from '../framework/framework';
var survey = "lmb"
var country = "en"
var long_path = window.location.pathname.split("%2F")
//Create the relative path that is needed for calling the tsv file in the framework
var rel_path = ""
for (let i = 1; i < long_path.length - 2; i++) {
  rel_path = rel_path + long_path[i] + "/";

}
var sts_filename = Cypress.env('survey_version') + '_' + Cypress.env('survey_environment') + '_' + survey + '_' + country + '_uacs.csv'
var dev_switch_filename = Cypress.env('survey_version') + '_' + Cypress.env('survey_environment') + '_bp12_dev_switch.csv'
/*----------------------------------------------------------------------------------------------------------------
Script: HH1
Open Defects:
Closed Defects: LMS-891
Author: RH
Last Update: 15/11/2021 RH, v27
----------------------------------------------------------------------------------------------------------------*/

describe('LMB Online P12 -  Device Switching', function () {
  it('BP12 Device Switching Start', function() {
    //initialise sts
    cy.log("sts file name is " + sts_filename)
    func.check_sts();
    func.mob_sizer();
    // cy.log("URL to use is: " + Cypress.env('sandbox_url') )
    cy.visit(Cypress.env('url'));
    cy.contains('.text-container', 'Welcome to the Office for National Statistics');

    //GET GUID
    cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=' + sts_filename).then((response) => {
                // Cypress.env('survey_version') + '_' + Cypress.env('survey_environment') + '_' + survey + '_' + country + '_uacs.csv'
      expect(response).property('status').to.equal(200);
      cy.log(response.body);
      guid = func.extract_guid(response.body);
      uac = guid[0] + "," + guid[1] + "," + guid[2]
      cy.log(guid);

      // saves the current sts table before
      func.save_single_sts(sts_filename);

    //Type GUID
      cy.get('[data-fieldname="UAC1"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC1"][role="textbox"]').type(guid[0]);

      cy.get('[data-fieldname="UAC2"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC2"][role="textbox"]').type(guid[1]);

      cy.get('[data-fieldname="UAC3"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC3"][role="textbox"]').type(guid[2]);


      cy.get('[role="button"]').contains('Start Now').click();

      // cy.task('log', 'Starting 1st user...');
      // cy.log("UAC IS " + uac)
      cy.request(Cypress.env('sts_url') + 'ADD?FILENAME=' + dev_switch_filename + '&LINE=' + uac +'&ADDMODE=FIRST&UNIQUE=TRUE').then((response) => {
        expect(response).property('status').to.equal(200);


      });

      func.save_single_sts(dev_switch_filename)

      framework("cypress/" + rel_path + "tsv_files/BP12_LMB_England_Start_a.tsv", "en", "lmb");
      // cy.wait(120000)
    });
  });//End of first part of test

  it('BP12 Device Switching Finish', function() {
    //initialise sts
    //func.check_sts();
    func.mob_sizer();

    cy.visit(Cypress.env('url'));
    cy.contains('.text-container', 'Welcome to the Office for National Statistics');

    //GET GUID
    cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=' + dev_switch_filename).then((response) => {
      expect(response).property('status').to.equal(200);
      cy.log(response.body);
      guid = func.extract_guid(response.body);
      cy.log(guid);



    //Type GUID
      cy.get('[data-fieldname="UAC1"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC1"][role="textbox"]').type(guid[0]);
      // cy.get('[data-fieldname="UAC1"][role="textbox"]').should('have.value', guid[0]);
      cy.get('[data-fieldname="UAC2"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC2"][role="textbox"]').type(guid[1]);
      // cy.get('[data-fieldname="UAC2"][role="textbox"]').should('have.value', guid[1]);
      cy.get('[data-fieldname="UAC3"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC3"][role="textbox"]').type(guid[2]);
      // cy.get('[data-fieldname="UAC3"][role="textbox"]').should('have.value', guid[2]);

      cy.get('[role="button"]').contains('Start Now').click();

    });

    func.save_single_sts(dev_switch_filename)

    // cy.get('.text-container').contains("Started").click();

    framework("cypress/" + rel_path + "tsv_files/BP12_LMB_England_Finish_a.tsv", "en", "lmb", "No", "", true);
  //   bp12_online("Mobile", "No", "Finish");



  });

});
