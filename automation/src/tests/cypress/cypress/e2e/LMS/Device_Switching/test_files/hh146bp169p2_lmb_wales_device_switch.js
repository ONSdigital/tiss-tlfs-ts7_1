var array
var guid
var uac = ""
var rel_path = ''
import * as func from '../../../../support/functions/functions';
// import { bp12_online } from '../../../../support/functions/bp12_online'
import { framework } from '../../../LMS/framework/framework';
const page_list = ""

var path = window.location.pathname.split("%2F").pop()
var parts = path.split("_");
var start_file = path.replace("device_switch.js", "start.tsv")
var sts_temp_file = path.replace("_device_switch.js", "_sts.csv")
var finish_file = path.replace("device_switch.js", "finish.tsv")
var survey = parts[1].toLowerCase()
var mobile = false;
var country = parts[2].toLowerCase().substring(0,2);
var long_path = window.location.pathname.split("%2F")
for (let i = 1; i < long_path.length - 2; i++) {
  rel_path = rel_path + long_path[i] + "/";

// randomly select whether to start as mobile or desktop

}

var random_boolean = Math.random() < 0.5;



describe('Device Switching', function () {
  it('Switching Start', function() {

    if (country == "wa"){
      country = "wal"
    }
    if (country == "sc"){
      country = "sco"
    }
    {
          retries: {
            runMode: 0
          }
    }
    var sts_filename = Cypress.env('survey_version') + '_' + Cypress.env('survey_environment') + '_' + survey + '_' + country + '_uacs.csv'


    //initialise sts
    cy.log("sts file name is " + sts_filename)
    cy.log("Start file is " + start_file)
    func.check_sts();
    if (random_boolean == true){
       func.mob_sizer();
       mobile = true;
    }
    else {
      mobile = false
    }
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
      cy.request(Cypress.env('sts_url') + 'ADD?FILENAME=' + sts_temp_file + '&LINE=' + uac +'&ADDMODE=FIRST&UNIQUE=TRUE').then((response) => {
        expect(response).property('status').to.equal(200);


      });

      // func.save_single_sts(dev_switch_filename)

      framework("cypress/" + rel_path + "tsv_files/" + start_file, country, survey, mobile, "No", "");

    });
  });//End of first part of test

  it('Device Switching Finish', function() {
    //initialise sts
    //func.check_sts();
    if (random_boolean == false){
      func.mob_sizer();
      mobile = true;
   }
   else {
     mobile = false
   }

    cy.visit(Cypress.env('url'));
    cy.contains('.text-container', 'Welcome to the Office for National Statistics');

    //GET GUID
    cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=' + sts_temp_file).then((response) => {
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
      cy.wait(8000)
    });
    // Started is not always the entry point, and for the vast majority of the remaining cases it just resume the survey
    // where it left off, which would be a question.
    cy.get("body").then($body => {
      if ($body.text().includes('Started')) {
        cy.get('.text-container').contains("Started").click();
      }
  })


    framework("cypress/" + rel_path + "tsv_files/" + finish_file, country, survey, mobile, "No", "");
  //   bp12_online("Mobile", "No", "Finish");



  });

});
