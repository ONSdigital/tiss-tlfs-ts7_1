//This runs the test based on the filename of this file, and picks up the same named tsv file

var array
var guid

const page_list = ""
import * as func from '../../../../support/functions/functions';
import { framework } from '../../framework/framework';
import * as daybatch from '../../../../support/functions/daybatch';
// var environment = "lms-ts7.tiss.gcp.onsdigital.uk"
var path = window.location.pathname.split("%2F").pop()
var parts = path.split("_");
var new_file = path.replace(".js", ".tsv")
var dbsurvey = parts[1].toUpperCase()
var dbcountry = parts[2].toUpperCase().substring(0,1);
var survey = parts[1].toLowerCase()
var country = parts[2].toLowerCase().substring(0,2);
var long_path = window.location.pathname.split("%2F")
//Create the relative path that is needed for calling the tsv file in the framework
var rel_path = ""
for (let i = 1; i < long_path.length - 2; i++) {
  rel_path = rel_path + long_path[i] + "/";
}

describe(parts[1] + ' Telephony Survey ' + parts[0] + ' - ' + parts[2] + ' - Framework Driven', {"retries": 0}, function () {
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

  daybatch.init_daybatch(dbsurvey, dbcountry, Cypress.env('to_url'));
  //If there are records then we will carry on... else it will error... needs better error handling here

  framework("cypress/" + rel_path + "tsv_files/" + new_file, country, survey, false, "Yes");


    });


});