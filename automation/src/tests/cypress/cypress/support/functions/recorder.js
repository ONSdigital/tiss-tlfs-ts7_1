
import * as func from './functions';

var array
var guid
var survey = "lms"
var country = "en"

/*---------------------------------------------------------------------
Script: P38 - LMS, EN, 2PHH, >16
Open Defects: LMS-908 (apparently a defect PTHRS2B)
Closed Defects: LMS-891
Author: RH
Last Update: 16/11/2021 RH, v27
Notes: TOTAC2 is now missing if hours = 0 (v27), LMS-908 remains
----------------------------------------------------------------------*/

describe('LMS Online P38', function () {
  it('2PHH EN LMS', function() {
    //initialise sts
    func.check_sts();//not an init here yet...
    func.getuac(survey, country);
    func.save_sts();

    cy.get('[role="button"]').contains('Save and continue').click();

    cy.contains('.text-container', "Please enter your details");

    cy.get('.select-text').click();
    cy.get('[role="option"][class="option-item"]').each(($ele) => {
      if ($ele.text() == "Cymraeg (CY)") {
          cy.wrap($ele).click();
      }

    });  
    //cy.get('[role="option"]').contains('CY').click();
  });
});

//-------------------------------------------------------------------------------------------------------------------
