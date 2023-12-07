
import * as func from '../functions/functions';


function wkpl99(page, answer) {


    if (answer != "") {

        cy.get('input[data-fieldname="' + page + '"][type="text"][aria-live="assertive"]').clear().type(answer);//returns <tr><td>
        cy.wait(3000);
        cy.get('td').contains(answer).should('be.visible');
            if (answer == "London"){
                cy.get('td').contains('Greater London').click();
            }
            else {
                cy.get('td').contains(answer).click();//table data
            }
        cy.wait(3000);
    }

    func.save_cont();
}
// function dob(answer, person) {

// }

// function work_travel_time(answer, person) {
//     if (answer != "") {

//         cy.get('input[data-fieldname="QIndiv[' + person + '].QTravToWork.TrvTmePers"][role="textbox"][aria-live="assertive"]').clear().type(answer);
//     }

//     func.save_cont();


// }

function addr_hist(answer = "", person, people,page_list, mobile){
    var input_field = answer.split((";"))
    for (var AddrHist_index in people) {

        if (people[AddrHist_index][0] == person) {
            //verify the two fields exist and get the data field names returned
            var page1 = func.verify_page(page_list, "AddrHist_Date", person, parseInt(people[AddrHist_index][1]), mobile);
            var page2 = func.verify_page(page_list, "AddrHist_Year" , person, parseInt(people[AddrHist_index][1]), mobile);
            var offsets_month = "";
            var offsets_year = "";
            // checking for undefined values
            for (let i = 0; i < 2; i++) {

                input_field[i] = func.change_empty_answer(input_field[i]);

            }
            //checking for offsets e.g. -12m
            if (answer.search("\\-") >=0 || answer.search("\\+") >=0){
                offsets_month = func.offset_date(answer, "MM");
                func.input_value(offsets_month, page1,"No")
                offsets_year = func.offset_date(answer, "YYYY");
                func.input_value(offsets_year,page2,"Yes")
            }
            //if the answer is not empty and could be 12;2021
            else {
                if  (input_field[0] != "") {
                    func.input_value(input_field[0], page1,"No")
                    func.input_value(input_field[1], page2,"Yes")

                }
            }

            return AddrHist_index

        }
        }
    }

    function nationality(page_list, page_ident, page_answer = "", person, my_row,  telephone, save = "Yes", mobile, max_people) {

        func.verify_page(page_list, page_ident, person, max_people, mobile);
        cy.wait(1000);
        var tec_answers = page_answer.split(";");
        for (var tec_value in tec_answers) {
            if (telephone =="Yes") {
                if ( tec_answers[tec_value] == "Irish" ){
                    //cy.log("BTEC Route")
                    cy.get('.text-container').each(ele => {
                        if (ele.text() == 'Irish') {
                            ele.click()
                        }
                    })

                }
            else {
                func.default_behaviour(page_list, page_ident, tec_answers[tec_value], person, my_row, "Yes", telephone, "No", "Yes")
                }

            }
        }
        func.save_cont();
    }


function month_trigger(answer, person, fieldname1, fieldname2, offsets_month, offsets_year) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();


    if (answer == "Greater than 4 months"){
           // cy.log("Greater than 4 Months");
            cy.get('input[data-fieldname="' + fieldname1 + '"][role="textbox"][aria-live="assertive"]').clear().type(month);
            cy.get('input[data-fieldname="' + fieldname2 + '"][role="textbox"][aria-live="assertive"]').clear().type(year -2);
        }
    else if (answer == "Less than 4 months"){
           // cy.log("Less than 4 Months");
            if (month > 11) {
            month = month - 3
            year += 1}
            cy.get('input[data-fieldname="' + fieldname1 + '"][role="textbox"][aria-live="assertive"]').clear().type(month+9);
            cy.get('input[data-fieldname="' + fieldname2 + '"][role="textbox"][aria-live="assertive"]').clear().type(year -1);

        }
    else {

        var monthy = answer.split((";"))
        if (monthy[0] != "") {

            cy.get('input[data-fieldname="' + fieldname1 + '"][role="textbox"][aria-live="assertive"]').clear().type(monthy[0]);
        }

        if (monthy[1] != "") {
            cy.get('input[data-fieldname="' + fieldname2 + '"][role="textbox"][aria-live="assertive"]').clear().type(monthy[1]);
        }
    }


    func.save_cont();
}

