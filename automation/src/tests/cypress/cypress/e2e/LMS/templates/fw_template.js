/*

This is called openfile but I reckon it is the whole framework
*/
var array
var guid
//var survey = "lms"
//var country = "ni"
const page_list = ""
import * as func from '../../../support/functions/functions';
import { framework } from './framework';
var path = window.location.pathname.split("%2F").pop()
var parts = path.split("_");
var new_file = path.replace(".js", ".tsv")
var survey = parts[1].toLowerCase()
var country = parts[2].toLowerCase().substring(0,2);

describe(parts[1] + ' Online Survey ' + parts[0] + ' - ' + parts[2] + ' - Framework Driven', function () {
    it(parts[0] + ' - ' +  parts[2] + ' - Framework Driven', function() {
      cy.log(country)
      cy.log(survey)
      cy.log(new_file)
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
        //Open the file of pages and objects


func.check_sts();
func.getuac(survey, country);
func.save_sts();

cy.get('[role="button"]').contains('Start Now').click();

framework("cypress/e2e/LMS/framework/tsv_files/" + new_file, country, survey);

    });


});