import * as func from '../../../support/functions/functions';
import * as daybatch from '../../../support/functions/daybatch';
import { framework } from '../framework/framework';
new Date();
var all_text = ""
var caseid = ""
var dbsurvey = ""
var dbcountry = ""
var environment = "lms-ts5.tiss.gcp.onsdigital.uk"
var scripts = "bp104_lmb_england_to,hh08_lms_wales_to,bp58_lmb_scotland_to,bp78_lms_england_to,bp99_lmb_wales_to,hh18_lms_scotland_to"
//var scripts = "hh18_lms_scotland_to"
//var
describe('CATI TS5_1', { retries: { runMode: 1 } }, function() {
	Cypress._.times(5, (k) =>{
		it('CATI TS5', function() {
			//Change the daybatch to match the survey

			//daybatch.daybatch(dbsurvey, dbcountry, environment);
			// Launch site and check for records
			daybatch.init_daybatch(dbsurvey, dbcountry, environment);

			cy.get('.text-container').contains('TLA:').invoke('text').then(($el) => {
				//all_text = $el.text();
				let tla = $el.match(/TLA:.(...)/)[1];
				let cc = $el.match(/CountryCode:.(.)/)[1];
				// let tla = "lmb";
				// let cc = "en"
				cy.log(tla);
				cy.log(cc);
				//cy.get("#s > .text-container").as('caseid')
					cy.get("#s > .text-container").invoke('text').then(($el) => {
						//all_text = $el.text();
						//const caseid = all_text.match(/Case:.(\d+)/)[1];
						const caseid = $el.match(/Case:.(\d+)/)[1];
						cy.log(caseid);

					cy.log("Case id outside is " + caseid);
					//convert cc to the value we want in the script name
					if (cc == "E"){
						cc = "en";
					}
					else if (cc == "W"){
						cc = "wa"
					}
					else if (cc == "S"){
						cc = "sc"
					}
					else if (cc == "N"){
						cc = "ni"
					}
					cy.log("Country Code is now " + cc)

					//get our list of scripts
					var script = scripts.split(",")
					//go through the scripts and find a match on country and survey
					for (var value in script) {
						// cy.log("script name is " + script[value])
						// cy.log("Is tla in the script name")
						// cy.log(script[value].indexOf(tla.toLowerCase()))
						// cy.log("Is cc in the script name")
						// cy.log(script[value].indexOf(cc.toLowerCase()))
						if (script[value].indexOf(tla.toLowerCase()) != -1 && script[value].indexOf(cc.toLowerCase()) != -1){
							cy.log("Run the test with " + tla + " - " + cc )
							var rel_path = tla.toUpperCase() + '/' + cc.toUpperCase()
							cy.log(rel_path)
							//do an sts here for started cases with a save
							cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=ts5_cati_started_cases.csv&LINE=' + caseid + ", " + tla + ", " + cc + '&ADDMODE=LAST&UNIQUE=FALSE').then((response) => {
								expect(response).property('status').to.equal(200);

							  });


							cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=ts5_cati_started_cases.csv').then((response) => {
							//cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
							    expect(response).property('status').to.equal(200)
							});

							//Run the framework test from the tsv file of the script we have determined is the correct one
							framework("cypress/e2e/LMS/Live/TO/" + rel_path + "/tsv_files/" + script[value] + '.tsv', cc, tla.toLowerCase(), "Yes");

							//do an sts here for completed cases - this will only write if the framework step has passed
							cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=ts5_cati_completed_cases.csv&LINE=' + caseid + ", " + tla + ", " + cc + '&ADDMODE=LAST&UNIQUE=FALSE').then((response) => {
								expect(response).property('status').to.equal(200);

			    			});


							cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=ts5_cati_completed_cases.csv').then((response) => {
							//cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
							    expect(response).property('status').to.equal(200)
             				});
						}
					}
				});
		    });
		//daybatch.refusals();
	    });
    });
//here


  });
