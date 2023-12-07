import * as func from '../../../support/functions/functions';
import { ip13_online } from '../../../support/functions/ip13_online';
import * as influx from '../../../support/functions/write_influx';
var array
var guid
var survey = "lms"
var country = "en"
var uac = ""

/*---------------------------------------------------------------------
Script: P13 - LMS, EN, 1PHH, >16, Paid Job FT, 2nd Job PT
Open Defects: LMS-927
Closed Defects:
Author: RH
Last Update: 15/11/2021 RH, v27
Notes: DEFECT LMS-927 persists in v27.
----------------------------------------------------------------------*/

describe('LMS Online P13 Device Switching', function () {

  it('P13 Device Switching Start', function() {
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

    ip13_online("Mobile", "No", "Start");

    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=dev_switch_ip13_ts5_sand.csv&LINE=' + uac +'&ADDMODE=LAST&UNIQUE=TRUE').then((response) => {
      expect(response).property('status').to.equal(200);

    });


    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=dev_switch_ip13_ts5_sand.csv').then((response) => {
    //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200)

  });

  });
});
it('P13 Device Switching Finish', function() {
  //initialise sts
  func.check_sts();

  cy.visit('https://lms-sandbox.tiss.gcp.onsdigital.uk/lmslogin2211_ts5/');
  cy.contains('.text-container', 'Welcome to the Office for National Statistics');

  //GET GUID
  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=dev_switch_ip13_ts5_sand.csv').then((response) => {
    expect(response).property('status').to.equal(200);
    cy.log(response.body);
    guid = func.extract_guid(response.body);
    cy.log(guid);
    func.save_sts();

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


  });
//    cy.task('log', 'HH1: Starting 1st user...');

  influx.wait_start_timer(1000);

  func.save_cont();
  //set up global api listener
  cy.intercept('POST', '**/api/application/*').as('saveCont');

  cy.contains('.text-container', "Please click on the button below to answer some more questions. ").then(() => {

    influx.stop_timer("IP13_GetUnfinishedSurvey_Screen");
   });

  influx.wait_start_timer(1000);
  cy.get('.text-container').contains("Started").click();


  cy.contains('.text-container', 'Would it be possible for you to be able to work from home without access to broadband internet').then(() => {

    influx.stop_timer("IP13_ResumeIndividualSection_Screen");
   });

  ip13_online("Screen", "No", "Finish");

});
});
//-------------------------------------------------------------------------------------------------------------------