function btec_5_type(page_list, page_ident, page_answer = "", person, my_row, checkbox = "No", telephone, save = "No"){

    func.default_behaviour(page_list, page_ident, page_answer, person, my_row, "Yes", telephone, "No", "Yes" );

}
function btec_type(page_list, page_ident, page_answer = "", person, my_row, checkbox = "No", telephone, save = "Yes", max_people, mobile) {

    func.verify_page(page_list, page_ident, person, max_people, mobile);
    cy.wait(1000);
    var answer_range = ["BTEC"]
    var tec_answers = page_answer.split(";");
    for (var tec_value in tec_answers) {
        if (telephone =="Yes") {
            if ( tec_answers[tec_value] == "BTEC" || tec_answers[tec_value] == "BTEC?" ){
                //cy.log("BTEC Route")
                cy.get('.text-container').each(ele => {
                    if (ele.text() == 'BTEC?') {
                       ele.click()
                    }
                })

            }
            else if ( tec_answers[tec_value] == "LQL" || tec_answers[tec_value] == "LQL?" ){
                // cy.log("BTEC Route")
                cy.get('.text-container').each(ele => {
                    if (ele.text() == 'LQL?') {
                       ele.click()
                    }
                })

            }
            else if ( tec_answers[tec_value] == "TEC" || tec_answers[tec_value] == "TEC?" ){
                // cy.log("BTEC Route")
                cy.get('.text-container').each(ele => {
                    if (ele.text() == 'TEC?') {
                       ele.click()
                    }
                })
            }
            else if ( tec_answers[tec_value] == "BEC" || tec_answers[tec_value] == "BEC?" ){
                // cy.log("BTEC Route")
                cy.get('.text-container').each(ele => {
                    if (ele.text() == 'BEC?') {
                       ele.click()
                    }
                })
            }
            else if ( tec_answers[tec_value] == "Diplomas" || tec_answers[tec_value] == "Diplomas?" ){
                // cy.log("BTEC Route")
                cy.get('.text-container').each(ele => {
                    if (ele.text() == 'Diplomas?') {
                       ele.click()
                    }
                })
            }
            else {
                //Have to re-verify the page as default behaviour has no means of accepting the datafield name
                func.default_behaviour(page_list, page_ident, tec_answers[tec_value], person, my_row, "Yes", telephone, "No", "Yes")

            }
        }
        else {// Not Telephone
        if ( tec_answers[tec_value] == "BTEC" ){
            // cy.log("BTEC Route")
            cy.get('.text-container').each(ele => {
                if (ele.text() == 'BTEC') {
                   ele.click()
                }
            })

        }
        else if ( tec_answers[tec_value] == "TEC" ){

            cy.get('.text-container').each(ele => {
                if (ele.text() == 'TEC') {
                   ele.click()
                }
            })
        }
        else if ( tec_answers[tec_value] == "BEC" ){

            cy.get('.text-container').each(ele => {
                if (ele.text() == 'BEC') {
                   ele.click()
                }
            })

        }
        else if ( tec_answers[tec_value] == "Diplomas" ){

            cy.get('.text-container').each(ele => {
                if (ele.text() == 'Diplomas') {
                   ele.click()
                }
            })
        }
        else {
            func.default_behaviour(page_list, page_ident, tec_answers[tec_value], person, my_row, "Yes", telephone, "No", "Yes")
        }
    }
}
    func.save_cont();




}

function date_of_birth(answer, person) {

    var dob = answer.split((";"))

    for (let i = 0; i < 3; i++) {
        dob[i] = func.change_empty_answer(dob[i]);
    }

    if (dob[0] != "") {

        cy.get('input[data-fieldname="QHousehold.QHHold.Person[' + person + '].Day"][role="textbox"][aria-live="assertive"]').clear().type(dob[0]);
    }

    if (dob[1] != "") {
        cy.get('input[data-fieldname="QHousehold.QHHold.Person[' + person + '].Month"][role="textbox"][aria-live="assertive"]').clear().type(dob[1]);
    }

    if (dob[2] != "") {

        cy.get('input[data-fieldname="QHousehold.QHHold.Person[' + person + '].Year"][role="textbox"][aria-live="assertive"]').clear().type(dob[2]);
    }
    func.save_cont();
}

