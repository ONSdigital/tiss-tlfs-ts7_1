'use strict';
import * as func from '../../../support/functions/functions';
import * as household from '../../../support/functions/household';
import * as individual from '../../../support/functions/individual';

const page_list = ""
function framework(file_path, country, survey, mobile = false,telephone = "No", uac_type = ""){

    // cy.log("Telephone value is " + telephone)
cy.readFile("cypress/e2e/LMS/framework/LMS_Lookup.tsv").then((page_list) => {
    cy.readFile(file_path).then((file_one) => {

        //    cy.readFile('cypress/e2e/LMS/Online_hh/TestDriver.csv').then((test_file) => {
        //cy.readFile('/Users/ianfoulsham/GitHub/TISS-CTF-LMS/automation/src/tests/cypress/cypress/e2e/LMS/Online_hh/TestDriver.csv').then((test_file) => {
        let test_file = func.cleanser(file_one, page_list, country, telephone);
        let person = 1;
        let person_saved = ""
        let ident = ""
        let max_people = 1;
        let expired_passports = 1;
        let current_passports = 1;
        var page = ""
        let people = [["1", "1"]];
        let add_hist = 1;
        let current_year = new Date().getFullYear();
        var came_yr = 0, came_month = 0;
        const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const yesno_array = ["Yes", "No", "Any"];
        //loop around each row of the csv test driver file
            for (var value in test_file) {
                let my_row = test_file[value].replace(/(\r\n|\n|\r)/gm, "");
                let ele = my_row.split('\t');
                page = ""

                cy.log(test_file[value]);

                switch (ele[0].toUpperCase()) {

                    case "SMOYAREA": case "SMOYAREA_PROXY": case "SMOYCTY":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        //go to the function
                        individual.soc_living(ele[1], page);
                        break;

                    case "UPDATE_CURRENT_PASSPORTS":
                        //This is used only in device/mode switching and is automatically added to the Finish tsv for a script
                        //it reassigns the passport number to the finish tsv so it is in the smae place as where it left off
                        current_passports = parseInt(ele[1]);
                        cy.log(current_passports);

                        break;

                    case "UPDATE_EXPIRED_PASSPORTS":
                        //This is used only in device/mode switching and is automatically added to the Finish tsv for a script
                        //it reassigns the passport number to the finish tsv so it is in the smae place as where it left off
                        expired_passports = parseInt(ele[1]);
                        cy.log(expired_passports);

                        break;

                    case "UPDATE_MAX_PEOPLE":
                        max_people = parseInt(ele[1]);
                        cy.log(max_people)
                        break;

                    case "UPDATE_PEOPLE":
                        // people = ele[1];
                        cy.log(people)
                        cy.log(ele[1])
                        break;

                    case "ACTWKDY_PROXY": case "ACTWKDY": case "BACC_WSI":
                        //These pages have a value that needs clicking that is also in the text above the option
                        //e.g. Monday.  Without this the Monday box would never be ticked
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.tickbox_entry(ele[1], page);
                        break;

                    case "INTUSE_PROXY":
                        //
                        cy.wait(1000);
                        func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "Yes", "Yes", mobile )
                        //func.default_behaviour(page_list, ele[0], ele[1], person, my_row, telephone );
                        break;

                        case "ABOUTYOU": case "ADDSTU": case "ADDPPL":
                            // These are different aas there are a number of fields to be input
                            page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                            household.about_you(ele[1], page);
                            break;

                    case "WKPL99": case "WORKPLACE_LOCATION_SECOND_JOB":
                        //wkpl99 has a different input text page which uses typeahead for a location and one of the rows displayed has to be selected
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        individual.wkpl99(page, ele[1]);
                        break;

                    case "DOB":
                        func.verify_page(page_list, ele[0], person, max_people, mobile);
                        individual.date_of_birth(ele[1], person)
                        break;

                    case "INDIVINTROPAGE":
                        cy.wait(3000);
                        func.verify_page(page_list, ele[0], person, max_people, mobile);

                        const my_index = parseInt(person) -1;

                        if (telephone == "No"){
                            if (uac_type == "pp" || mobile == true){
                                cy.log("This path is for PreProd and Mobile")
                                cy.get('a[role="button"][id^=va_]').find('div[class="text-container no-auto word-break"]').eq(my_index).click();//have to find by index
                            }
                            else {
                                cy.get('a[role="button"][id^=ta_]').find('div[class="text-container no-auto word-break"]').eq(my_index).click();//have to find by index
                            }
                        }
                        else {
                            cy.get('a[role="button"][id^=za_]').find('div[class="text-container no-auto word-break"]').eq(my_index + my_index).click();//have to find by index
                            }
                        break;

                    //all cases that do a simple text input into one field and then click save and continue should go here
                    case "TRVTME": case 'SIC2007_EMPLOYED_MAIN_JOB': case 'SIC2007_SELF_EMPLOYED_MAIN_JOB': case "SOC2020PT1": case "SOC2020PT2": case "CRY12_OTHER":
                    case "SMOCCT": case "SMOCCD":  case "NUMILL": case "HH_REFDAY2": case "OUTRO3A" : case "OUTRO3B" : case "CORO20B1_OTH":
                    case "NATID_OTH": case "AGE": case "RELIGION_OTH": case "OTHER_OTH": case "NONUK_OTHER_QUAL":  case "WKSK4":``
                    case "WHITE_OTH": case "MIXED_OTH": case "ASIAN_OTH": case "BLACK_OTH": case "AFRICAN_SC_OTH": case "CARIBBEAN_SC_OTH": case "RELIGIONNI1_OTH":
                    case "RELIGIONNI2_OTH": case "RELIGION_SC_OTH": case "NOLOWM18_OTH": case "SECTOR03_OTH": case "WP_CMPL_OTH": case "CRY120TH_OTH":
                    case "USHR1_NOACT": case "USHR2_NOACT": case "TRVTME_PROXY": case "INELIGIBLEOTHER": case "TEN1SOMEONEELSE_OTH": case "NATID OTHER":
                    case "BENEFITOTH": case "YPTJOB18_OTH": case "CORO20B3_OTH": case "YDIFJB_EMP_OTH": case "WHITE_OTH_SC": case "WHYCAS18_OTH": case "YMORECORONA2_OTH":
                    case "ACCKIND_OTHER": case "TIMEDAYS": case "JOBTYP18_OTH": case "DIFPER": case "WHYCAS18_EMP_OTH": case "CORO20B6_OTH":
                    case "YLESS.EMP_OTH": case "YLESS.SEMP_OTH": case "YSTART18_OTH": case "YDIFJB_SEMP_OTH": case "WHYTEMP18_OTH": case "OTHER_QUAL_NONUK":
                    case "BTEC_NUMBER": case "SOC2020_2_PT1": case "SOC2020_2_PT2": case 'SIC2007_EMPLOYED_SECOND_JOB': case "EWNI_ADDUNI_OTHER": case "SCOT_ADDLEA_OTHER":
                    case "ADD_OTHER_QUAL": case "EWNI_ADDSCH_OTHER": case "EWNI_ADDCOL_OTHER": case "ADD_OTHER_QUAL_NONUK": case 'SIC2007_SELF_EMPLOYED_SECOND_JOB': case "OTHER_QUAL":
                    case "EWNISCOT_ADDCOL_OTHER": case "EWNISCOT_ADD_UNI_OTHER": case "EWNISC_ADDSCH_OTHER":  case "EWNI_ADDPROF_OTHER": case "SCOT_ADDSCH_OTHER":
                    case "SCOT_ADDHE_OTHER": case "GENDER_IDENTITY_OTH": case "SEXUAL_ORIENTATION_OTH": case "SOC2020_JOB_TITLE_UNPAID_FAMILY_WORKER":
                    case "SOC2020_JOB_DESCRIPTION_UNPAID_FAMILY_WORKER": case "SIC2007_UNPAID_FAMILY_WORKER": case "NUMBER_EMPLOYEES_WORKPLACE_1_TO_10_1JOB":
                    case "NUMBER_EMPLOYEES_WORKPLACE_1_TO_10_MAIN_2JOB": case "NUMBER_EMPLOYEES_WORKPLACE_1_TO_10_SECOND_2JOB": case "NUMBER_EMPLOYEES_SELF_EMPLOYED_1_TO_10_1JOB":
                    case "NUMBER_EMPLOYEES_SELF_EMPLOYED_1_TO_10_MAIN_2JOB": case "NUMBER_EMPLOYEES_SELF_EMPLOYED_1_TO_10_SECOND_2JOB":
                    case "SOC2020_JOB_TITLE_PREVIOUS_JOB": case "SOC2020_JOB_DESCRIPTION_PREVIOUS_JOB": case "SIC2007_INDUSTRY_EMPLOYED_PREVIOUS_JOB":
                    case "SIC2007_INDUSTRY_SELF_EMPLOYED_PREVIOUS_JOB": case "NUMBER_EMPLOYEES_WORKPLACE_1_TO_10_PREVIOUS_JOB":
                    case "NUMBER_SELF_EMPLOYED_WORKPLACE_1_TO_10_PREVIOUS_JOB": case "NUMBER_EMPLOYEES_WORKPLACE_1_TO_10_UFW":
                    case "SIC2007_INDUSTRY_EMPLOYED_REDUNDANT_JOB": case "UK_ARMED_FORCES_YEAR_LEFT": case "SOC2020_JOB_TITLE_REDUNDANT_JOB":
                    case "SOC2020_JOB_DESCRIPTION_REDUNDANT_JOB": case "WORK_ILLNESS_TIME_OFF_LENGTH_DAYS": case "WORK_ILLNESS_TIME_OFF_LENGTH_WEEKS":
                    case "WORK_ILLNESS_TIME_OFF_LENGTH_MONTHS": case "APPRENTICESHIP_SOC2020_JOB_TITLE": case "APPRENTICESHIP_SIC_2007_INDUSTRY":
                    case 'SICKNESS_CONTINUOUS_ABSENCE_LENGTH_OVER_2_MONTHS': case 'UK_ARMED_FORCES_YEAR_LEFT':
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        if (mobile == true) {
                            func.input_value_noaria(ele[1], page);
                        }
                        else {
                            func.input_value(ele[1], page);
                        }
                        break;

                        case "NATIONALITY_OTH":
                            // With the performance problems arising from having more than one survey in place on one server, some commands need a bit of breathing space
                            // This will hopefully sort this one out
                            cy.wait(3000)
                            page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                            if (mobile == true) {
                                func.input_value_noaria(ele[1], page);
                            }
                            else {
                                func.input_value(ele[1], page);
                            }
                            break;

                    //This is a sort of temporary fix for the TO page
                    case "CIGEVER": case "SMEARNER":

                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        // if (telephone == "Yes"){
                        cy.wait(2000)
                        cy.get('[role="button"]').contains(ele[1]).click();
                        func.save_cont();

                        break;


                    case "GENDER_IDENTITY":
                        if (ele[1] == "No"){
                            // cy.log("Going in to Gender No");
                            func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "No", "Yes", mobile )
                            cy.wait(2000)
                        }
                        else {
                            func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "Yes", "Yes", mobile )
                        }
                        break;

                    case "SEXUAL_ORIENTATION":
                        if (ele[1] == "Other" || ele[1] == "Other?"){
                            // cy.log("Going in to Gender No");
                            func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "No", "Yes", mobile )
                            cy.wait(1000)
                        }
                        else {
                            func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "Yes", "Yes", mobile )
                        }
                        break;


                    case "GRSSKP2": case "GRSSKP":
                        // Some strange behaviour on this page that means that in the pipe it doesn't select the button and click save and continue
                        // This is an attempt to break it down and also log what is happening in the process
                        cy.log('GRSSKP2 - verifying page')
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        cy.wait(1000)
                        cy.log('GRSSKP2 - going in to default behaviour but not saving')
                        func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "No", "Yes", mobile )
                        cy.log('GRSSKP2 - clicking save and continue')
                        func.save_cont(3000);
                        // needs an extra wait here I think
                        cy.wait(6000);
                        break;

                    case "GRSSKP2A": case "GRSSKPA":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.input_value_noaria(ele[1], page);
                        break;


                    case 'GRSSKP1A': case 'GRSSKP2A_TEL': case 'GRSSKP2B':
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);

                        if (telephone == "No"){
                            cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"][tabindex="50"][role="textbox"]').type(ele[1]);
                        }
                        else {  //There is a defect on this page (LMS-2350) and clicking Yes doesn't work, so this will type 1 in the TO textbox - save_cont not required either
                            //However if the answer is No then it does need save and continue.  Defects eh?
                            if (ele[1] == 'Yes'){
                                cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"][tabindex="50"][role="textbox"]').type("1");
                            }
                            else {
                                cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"][tabindex="50"][role="textbox"]').type("2");
                                func.save_cont();
                            }
                        }
                        break;

                    case 'GRSSKP1B':
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        if (telephone == "No"){
                            cy.wait(2000);
                            cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"][tabindex="50"][role="textbox"]').type(ele[1]);
                            func.save_cont();
                        }
                        else {  //There is a defect on this page (LMS-2350) and clicking Yes doesn't work, so this will type 1 in the TO textbox - save_cont not required either
                            //However if the answer is No then it does need save and continue.  Defects eh?
                            if (ele[1] == 'Yes'){
                                cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"][tabindex="50"][role="textbox"]').type("1");
                            }
                            else { //There is a defect on this page (LMS-2350) and clicking Yes doesn't work, so this will type 1 in the TO textbox - save_cont not required either
                                //However if the answer is No then it does need save and continue.  Defects eh?
                                cy.get('input[data-fieldname="' + page + '"][aria-live="assertive"][tabindex="50"][role="textbox"]').type("2");
                                func.save_cont();
                            }
                        }

                        break;

                    case "GRSEXP" : case "SECGRSEXP":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        if (telephone == "No"){
                            func.input_value_noaria(ele[1], page);
                        }
                        else {
                            func.input_value_grsexp(ele[1], page);
                        }
                        break;

                    case "TEN1": case "INTUSE": case "TEN1SOMEONEELSE":
                        // For some telephone questions Don't know etc are not in the initial page, so we need to call default behaviour with checkbox set to yes as that
                        // clicks save and continue, which then displays the extra options
                        if (telephone == "Yes") {
                           // cy.log("Going in to TO version")
                            func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "Yes", "Yes", mobile )
                        }
                        else {
                            func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "Yes", "Yes", mobile )
                        }

                        break;

                    //These can have Don't know or Prefer not to say but with a text input
                    case "SATIS": case "HAPPY": case "WORTH": case "ANXIOUS": case "HEALYR":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        individual.text_or_radio(ele[1], page, mobile);
                        break;

                    case "CAMEYR": case "CAMEYR_PROXY": //Could be a radio button or a text field
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        //go to the function
                        if (ele[1].search("\\-") >=0 || ele[1].search("\\+") >=0){
                            came_yr = func.offset_date(ele[1], "YYYY");
                            individual.came_to_the_uk_year( came_yr, page, mobile);
                        }
                        else {
                            individual.came_to_the_uk_year(ele[1], page, mobile);
                            came_yr = ele[1];
                        }
                        // var offsets = func.offset_date(ele[1], "YYYY");
                        // individual.came_to_the_uk_year(ele[1], page);
                        break;

                    case "CAMEYR2":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);

                        if (ele[1].search("\\-") >=0 || ele[1].search("\\+") >=0){
                              came_yr = func.offset_date(ele[1], "YYYY");

                            func.input_value( came_yr, page);
                        }
                        else {
                            func.input_value( ele[1], page);
                            came_yr = ele[1];
                        }

                        break;

                    case  "CAMEMT":
                        //This is a bit more complicated as there are business rules that might mean that the page is not shown
                        //when it is expected.  Months are tricky
                        var month = "";
                        //We shouldn't do anything until we know whether the year is potentially within the last 2
                        if (came_yr >= (current_year-2)){

                            page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                            if (ele[1].search("\\-") >=0 || ele[1].search("\\+") >=0){
                                month = func.offset_date(ele[1], "MMMM");
                                month.toLocaleString('default', { month: 'long' });
                                // cy.log("this is the " + month.toString())
                                cy.get('.text-container').contains(month).click();
                                func.save_cont();
                            }
                            else {
                                cy.get('.text-container').contains(ele[1]).click();
                                func.save_cont();
                            }
                        }

                        break;

                    case "ADDCHK1":
                        cy.wait(10000)
                        cy.get("body").then($body => {

                            cy.log($body.text())
                            if ($body.text().includes('AddChk1')) {
                                cy.log("addchk1 found")
                                func.verify_page(page_list, ele[0], person, max_people, mobile);
                                func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "Yes", "Yes", mobile );
                            }
                            else {
                                var return_of_rec = func.to_recovery(page_list, ele[0], ele[1], person, my_row, telephone);
                                if (return_of_rec == 1){
                                    throw new Error("Unable to recover Telephone script to Add Check, please investigate")
                                }
                            }
                        })
                        break;

                    case "SETPROXY":
                        break;


                    case "OUTRO": case "OUTRO1": case "NOVOUCH": //This is for the page where you can choose to have an emailed voucher or opt out
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        //go to function
                        individual.outro(ele[1], person);
                        break;

                    case "NATID": case "ETHNICITY": case "CRY12":
                        //This is where the question has different fields depending on the country of the survey.
                        //To make things easier for the user, I have set it up so that when they put in these commands
                        //it picks the right value based on the country in the calling test - lookups are created for each country.
                        ident = ele[0] + "_" + country;
                        // page = func.verify_page(page_list, ident, person);
                        func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "No", "Yes", mobile)
                        //cy.get('.text-container').contains(ele[1]).click();
                        break;

                    case "LKTIMB": case "LKTIMA": case "LKTIMA_CATCH": case "LKTIMA_CATCH": case "LKTIMB_CATCH": case "LKTIMB_CATCH":
                        //Looking for work has 2 options that are pretty similar but for the A and B in the field name, so rather
                        //than write out 2 functions I have cobbled something together that will cope with both and save a few lines.
                        //...if it works
                        ident = ele[0];
                        page = func.verify_page(page_list, ident, person, max_people, mobile);
                        individual.look_for_work(ele[1], page, ele[0].substring(5));
                        break;

                    case "MULTI_EXPIRED_PASSPORT": case "OTHER_EXPIRED_PASSPORT":
                        page = func.verify_page(page_list, ele[0], person,  expired_passports, mobile);
                        // cy.log("page is " + page)
                        func.input_value(ele[1], page);
                        //expired_passports += 1;
                        break;

                    case "EXPIRED_PASSPORT_CHECK":
                        page = func.verify_page(page_list, ele[0], person,  expired_passports, mobile);
                        // cy.log("page is " + page)
                        func.yes_no(ele[1]);
                        expired_passports += 1;
                        break;

                    case "MULTI_CURRENT_PASSPORT": case "OTHER_PASSPORT":
                        page = func.verify_page(page_list, ele[0], person,  current_passports, mobile);
                        // cy.log("page is " + page)
                        func.input_value(ele[1], page);
                        //expired_passports += 1;
                        break;

                    case "CURRENT_PASSPORT_CHECK":
                        page = func.verify_page(page_list, ele[0], person,  current_passports, mobile);
                        // cy.log("page is " + page)
                        func.yes_no(ele[1]);
                        current_passports += 1;
                        break;

                    case "PAYINTRO_TO":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        // cy.log("page is " + page)
                        func.yes_no(ele[1]);
                        break;

                    case "WHITE":
                        //for when the box appears without save and cont
                        ident = ele[0] + "_" + country;
                        page = func.verify_page(page_list, ident, person, max_people, mobile);
                        individual.other(page, ele[1]);
                        cy.wait(1000);
                        break;

                    case "ILNE20": case "ILNE20M": case "SITEFR": case "ILLFST20":

                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        individual.other(page, ele[1], "Yes");
                        break;

                        // DK and PNTS are not shown straight away, other fields are text boxes
                        case "SMHCOMP":
                            const dontknowprefer = ["Don't know", "Prefer not to say"];
                            if (dontknowprefer.includes(ele[1])) {
                                cy.wait(2000);
                                func.save_cont();
                                cy.get('.text-container').contains(ele[1]).should('be.visible');
                                cy.log("container is visible")
                                cy.get('.text-container').contains(ele[1]).click();
                                cy.wait(2000);
                                func.save_cont();
                            }
                            else {
                                func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "Yes", "Yes", mobile)
                            }

                            break;

                        case "NATIONALITY":
                            // This is for cases where Other can be selected and  save and cont is completed and another text box appears.. be sure to add the _other field to
                            //all cases that do a simple text input into one field and then click save and continue
                            const dontprefer = ["Don't know", "Prefer not to say"];
                            if (telephone == "Yes"){
                                var save = "Yes"
                                cy.wait(2000);
                                page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                                cy.log("Are we saving?");

                                //now check for Don't know etc - for Nationality, don't know is exclusive so you cannot put Anglish and don't know
                                if (dontprefer.includes(ele[1])) {
                                    cy.wait(2000);
                                    func.save_cont();

                                    cy.wait(1000);
                                    cy.get('.text-container').contains(ele[1]).should('be.visible');
                                    cy.get('.text-container').contains(ele[1]).click();

                                    if (save == "Yes" ) {
                                      func.save_cont();
                                    }
                                }
                                else{//We don't want to go here if the answer is Don't know or prefer not to say
                                    if (ele[1].includes("Other")){
                                        save = "No";
                                    }

                                    individual.nationality(page_list, ele[0], ele[1], person, my_row, telephone, save, mobile, max_people);
                                }
                            }//end of If Telephone
                            else { //non TO
                                page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                                individual.other(page, ele[1]);
                            }
                            break;

                    //some yes/nopages need a bit of time before clicking save and continue
                    case "TOTAC1": case "TOTAC2": case "CHECK_TOTAL_USUAL_WORK_SECOND_2JOB": case "CHECK_TOTAL_USUAL_WORK_MAIN_2JOB":
                    case "CHECK_TOTAL_USUAL_WORK_1JOB": case "CHECK_TOTAL_ACTUAL_WORK_SECOND_2JOB":
                        cy.wait(2000);
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.yes_no(ele[1],2000);
                        break;

                    //all cases where the page just requires save and continue - probably aren't that many
                    case "PAYINTRO": case "RELEXPAGE": case "INELIGIBLEOUTRO": case "ALTINDIVSTART": case "HOUSEHOLD_INTRO":
                    case "EMPLOYMENT_INTRO": case "HHKICKOUT": case "ADDRHIST_INTRO": case "ALTINDIVSTART": case "MAX_PEOPLE":
                    case 'PAST_LONG_LASTING_HEALTH_CONDITION_INTRO': case 'COUNTRY_QUAL_INTRO': case 'LAST_PASSPORT_MESSAGE':
                    case 'LASTPERMESSAGE': case 'LAST_EXPIRED_PASSPORT_MESSAGE':
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.save_cont(2000);
                        break;

                    case "BTEC_TYPE":  case "BTEC_3_TYPE3":
                        individual.btec_type(page_list, ele[0], ele[1], person, my_row, "No", telephone, "No", max_people, mobile);
                        break;

                    case "UPOT": case "UPOT2": case "ACTHR": case "ACTHR1": case "ACTHR2":
                    case "POT": case "POT2": case "UPOT1": case "POT1":
                        func.time_split(page_list, ele[0], ele[1], person, "Yes", 0, "Hours", "Mins", mobile);
                        break;

                    // Doesn't look like the upot1 and pot1 need to be different to the ones above so taking them out and will see what happens

                    // case "UPOT1": case "POT1":
                    //     func.time_split(page_list, ele[0], ele[1], person, "Yes", 0, "Hours", "Mins", mobile);
                    //     break;

                    case "NUMBER_OF_EXTRA_WEEKLY_HOURS_PREFERRED": case "NUMBER_OF_LESS_HOURS_PREFERRED_MAIN_JOB":
                        func.time_split(page_list, ele[0], ele[1], person, "Yes", 0, "hours", "minutes", mobile);
                        break;

                    case "CASAC":
                        func.time_split(page_list, ele[0], ele[1], person, "Yes", 2000, "Hours", "Mins", mobile);
                        break;

                    case "USHR": case "USHR1": case "USHR2":
                        // This is a fudge because for some reason person is lost in the .then command
                            const person_new_hours = person
                            page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                            cy.wait(2000);
                            //cy.get('body').find('div[class="text-container no-auto word-break"]').then($body => {
                            cy.get("body").then($body => {
                                person = person_new_hours
                                if ($body.text().includes('actually work')) {
                                    func.time_split(page_list, ele[0], ele[1], person, "No", 0, "Hours", "Mins", mobile);

                                }
                                else{
                                    func.time_split(page_list, ele[0], ele[1], person, "Yes", 0, "Hours", "Mins", mobile);
                                }
                            });

                                break;

                            // These are the new TS5 35.8
                    case "USUAL_UNPAID_OVERTIME_1JOB_HOURS": case "USUAL_UNPAID_OVERTIME_MAIN_2JOB_HOURS":
                    case "USUAL_UNPAID_OVERTIME_SECOND_2JOB_HOURS": case "USUAL_PAID_OVERTIME_1JOB_HOURS":
                    case "USUAL_PAID_OVERTIME_MAIN_2JOB_HOURS": case "USUAL_PAID_OVERTIME_SECOND_2JOB_HOURS":

                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.time_split(page_list, ele[0], ele[1], person, "No", 0, "hours", "minutes", mobile);

                        break;

                    case "USUAL_PAID_OVERTIME_NWRW_1JOB_HOURS": case "USUAL_UNPAID_OVERTIME_NWRW_MAIN_2JOB_HOURS":
                    case "USUAL_PAID_OVERTIME_NWRW_SECOND_2JOB_HOURS": case "USUAL_UNPAID_OVERTIME_NWRW_SECOND_2JOB_HOURS":
                    case "USUAL_PAID_OVERTIME_NWRW_MAIN_2JOB_HOURS": case "USUAL_UNPAID_OVERTIME_NWRW_1JOB_HOURS":
                    case "USUAL_UNPAID_FAMILY_WORKER_HOURS": case "ACTUAL_UNPAID_FAMILY_WORKER_HOURS":

                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.time_split(page_list, ele[0], ele[1], person, "Yes", 0, "hours", "minutes", mobile);

                        break;

                    case "REDPAID":
                        cy.wait(2000);
                        if (ele[1] != ""){
                            if (telephone != "Yes"){
                                cy.get('.text-container').contains(ele[1]).click();
                            }
                            else {
                                func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "No", "Yes", mobile )
                            }
                        }
                        func.save_cont(2000);
                        break;

                    //This is for the education qual_check where it potentially has extra fields for qualifcations from other countries
                    // and needs to not do save after the first qual_check
                    //.. trying it anyway!
                    case "QUAL_CHECK": case "QUAL_CHECK_SCOT": case "QUAL_CHECK_EWNISCOT":
                        cy.wait(2000);
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        //Added new person as the body search messes with the person increment
                        const person_new_ed = person
                        cy.get("body").then($body => {
                            person = person_new_ed
                            if ($body.text().includes('Qualifications gained outside of the UK')) {
                                page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                                func.tickbox_entry(ele[1], page, "No");
                            }
                            else {
                                page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                                func.tickbox_entry(ele[1], page, "Yes");
                            }
                        });
                        break;

                    case "HEALPB": case "HEAL20":
                        var answers = ele[1].split(";")
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        cy.wait(2000)
                        for (var value in answers) {
                            answers[value] = func.change_empty_answer(answers[value]);

                            if (answers[value] != ""){
                                if (telephone == "Yes"){
                                    cy.wait(1500);
                                    cy.get('.text-container').contains(answers[value].trim()).scrollIntoView();
                                    cy.get('.text-container').contains(answers[value].trim()).click();
                                }

                                else {

                                    cy.get('.text-container').contains(answers[value].trim()).click();

                                }
                            }
                        }
                        func.save_cont(0);

                        break;

                    case "QUAL_CHECK_NONUK":
                        var answers = ele[1].split(";")
                        cy.wait(3000)
                        cy.get('.text-container').contains("Qualifications gained outside of the UK").scrollIntoView();
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        for (var value in answers) {

                            answers[value] = func.change_empty_answer(answers[value]);

                            if (answers[value] != ""){
                                cy.get('a[data-fieldname="' + page + '"][role="button"]').find('div[class="text-container no-auto word-break"]').contains(answers[value].trim()).click();

                            }
                        }
                        func.save_cont(0);
                        break;


                    //This is for when did you last leave employment >4 months or <4 months important as triggers different route for REDPAID or just REDANY
                    //Thus works with the offset -4m etc  but needs to be in both CONMON and CONMPY
                    case "CONMON1": case "CONMON2":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        var offsets = func.offset_date(ele[1], "MM");
                        func.input_value(offsets, page, "No");
                        break;

                    case "CONMPY": case "CONSEY":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        var offsets = func.offset_date(ele[1], "YYYY");
                        func.input_value(offsets, page);
                        break;

                    case "ADDRHIST_DATE":
                        var AddrHist_index =  individual.addr_hist(ele[1], person, people, page_list, mobile);
                        var value_to_splice = new Array();
                        value_to_splice[0] = person;
                        value_to_splice[1] = parseInt(people[AddrHist_index][1]) + 1
                        people.splice(AddrHist_index,1,value_to_splice);
                        AddrHist_index = null;
                        value_to_splice = null;

                        break;

                    case "PAUSE":
                        cy.pause(ele[1]);
                        break;

                    case "ADDRHIST_MANUAL":
                        for (var AddrHist_index in people) {

                            if (people[AddrHist_index][0] == person) {
                                //cy.log("Address number is: " + people[AddrHist_index][1].toString())
                                page = func.verify_page(page_list, ele[0], person,  parseInt(people[AddrHist_index][1]-1), mobile);
                                individual.add_extra_address(ele[1], person, parseInt(people[AddrHist_index][1] -1));
                                }
                            }

                        break;

                    //all cases where the page just requires save and continue - probably aren't that many
                    case "RELEXPAGE": case 'JOBQUAL_INTRO':
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.save_cont(2000);
                        break;

                    //Sometimes simple text containers don't work if the text to click is found elsewhere on the page
                    //So this one is for when you need to use the data field name and role = button.
                    case "PROXYCHECK": case "SCOT_INT_BACC":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        func.radio_button(ele[1], page, "No");
                        break;


                    case "STAT": case "STAT1": case "STAT2":
                        individual.employment_status(page_list, ele[0], ele[1], person, my_row, mobile)

                        break;

                    case "REL TO P1":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);

                        individual.relationships(page_list, ele[0], ele[1], person, my_row, telephone, mobile, 'your... ')

                        break;

                    case "STUREL":
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        individual.relationships(page_list, ele[0], ele[1], person, my_row, telephone, mobile, 'your...')

                        break;

                    case "RELATIONSHIPS":
                        //This needs the tester to input the 2 people who are the subject of the relationship
                        //and then the answer.  For instance - 2;3;Husband or Wife

                        let answer = ele[1].split(";");
                        page = func.verify_page(page_list, ele[0], answer[0], parseInt(answer[1]), mobile);
                        individual.relationships(page_list, ele[0], answer[2], answer[0], parseInt(answer[1]), telephone, mobile, 'their...')


                        break;

                    case "HH_REFDAY_ADDHOLDCHECK":
                        person_saved = person

                        cy.get('input[class*="CategoryRadioButtonComponent"]').invoke('prop', 'dataset').then(mynameis => {
                            person = person_saved
                            var firstPos = mynameis.fieldname.indexOf("QAddHH.Person[");
                            var secondPos = mynameis.fieldname.indexOf("]",firstPos);
                            var my_index = mynameis.fieldname.substring(firstPos + 14, secondPos);
                            page = func.verify_page(page_list, ele[0], person, my_index, mobile);
                            func.yes_no(ele[1]);
                        })

                        break;

                    case "HH_REFDAY_ADDHOLD":
                        person_saved = person
                        cy.wait(3000);
                        cy.get('input[class*="StringTextBoxComponent"]').invoke('prop', 'dataset').then(mynameis => {
                            person = person_saved
                            var firstPos = mynameis.fieldname.indexOf("QAddHH.Person[");
                            var secondPos = mynameis.fieldname.indexOf("]",firstPos);
                            var my_index = mynameis.fieldname.substring(firstPos + 14, secondPos);
                            page = func.verify_page(page_list, ele[0], person, my_index, mobile);
                            max_people = individual.add_absent_household_person(ele[1], person, my_index);
                        })

                        break;

                    case "LEFTYR18": case "LEFTYR18_CATCH":
                        var offsets_month = "";
                        var offsets_year = "";
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        if (ele[1].search("\\-") >=0 || ele[1].search("\\+") >=0){
                            offsets_month = func.offset_date(ele[1], "MMMM");
                            offsets_month.toLocaleString('default', { month: 'long' });
                            offsets_year = func.offset_date(ele[1], "YYYY");
                        }
                        else if (ele[1] != "") {
                            var dates = ele[1].split(";");
                            offsets_month = dates[0];
                            offsets_year = dates[1];
                        }
                        individual.leave_paid_job(ele[1], page, offsets_month, offsets_year);
                        break;

                    case "FEEDBACK":  case "FEEDBACK_TO": //end of survey page, this needs a submit not a save and cont
                        page = func.verify_page(page_list, ele[0], person, max_people, mobile);
                        //go to function
                        individual.feedback_out(ele[1], telephone);
                        break;

                    case "CURRENT_PASSPORTS": case "EXPIRED_PASSPORTS":
                        // func.default_behaviour_passports(page_list, ele[0], ele[1], person, my_row, telephone );
                        func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "Yes", telephone, "Yes", "Yes", mobile );
                        break;
                    //////////////////////////////////////////////////////////////////////////////////
                    //                                                                              //
                    //                THIS SECTION IS FOR NON-PAGE COMMANDS                         //
                    //                                                                              //
                    //////////////////////////////////////////////////////////////////////////////////


                    case "CHECKPAGE":
                        //This is so that if the testers go backwards and forwards using previous, they don't have to
                        //worry about check text not distinguishing between similar pages (eg NITAX20, 21 and 22)
                        page = func.verify_page(page_list, ele[1], person, max_people, mobile);

                        break;

                    case "SNAPSHOT":
                        //This is used to take a snapshot of the page during a run - useful if you want to check something
                        //before a failure or to confirm a page layout
                        //Should not be used to video the entire test
                        cy.snapshot();

                        break;

                    case "CHECKTEXT": //Check that a particular piece of text appears on the page
                        //There is an issue on the TO survey where there is a mismatch in case for nursing, so it will ignore the case for that particular question only
                        if ( ele[1] == "Nursing qualification" || ele[1] == "Nursing Qualification" ) {
                            cy.contains('.text-container', ele[1], { matchCase: false });
                        }
                        else {
                        cy.log("This is the Answer " + ele[1]);
                        cy.contains('.text-container', ele[1]);
                        }
                        break;

                    case "PREVIOUS": //Goes back to the previous page
                        cy.wait(500);
                        cy.get('.text-container').contains('Previous').click();
                        break;


                    case "PERSON": //Sets the person number so that for example, the individual study will be processed for that person

                        person = ele[1];
                        // near the end of the journey there is a question about people who normally live here and they are given another
                        //person index. Assuming that it will be more than the people who are specified in the initial section,
                        //so we can add 1 to max people and use that in HH_refday_AddHold and HH_refday_AddHoldCheck
                        if (ele[1] > max_people){
                            max_people = parseInt(ele[1]);
                        }

                        //maintain a list of the number of addresses for each person - here we check that there is an entry for the person being selected
                        let found = 0;
                        for (var person_entry in people) {
                            if (people[person_entry][0] == person) {
                                found = 1;
                            }
                        }
                        if (found == 0) {
                            // cy.log("person is " + person.toString())
                            // cy.log("AddingPerson");
                            var value_to_push = new Array();
                            value_to_push[0] = person;
                            value_to_push[1] = 1
                            people.push(value_to_push);


                        }
                        //Hopefully this will work in a multi person scenario where the passports are numbered per Person
                        expired_passports = 1;
                        current_passports = 1;
                        // cy.log("Person changed to " + person.toString())
                        break;

                    case "COMMENT":
                        //
                        cy.log("Comment: " + ele[1])
                        break;

                    default:

                        func.default_behaviour(page_list, ele[0], ele[1], person, my_row, "No", telephone, "Yes", "Yes", mobile )

                        break;

                }


            }
        });
    });
}

export {framework}
