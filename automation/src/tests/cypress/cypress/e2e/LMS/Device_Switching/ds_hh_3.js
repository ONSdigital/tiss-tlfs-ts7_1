var array
var guid
var survey = "lmb"
var country = "ni"
var uac = ""
import * as func from '../../../support/functions/functions';
import { hh3_online } from '../../../support/functions/hh3_online'

/*----------------------------------------------------------------------------------------------------------------
Script: HH1
Open Defects:
Closed Defects: LMS-891
Author: RH
Last Update: 15/11/2021 RH, v27
----------------------------------------------------------------------------------------------------------------*/

describe('HH3 Device Switching', function () {
  it('HH3 Device Switching Start', function() {
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

    cy.task('log', 'HH3 Device Switch: Starting 1st user...');
    cy.log(uac)

    //this calls the HH1 script which is a function, the first variable is type of viewport and the second defines if it should be a full script
    hh3_online("Mobile", "No", "Start")

    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=dev_switch_hh3_ts5_sand.csv&LINE=' + uac +'&ADDMODE=LAST&UNIQUE=TRUE').then((response) => {
      expect(response).property('status').to.equal(200);

    });


    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=dev_switch_hh3_ts5_sand.csv').then((response) => {
    //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200)

  });
});

});

it('Household 3 (NI POSTCODE)', function() {
  //initialise sts
  func.check_sts();

  cy.visit('https://lms-sandbox.tiss.gcp.onsdigital.uk/lmslogin2211_ts5/');
  cy.contains('.text-container', 'Welcome to the Office for National Statistics');

  //GET GUID
  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=dev_switch_hh3_ts5_sand.csv').then((response) => {
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
  func.save_sts();

  //set up global api listener
  cy.intercept('POST', '**/api/application/*').as('saveCont');

  cy.contains('.text-container', "Please click on the button below to answer some more questions. ");
  cy.get('.text-container').contains("Started").click();


  cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');

  hh3_online("Screen", "No", "Finish");

});

  });



