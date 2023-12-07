//This runs the test based on the survey  tht is launched in the GUI - pulls the TLA and CC from the screen...
import { framework } from '../../framework/framework';
import * as func from '../../../../support/functions/functions';

new Date();
var long_path = window.location.pathname.split("%2F")
var rel_path = ""
for (let i = 1; i < long_path.length - 2; i++) {
  rel_path = rel_path + long_path[i] + "/";
}

// Cypress.env("preprod", true)
Cypress.env('ts5_land_url')

describe('Launch file for PreProd TO', function () {
	Cypress._.times(1, (k) =>{
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


//Log in to the CATI Dashboard
cy.visit(Cypress.env('preprod_dashboard'));

cy.contains('Login');
cy.get('#Username').clear();
cy.get('#Username').type(user[0]);
cy.get('#Password').clear();
cy.get('#Password').type(user[1]);
cy.get('.btn').click();

cy.wait(1000);
cy.contains('Surveys');
//select Case Info
cy.get('.nav.active > :nth-child(3) > a').click();
cy.contains('Case Info');
cy.get('.filter-state').click();
cy.contains('Instrument');
//Now select the OSH survey tick box
cy.contains('LMS2303_OSH').click();
//Put in the case number obtained from the STS
cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=TRUE&FILENAME=OSH_CaseIDs.csv').then((response) => {
	expect(response).property('status').to.equal(200);
	cy.log(response.body);
	let caseid = func.extract_scriptname(response.body);
	cy.log(caseid);
	cy.get(':nth-child(2) > .form-control').clear();
	cy.get(':nth-child(2) > .form-control').type(caseid[0]);
	cy.wait(1000)
	cy.get('.filter-button').click();
	cy.wait(5000)
	cy.get('body').then(($body) => {
		if ($body.text().includes('Sorry, no results were found.')){
			cy.log('There case ' + caseid + ' appears not to be there .. check and rerun')
			return
		}
		else {
			cy.get(':nth-child(19) > a').invoke('attr', 'data-url').then(href => {
			cy.log(href)
			cy.wait(2000)
			cy.visit('https://cati.preprod-blaise.gcp.onsdigital.uk/' + href)
	});
		}
	})


//need a wit here so the correct page loads -  otherwise we get the previous page and security code
cy.wait(5000)
cy.get('body').then(($body) => {
	cy.log('Checking the body...')
	cy.log($body.text())

	if ($body.text().includes('No suitable case found')) {
		cy.log('There are no cases, We can\'t control the daybatch so need to Exit!');
		return
	}
	else if ($body.text().includes('Cannot select case because no valid daybatch file was found for')) {
		cy.log('There are no daybatches run today, We can\'t control the daybatch so need to Exit!');
		return
	}
	else if ($body.text().includes('I would now like to ask you some questions of each individual in the household.')) {
		throw new Error('Looks like case ' + caseid + ' has been completed or partially completed - need to exit');
	}
	});
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

	  //We are now going to write information into a file on the STS so we have it for future reference
	  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=pp_osh_script_runs.csv&LINE=' + caseid + ", " + uac + ", " + filename + ", " + new  Date().toISOString() + '&ADDMODE=LAST&UNIQUE=FALSE').then((response) => {
      expect(response).property('status').to.equal(200);

	});
		cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=pp_osh_script_runs.csv').then((response) => {
			//cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
			expect(response).property('status').to.equal(200)
		});

	  cy.log("This is the file name we need to run... " + filename).then(() =>{
		cy.log("Filename part is " + cc_file + " Country is " + cc_country + " Survey is " + tla.toLowerCase())
		framework("cypress/" + rel_path + "TO/" + tla + "/" + cc_file + "/tsv_files/" + filename + ".tsv", cc_country, tla.toLowerCase(), "Yes");

	  })
	});
  });
})


  })
});
})