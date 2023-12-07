//This runs the test based on the survey  tht is launched in the GUI - pulls the TLA and CC from the screen...
import { framework } from '../../../LMS/framework/framework';
import * as func from '../../../../support/functions/functions';
import { ifElse } from 'ramda';

var long_path = window.location.pathname.split("%2F")
var rel_path = ""
for (let i = 1; i < long_path.length - 2; i++) {
  rel_path = rel_path + long_path[i] + "/";
}

// Cypress.env("preprod", true)
Cypress.env('ts5_land_url')

describe('Launch file for PreProd TO', function () {
    it('Launch file for PreProd TO', function() {

	  //This is a little different as we need to find which survey has launched in the GUI

      //var filename = daybatch.init_daybatch_pp();

cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=TRUE&FILENAME=users-pp.csv').then((response) => {
expect(response).property('status').to.equal(200);
cy.log(response.body);
let username = func.extract_user(response.body);
cy.log(username);
const user = username[0].split(",");
cy.log(username[0])


cy.visit(Cypress.env('preprod_to_url'));

cy.contains('.login-description', 'Login Required');
cy.get('.login-username > .ng-untouched').clear();
cy.get('.login-username > .ng-untouched').type(user[0]);
//cy.get('.login-password > .ng-touched').clear();
cy.get('.login-password > .ng-untouched').type(user[1]);
cy.get('.login-actions > input').click();

cy.wait(1000);

cy.get('body').then(($body) => {

	if ($body.text().includes('No suitable case found')) {
		cy.log('There are no cases, We can\'t control the daybatch so need to Exit!');
		return
	}
	else if ($body.text().includes('Cannot select case because no valid daybatch file was found for')) {
		cy.log('There are no daybatches run today, We can\'t control the daybatch so need to Exit!');
		return
	}
	});

cy.get('#za_3e > .text-container', { timeout: 20000 }).should('be.visible').then(($el) => {
  var extract = $el.text();
  var caseid = extract.substring(6, 12)
  var uac = extract.substring(22, 36)
  var tla = extract.substring(46, 49)
  var cc = extract.substring(66, 67)
  cy.log( "Case ID is " + caseid );
  cy.log( "UAC is " + uac );
  cy.log("TLA is " + tla + " The CC is " + cc)


	if (cc == "E"){
	  cc = "England"
	}
	if (cc == "W"){
	  cc = "Wales"
	}
	if (cc == "S"){
	  cc = "Scotland"
	}
	if (cc == "N"){
	  cc = "Ni"
	}

	cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=' + tla + '_' + cc + '_TO.csv').then((response) => {
	  expect(response).property('status').to.equal(200);
	  cy.log(response.body);
	  let filename = func.extract_scriptname(response.body)
	  if (filename == "LMB_Ni_TO.csv not loaded yet !") {
		cy.log("Looks Like we cannot use this scenario as there no tests")
		exit
	  }
	  //Saving the STS file - good housekeeping
	cy.request(Cypress.env('sts_url') + 'SAVE?FILENAME=' + tla + '_' + cc + '_TO.csv').then((response) => {
		expect(response).property('status').to.equal(200)
	  });
	  //We are creating some variables here related to country, part of the framework expacts it in different formats hence the chopping and changing here
	  var cc_file = cc.slice(0,2).toUpperCase()
	  cy.log("The cc_file is " + cc_file)
	  var cc_country = cc.slice(0,2).toLowerCase()
	  cy.log("The cc_country is " +cc_country)
	  if (cc_country == "wa"){
        cc_country = "wal"
		cy.log("The cc_country is " +cc_country)
      }
      if (cc_country == "sc"){
        cc_country = "sco"
		cy.log("The cc_country is " +cc_country)
      }
	  cy.log("This is the file name we need to run... " + filename).then(() =>{
		cy.log("Filename part is " + cc_file + " Country is " + cc_country + " Survey is " + tla.toLowerCase())
		framework("cypress/" + rel_path + "TO/" + tla + "/" + cc_file + "/tsv_files/" + filename + ".tsv", cc_country, tla.toLowerCase(), "Yes");

	  })
	});
  });
})


  })
})