function add_extra_address(answer, person, add_hist){

    //Nessa;Shanessa;Jenkins;Female;02;02;1970
    var add_field = answer.split(";")
    var add_hist = add_hist;

    if (add_field[0] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddrHist.QAddress[' + add_hist + '].AddrNum"][role="textbox"][aria-live="assertive"]').clear().type(add_field[0]);
    }
    if (add_field[1] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddrHist.QAddress[' + add_hist + '].AddrStreet"][role="textbox"][aria-live="assertive"]').clear().type(add_field[1]);
    }
    if (add_field[2] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddrHist.QAddress[' + add_hist + '].AddrTown"][role="textbox"][aria-live="assertive"]').clear().type(add_field[2]);
    }
    if (add_field[3] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddrHist.QAddress[' + add_hist + '].AddrCounty"][role="textbox"][aria-live="assertive"]').clear().type(add_field[3]);
    }
    if (add_field[4] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddrHist.QAddress[' + add_hist + '].AddrPostcode"][role="textbox"][aria-live="assertive"]').clear().type(add_field[4]);
    }
    if (add_field[5] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddrHist.QAddress[' + add_hist + '].Country"][role="textbox"][aria-live="assertive"]').clear().type(add_field[5]);
    }
    cy.wait(3000);
    func.save_cont();
}

function individual_intro(person, telephone){

    const my_index = parseInt(person) -1;
    // cy.log("first time value for my_Index");
    // cy.log(my_index)
    if (telephone == "No"){

        // cy.get('a[role="button"][id^=ta_]').within(() => {
            cy.get('a[role="button"][id^=ta_]').find('div[class="text-container no-auto word-break"]').eq(my_index).click();//have to find by index
            // })
        }
    else {
        // cy.get('a[role="button"][id^=za_]').within(() => {
        //     cy.get('div[class="text-container no-auto word-break"]').eq(my_index + my_index).click();//have to find by index
        //         })
        cy.get('a[role="button"][id^=za_]').find('div[class="text-container no-auto word-break"]').eq(my_index + my_index).click();//have to find by index
        }



}


function add_absent_household_person(answer, person, person_index){

    //Nessa;Shanessa;Jenkins;Female;02;02;1970
    var input_field = answer.split(";")

    //removes any values that might be undefined due to user input
    for (let i = 0; i < 8; i++) {
        input_field[i] = func.change_empty_answer(input_field[i]);

    }

    if (input_field[0] != ""){
      //  cy.log(person_index);
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddHH.Person[' + person_index + '].FstNme"][role="textbox"][aria-live="assertive"]').clear().type(input_field[0]);
    }

    if (input_field[1] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddHH.Person[' + person_index + '].MidNme"][role="textbox"][aria-live="assertive"]').clear().type(input_field[1]);
    }

    if (input_field[2] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddHH.Person[' + person_index + '].SurNme"][role="textbox"][aria-live="assertive"]').clear().type(input_field[2]);
    }

    if (input_field[3] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddHH.Person[' + person_index + '].Day"][role="textbox"][aria-live="assertive"]').clear().type(input_field[3]);
    }

    if (input_field[4] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddHH.Person[' + person_index + '].Month"][role="textbox"][aria-live="assertive"]').clear().type(input_field[4]);
    }
    if (input_field[5] != ""){
        cy.get('input[data-fieldname="QIndiv[' + person + '].QAddHH.Person[' + person_index + '].Year"][role="textbox"][aria-live="assertive"]').clear().type(input_field[5]);
    }

    if (input_field[6] != ""){
        cy.get('.text-container').contains(input_field[6]).click();
    }

    cy.wait(3000);

    if (input_field[7] != ""){

        cy.get('.text-container').contains(input_field[7]).click();
        //func.yes_no("No")
    }

    func.save_cont();


    return person_index;

    //we don't have a save and continue here because the next step is to answer yes or no to adding more people (or is it is that all people?)

}

function came_to_the_uk_year(answer, page, mobile){
    if (answer.search("born in the UK") >0 ) {
       cy.get('.text-container').contains(answer).click();
    }
    else if (answer != ""){
        if (mobile == true) {
            cy.get('input[data-fieldname="' + page + '"][role="textbox"]').clear().type(answer);
        }
        else {
            cy.get('input[data-fieldname="' + page + '"][role="textbox"][aria-live="assertive"]').clear().type(answer);
        }
    }

    func.save_cont();

}

