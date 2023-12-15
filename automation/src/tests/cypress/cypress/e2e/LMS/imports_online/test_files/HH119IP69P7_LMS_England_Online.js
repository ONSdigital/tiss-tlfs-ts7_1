//This runs the test based on the filename of this file, and picks up the same named tsv file

var array
var guid

const page_list = ""
import * as func from '../../../../support/functions/functions';
import { framework } from '../../framework/framework';
var path = window.location.pathname.split("%2F").pop()
var parts = path.split("_");
var new_file = path.replace(".js", ".tsv")
var survey = parts[1].toLowerCase()
var country = parts[2].toLowerCase().substring(0,2);
var long_path = window.location.pathname.split("%2F")
//Create the relative path that is needed for calling the tsv file in the framework
var rel_path = ""
for (let i = 1; i < long_path.length - 2; i++) {
  rel_path = rel_path + long_path[i] + "/";
}

describe(parts[1] + ' Online Survey ' + parts[0] + ' - ' + parts[2] + ' - Framework Driven', {"retries": 0}, function () {
    it(parts[0] + ' - ' +  parts[2] + ' - Framework Driven', function() {

      cy.log(rel_path)

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

func.check_sts();
func.getuac(survey, country, Cypress.env('survey_version') , Cypress.env('survey_environment'));
func.save_sts();

cy.get('[role="button"]').contains('Start Now').click();

framework("cypress/" + rel_path + "tsv_files/" + new_file, country, survey, Cypress.env('mobile'));

    });


});