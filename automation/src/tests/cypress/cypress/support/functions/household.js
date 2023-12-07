//import * as func from '../../../support/functions/functions';
import * as func from './functions';


function about_you(answer, page_found) {

    // var myString = "QIndiv[2].QAddHH.Person[2].FstNme"
    // var firstPos = myString.indexOf("QAddHH.Person[");//stringlength is 24
    // var secondPos = myString.indexOf("]",firstPos);
    // var person_index = myString.substring(firstPos + 14, secondPos);
    // cy.log(firstPos)
    // cy.log(secondPos)
    // cy.log(person_index)
        //This works for all
    let names = answer.split(';');

    //cy.log(names[3])

    if (names[0] != ""){

        cy.get('input[class*="StringTextBoxComponent"][data-fieldname="' + page_found + '"][aria-live="assertive"]').clear().type(names[0]);
        //cy.get('input[data-fieldname="' + page_found + '"][type="text"][role="textbox]').clear().type(names[0]);
    }

    if (names[1] != ""){
        var midname = page_found.replace("FstNme", "MidNme")
        cy.get('input[data-fieldname="' + midname + '"][aria-live="assertive"]').clear().type(names[1]);

    }

    if (names[2] != ""){

        var surname = page_found.replace("FstNme", "SurNme")
        cy.get('input[data-fieldname="' + surname + '"][aria-live="assertive"]').clear().type(names[2]);

        // cy.get('input[data-fieldname="QHousehold.QHHold.Person[' + person + '].SurNme"][aria-live="assertive"]').clear().type(names[2]);

    }

    // if (names[3] != ""){

    //     var sex = page_found.replace("FstNme", "Sex")
    //     cy.get('a[data-fieldname="' + sex + '"][role="button"]').find('div[class="text-container no-auto word-break"]')
    //     .contains(names[3])
    //     .click();


    // }
    func.save_cont();
  }

  function ineligble(answer, person){

    var input_field = answer.split(";");

    cy.get('.text-container').contains(input_field[0]).click();

    if (input_field[0] != "Other") {
        func.save_cont();
    }

   }

   function occupy(answer){

    cy.get('.text-container').contains(answer).click();

    if (answer != "Other") {
        func.save_cont();
    }

   }

  export { about_you, ineligble, occupy }