function other(page, answer, save = "No"){

    const answer_array = ["Other", "Other bones"]

    // cy.log("Pre Answer is " + answer)
    // cy.log("Going into the 'Other' function")
    answer = func.change_empty_answer(answer);
    var check_for_other = 0;
    var input_field = answer.split(";");

    for (var item in input_field) {
        // cy.log("answer going in:")
        // cy.log(input_item[item])
       if (answer_array.includes(input_field[item]) || input_field[item].search("Any other")>0) {
         check_for_other = 1
        //  cy.log("Got to the bit where it has found Other")
         cy.get('.text-container').each(ele => {
        //  cy.log(ele.text())
        //  cy.log(input_field[item])
         if (ele.text() == input_field[item]){
            //  cy.log("into the part where it should click the option with")
             cy.wait(1000)
             ele.click()

         }


            })
         }

       else {

            if (input_field[item] != ""){
                cy.get('.text-container').contains(input_field[item]).click();
        }
       }


    }
//   At the end of the loop through the options we click Save and continue if there is no Other value to select
  if (check_for_other != 1 || save == "Yes") {
    func.save_cont();
  }
}

function soc_living(answer, field_name){
if (answer.search("outside of the UK") >0){
    cy.get('.text-container').contains(answer).click();
}
else if (answer != ""){
    if (answer == "Don\'t know" || answer == "Prefer not to say"){
        cy.log("Falling into Don't know the answer is " + answer)
        //In the TO scripts the don't know deosn't appear and therefore needs a save and cont to make them work
        cy.get("body").then($body => {
            if ($body.text().includes(answer)){
                cy.get('.text-container').contains(answer).click();
            }
            else {
                func.save_cont();
                cy.wait(2000);
                cy.get('.text-container').contains(answer).click();
            }
        })
    }
    else{
    cy.get('input[data-fieldname="' + field_name + '"][role="textbox"][aria-live="assertive"]').clear().type(answer);
    }
}
    func.save_cont();
}

// function soc_living_county(answer, person){
//     if (answer == "It is outside of the UK") {
//         cy.get('.text-container').contains(answer).click();
//     }
//     else if (answer != ""){
//         cy.get('input[data-fieldname="QIndiv[' + person + '].QSocialMob.SMOYCty"][role="textbox"][aria-live="assertive"]').clear().type(answer);
//     }
//         func.save_cont();
// }

function outro(answer){
    var input_field = answer.split(";");
    if (answer == "I do not want to receive an e-voucher" || answer == "I do not want to receive a voucher"){
        cy.get('.text-container').contains(answer).click();
    }
    else {
     if (input_field[0] != ""){
        cy.get('input[data-fieldname="QOutro.Email"][role="textbox"][aria-live="assertive"]').clear().type(input_field[0]);
     }
     if (input_field[1] != ""){
        cy.get('input[data-fieldname="QOutro.EmailChk"][role="textbox"][aria-live="assertive"]').clear().type(input_field[1]);
    }
        }
        func.save_cont(1000);
}

  function feedback_out(answer = "", telephone){
    var input_field = answer.split(";");
    for (let i = 0; i < 2; i++) {
        input_field[i] = func.change_empty_answer(input_field[i]);
    }
    if (input_field[0] != ""){
        cy.get('.text-container').contains(input_field[0]).click();
    }
    if (input_field[1] != ""){
        cy.get('input[data-fieldname="QOutro.Comments"][role="textbox"]').clear().type(input_field[1]);
  }
    if (telephone == "Yes"){
       func.save_cont();
    }
    else {
    cy.get('[role="button"]').contains('Submit');
    cy.get('[role="button"]').contains('Submit').click();
    }
}

// function look_for_work_catch(answer, person, type){

//     var input_field = answer.split(";");
//     if (input_field[0] != ""){
//         cy.get('input[data-fieldname="QIndiv[' + person + '].QEmploy.QCatchUnemp.ctchLkTim' + type + 'Mth"][role="textbox"][aria-live="assertive"]').clear().type(input_field[0]);
//     }
//     if (input_field[1] != ""){
//         cy.get('input[data-fieldname="QIndiv[' + person + '].QEmploy.QCatchUnemp.ctchLkTim' + type + 'Yr"][role="textbox"][aria-live="assertive"]').clear().type(input_field[1]);
//     }
// }

function look_for_work(answer, page, type){
        var input_field = answer.split(";");
        let page_2 = page.replace("Mth", "Yr");

        for (let i = 0; i < 2; i++) {
            input_field[i] = func.change_empty_answer(input_field[i]);
        }

        if (input_field[0] != ""){
            cy.get('input[data-fieldname="' + page + '"][role="textbox"][aria-live="assertive"]').clear().type(input_field[0]);
        }
        if (input_field[1] != ""){
            cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"][aria-live="assertive"]').clear().type(input_field[1]);
        }

        func.save_cont();

    }

