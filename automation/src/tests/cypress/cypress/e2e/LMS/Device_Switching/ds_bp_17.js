var array
var guid
var uac = ""
import * as func from '../../../support/functions/functions';
import { bp17_online } from '../../../support/functions/bp17_online'

var survey = "lms"
var country = "ni"

/*----------------------------------------------------------------------------------------------------------------
Script: HH1
Open Defects:
Closed Defects: LMS-891
Author: RH
Last Update: 15/11/2021 RH, v27
----------------------------------------------------------------------------------------------------------------*/

describe('LMB Online P17 -  Device Switching', function () {
  it('BP17 Device Switching Start', function() {
    func.mob_sizer();
    //initialise sts
    func.check_sts();

    cy.visit('https://lms-sandbox.tiss.gcp.onsdigital.uk/lmslogin2211_ts5/');
    cy.contains('.text-container', 'Welcome to the Office for National Statistics');

    //GET GUID
    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=ts5_sand_' + survey + '_' + country + '_uacs.csv').then((response) => {
      expect(response).property('status').to.equal(200);
      cy.log(response.body);
      guid = func.extract_guid(response.body);
      uac = guid[0] + "," + guid[1] + "," + guid[2]
      cy.log(guid);

    //Type GUID
      cy.get('[data-fieldname="UAC1"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC1"][role="textbox"]').type(guid[0]);
      cy.get('[data-fieldname="UAC1"][role="textbox"]').should('have.value', guid[0]);
      cy.get('[data-fieldname="UAC2"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC2"][role="textbox"]').type(guid[1]);
      cy.get('[data-fieldname="UAC2"][role="textbox"]').should('have.value', guid[1]);
      cy.get('[data-fieldname="UAC3"][role="textbox"]').clear();
      cy.get('[data-fieldname="UAC3"][role="textbox"]').type(guid[2]);
      cy.get('[data-fieldname="UAC3"][role="textbox"]').should('have.value', guid[2]);


    func.save_sts();

    cy.get('[role="button"]').contains('Save and continue').click();

    cy.task('log', 'HH1: Starting 1st user...');

    //set up global api listener
    cy.intercept('POST', '**/api/application/*').as('saveCont');

    //this calls the HH1 script which is a function, the first variable is type of viewport and the second defines if it should be a full script
    bp17_online("Screen", "No", "Start");

    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=dev_switch_bp17_ts5_sand.csv&LINE=' + uac +'&ADDMODE=LAST&UNIQUE=TRUE').then((response) => {
      expect(response).property('status').to.equal(200);
      cy.log("Written " + uac + " to STS")
    });


    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=dev_switch_bp17_ts5_sand.csv').then((response) => {
    //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200)
    cy.log("Saved ")
  });
});

});
it('BP 17 Device Switching Finish', function() {
  //initialise sts
  func.check_sts();

  cy.visit('https://lms-sandbox.tiss.gcp.onsdigital.uk/lmslogin2211_ts5/');
  cy.contains('.text-container', 'Welcome to the Office for National Statistics');

  //GET GUID
  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=dev_switch_bp17_ts5_sand.csv').then((response) => {
    expect(response).property('status').to.equal(200);
    cy.log(response.body);
    guid = func.extract_guid(response.body);
    cy.log(guid);

  //Type GUID
    cy.get('[data-fieldname="UAC1"][role="textbox"]').clear();
    cy.get('[data-fieldname="UAC1"][role="textbox"]').type(guid[0]);
    cy.get('[data-fieldname="UAC1"][role="textbox"]').should('have.value', guid[0]);
    cy.get('[data-fieldname="UAC2"][role="textbox"]').clear();
    cy.get('[data-fieldname="UAC2"][role="textbox"]').type(guid[1]);
    cy.get('[data-fieldname="UAC2"][role="textbox"]').should('have.value', guid[1]);
    cy.get('[data-fieldname="UAC3"][role="textbox"]').clear();
    cy.get('[data-fieldname="UAC3"][role="textbox"]').type(guid[2]);
    cy.get('[data-fieldname="UAC3"][role="textbox"]').should('have.value', guid[2]);
    func.save_cont();
  });
//    cy.task('log', 'HH1: Starting 1st user...');

  //set up global api listener
  cy.intercept('POST', '**/api/application/*').as('saveCont');

  cy.contains('.text-container', "The questions should not take very long but if you need to take a break, you can return at a later time using the link and unique code in your letter.");
  cy.get('.text-container').contains("Started").click();


  bp17_online("Mobile", "No", "Finish");

});

});