function leave_paid_job(answer = "", page, offsets_month, offsets_year){
    if (answer.search("never had a paid job") >0 ){
        cy.get('.text-container').contains("never had a paid job").click();
    }
    else if (answer == ""){
        cy.wait(2000);
      //  cy.log("No Answer provided")
    }
    else {
        var input_field = answer.split(";");
        // sometimes there can be mm/yyyy for the answer
        if (input_field[0] != ""){
            //cy.get('input[data-fieldname="QIndiv[' + person + '].QUnemploy.LeftM"][role="combobox"]').clear();
            //cy.get('input[data-fieldname="QIndiv[' + person + '].QUnemploy.LeftM"][role="combobox"]').select(input_field[0],{force: true});
            // cy.log(offsets_month);
            // cy.log(offsets_year);
            cy.get('[class="Font30 reset-font select-text"]').contains('Select a value').should('be.visible');
            cy.get('[class="Font30 reset-font select-text"]').contains('Select a value').trigger('mouseover').click();
            cy.get('.option-label').contains(offsets_month).click({force: true})
        }
        if (input_field[1] != ""){
            cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"]').clear().type(offsets_year);
        }
    }
    func.save_cont();
}

function text_or_radio(answer, field_name, mobile){
    if (answer == "Don\'t know" || answer == "Prefer not to say"){
        cy.log("Falling into Don't know the answer is " + answer)
        //In the TO scripts the don't know deosn't appear and therefore needs a save and cont to make them work
        cy.get("body").then($body => {
            if ($body.text().includes(answer)){
                cy.get('.text-container').contains(answer).click();
            }
            else {
                func.save_cont();
                cy.wait(2000);
                cy.get('.text-container').contains(answer).click();
            }
        })
    }
    else if (answer == "Yes" || answer == "No"){
        cy.log("Falling into Yes/No the answer is " + answer)
        func.yes_no(answer);
        return;
    }

    else {
        if (mobile == true){
            if (answer != "") {
              cy.get('input[data-fieldname="' + field_name + '"][role="textbox"]').clear().type(answer);
            }
        }
        else {
            if (answer != "") {
              cy.get('input[data-fieldname="' + field_name + '"][role="textbox"][aria-live="assertive"]').clear().type(answer);
            }
        }
    }
    func.save_cont(1500);
}
function employment_status(page_list, command, answer, person, full_row, mobile) {

    // var myString = "QIndiv[2].QAddHH.Person[2].FstNme"
    // var firstPos = myString.indexOf("QAddHH.Person[");//stringlength is 24
    // var secondPos = myString.indexOf("]",firstPos);
    // var person_index = myString.substring(firstPos + 14, secondPos);
    // cy.log(firstPos)
    // cy.log(secondPos)
    // cy.log(person_index)
        //This works for all
    var page_found = func.verify_page(page_list, command, person, full_row, mobile);

    let statuses = answer.split(';');

    //cy.log(names[3])

    if (statuses[0] != ""){
        cy.get('a[data-fieldname="' + page_found + '"][role="button"]')
        .find('div[class="text-container no-auto word-break"]')
        .contains(statuses[0].trim())
        .scrollIntoView()
        .click();

    }

    if (statuses[1] != ""){
        var ftpt = page_found.replace("Stat", "FTPT")
        cy.get('a[data-fieldname="' + ftpt + '"][role="button"]')
        .find('div[class="text-container no-auto word-break"]')
        .contains(statuses[1].trim())
        .scrollIntoView()
        .click();

    }

    func.save_cont();
  }

  function relationships(page_list, page_command, answer_text, person, full_row, telephone, mobile, text_to_check){

    answer_text = func.change_empty_answer(answer_text);
    if (answer_text != "") {
        if (answer_text == 'partner'){
            func.click_exact_text(answer_text, 'No')
        }
        else {
            func.default_behaviour(page_list, page_command, answer_text, person, full_row, "No", telephone, "No", "Yes", mobile )
        }
    }

    //check for text here
    if (telephone == 'No'){
        cy.contains(text_to_check + answer_text.toLowerCase(), { matchCase: false }).should('exist');
    }
    func.save_cont();
  }

  export { wkpl99, date_of_birth, add_absent_household_person, came_to_the_uk_year, look_for_work, leave_paid_job,
           soc_living, other, text_or_radio, outro, feedback_out, month_trigger, add_extra_address, addr_hist, btec_type,
           btec_5_type, individual_intro, employment_status, nationality, relationships}
