// import * as func from '../../../support/functions/functions';
import * as func from '../functions/functions';
import * as influx from '../functions/write_influx';
var array
var guid
var p1_fname = 'Eliza'
var p1_mname = ''
var p1_sname = 'Hamilton'


//var full_name1 = func.name_string(p1_fname, p1_mname, p1_sname)
//var full_name2 = func.name_string(p2_fname, p2_mname, p2_sname)
//var full_name3 = func.name_string(p3_fname, p3_mname, p3_sname)

var survey = "lms"
var country = "ni"

/*---------------------------------------------------------------------
Script: BP17 - LMS, NI, 1PHH, >16,  Someone else answering
Open Defects:
Closed Defects:
Last Update: 03/12/2021, v27.5
Notes:
----------------------------------------------------------------------*/
function bp17_online(type = "Screen", full = "Yes", partial) {
  var full_name1 = func.name_string(p1_fname, p1_mname, p1_sname)

if ( full == "Yes" || partial == "Start") {
  cy.contains('.text-container', 'Please enter your details');

    // Set up the one person household
     influx.wait_start_timer(1000);
    cy.contains('.text-container', 'Please enter your details');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').type(p1_fname);

    if (p1_mname != ''){
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').type(p1_mname);
    }

    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').type(p1_sname);

    cy.get('.text-container').contains('Female').click();
    func.save_cont();

    cy.contains('.text-container', 'Is the address below your main residence');
    func.yes_no("Yes");

    cy.contains('.text-container','Does anyone else live at')
    func.yes_no("No");

    cy.contains('.text-container', 'Is that everyone');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Do any of these people currently live in a student halls of residence for part of the year');
    cy.get('.text-container').contains('None of these people live in a student halls of residence').click();
    func.save_cont();

    cy.contains('.text-container', 'In whose name, or names, is this accommodation rented');
    cy.get('.text-container').contains(full_name1).click();
    func.save_cont();

    cy.contains('.text-container', 'How do you own or rent');
    cy.get('.text-container').contains('Own it outright').click();
    func.save_cont();

    cy.contains('.text-container', 'Please click on the button below to answer some more questions').then(() => {

      influx.stop_timer("BP17_Block01_" + type);
     });

     influx.wait_start_timer(1000);
    //Study starts here
;
    cy.get('.text-container').contains('Start Survey').click();

    cy.contains('.text-container', 'Who will be answering questions for Eliza Hamilton?').then(() => {

      influx.stop_timer("BP17_StartStudy_" + type);
     });

     influx.wait_start_timer(1000);
    cy.get('.text-container').contains('Someone else').click();
    func.save_cont();

    cy.contains('.text-container', 'Does Eliza Hamilton currently live at any other addresses for part of the year?');
    func.yes_no("No");

    cy.contains('.text-container', 'What is Eliza Hamilton\'s date of birth');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').clear('textarea');

    cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').type('11');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').type('11');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').type('1983');
    func.save_cont();
    cy.contains('.text-container', 'What is Eliza Hamilton\'s legal marital status');
    cy.get('.text-container').contains('Divorced').click();
    func.save_cont();

    cy.contains('.text-container', 'What is Eliza Hamilton\'s nationality');
    cy.get('.text-container').contains('British').click();
    func.save_cont();


    //check route: values 2,6,7,8,9 proceed with 10
    func.listerator([2,6,7,8,9],
      'In which country was Eliza Hamilton born', 'In which year did Eliza Hamilton first arrive to live in the UK?');

    cy.get('.text-container').contains('Other').click();
    func.save_cont();

    cy.contains('.text-container', 'Please specify');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.Cry12Oth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.Cry12Oth"][role="textbox"]').type('Mongolia');
    func.save_cont();
    //CAMEYR1
    cy.contains('.text-container', 'In which year did Eliza Hamilton first arrive to live in the UK?');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrProxy"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrProxy"][role="textbox"]').type('2015');
    func.save_cont();

    //C1NTUK
    cy.contains('.text-container', 'Apart from holidays and short visits abroad, has Eliza Hamilton lived in the UK continuously since');
    func.yes_no("Yes");

    // WHYUK10
    cy.contains('.text-container', 'What was Eliza Hamilton\'s main reason for coming to the UK in 2015?');
    cy.get('.text-container').contains('For study').click();
    func.save_cont();

    cy.contains('.text-container', 'How would Eliza Hamilton describe their national identity?');
    cy.get('.text-container').contains('Scottish').click();
    func.save_cont();

    cy.contains('.text-container', "What is Eliza Hamilton's ethnic group?").then(() => {

      influx.stop_timer("BP17_Block02_" + type);
     });

     influx.wait_start_timer(1000);

    cy.get('.text-container').contains('Caribbean or Black').click();
    func.save_cont();

    //check route: values 2,6,7,8,9 proceed with 10
    func.listerator([1,2],
      "Which one best describes Eliza Hamilton's Black, African, Caribbean or Black British ethnic group or background?",
       "What is Eliza Hamilton's religious denomination?");

       cy.get('.text-container').contains("Which one best describes Eliza Hamilton's Black, African, Caribbean or Black British ethnic group or background?");
       cy.get('.text-container').contains('Any other').click();
       func.save_cont();

       cy.contains('.text-container', 'Please specify');
       cy.get('[data-fieldname="QIndiv[1].QEthnic.EthBlkOth"][role="textbox"]').clear('textarea');
       cy.get('[data-fieldname="QIndiv[1].QEthnic.EthBlkOth"][role="textbox"]').type('African');
       func.save_cont();

      func.listerator([1, 2, 3, 4, 5],"What is Eliza Hamilton's religious denomination?",
      'What current passports')


      cy.get('.text-container').contains('Other religion').click();
      func.save_cont();

      cy.contains('.text-container', 'Please specify');
      cy.get('[data-fieldname="QIndiv[1].QReligion.ReligOth"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QReligion.ReligOth"][role="textbox"]').type('African');
      func.save_cont();

      cy.contains('.text-container', 'What current passports');
      cy.get('.text-container').contains('None').click();
      func.save_cont();

      cy.contains('.text-container', 'What expired passports');
      cy.get('.text-container').contains('None').click();
      func.save_cont();

    //PAIDJOB
    cy.contains('.text-container', 'Did Eliza Hamilton have a paid job, either as an employee or self-employed, in the week');
    func.yes_no("Yes");

    //SECJOB
    cy.contains('.text-container', 'Did Eliza Hamilton have a second paid job or business?');
    func.yes_no("No");


    cy.contains('.text-container', 'Is Eliza Hamilton an employee or self-employed?');
    cy.get('.text-container').contains('An employee').click();
    cy.get('.text-container').contains('Part-time').click();
    func.save_cont();

    // Yptjob18
    cy.contains('.text-container', 'We know that people work in part-time jobs for a variety of reasons. What was the main reason Eliza Hamilton took a part-time job rather than a full-time job?');
    cy.get('.text-container').contains('Illness or disability').click();
    func.save_cont();

    func.listerator([1, 3, 4],"Who pays Eliza Hamilton?",
    'Who deals with Eliza Hamilton\'s tax or National Insurance?');

    func.randomiser([1, 3, 4],'Who deals with Eliza Hamilton\'s tax or National Insurance?');

    // cy.get('.text-container').contains('A company through an app or online platform, such as Deliveroo').click();
    // func.save_cont();

    // cy.contains('.text-container', 'Who deals with Eliza Hamilton\'s tax or National Insurance?');
    cy.get('.text-container').contains('Eliza Hamilton\'s tax or National Insurance is taken from their pay before they are paid').click();
    func.save_cont();

    // TempJob18
    cy.contains('.text-container', "Is Eliza Hamilton's main job permanent, temporary or casual?").then(() => {

      influx.stop_timer("BP17_Block03_" + type);
     });

     influx.wait_start_timer(1000);

    cy.get('.text-container').contains('Permanent').click();
    func.save_cont();

    // CONTRACT_MAINJOB20
    cy.contains('.text-container', 'In their job, does Eliza Hamilton have a contract with their employer?');
    func.yes_no("Yes");

    // ZHC20
    cy.contains('.text-container', 'In their main job, does Eliza Hamilton have a zero-hour contract?');
    func.yes_no("Yes");

    // HOME
    func.listerator([1,3], "Where do they mainly work?", "Do they ever do any paid or unpaid work at home for their job?");


    // HOME
    cy.get('.text-container').contains('In different places using home as a base').click();
    func.save_cont();

    // HOMEEV
    cy.contains('.text-container', 'Do they ever do any paid or unpaid work at home for their job?');
    func.yes_no("Any");

    // BroadbandA
    cy.contains('.text-container', 'Does Eliza Hamilton have access to broadband internet at home?');
    func.yes_no("Any");

    //BroadbandB
    cy.contains('.text-container', 'Would it be possible for Eliza Hamilton to be able to work from home without access to broadband internet?');
    func.yes_no("Any");

    // WHCHDAYS18
    cy.contains('.text-container', 'On which of the following days did Eliza Hamilton do any work in their job or business?');
    cy.get('.text-container').contains('Did not work that week').click();
    func.save_cont();

    // EVEROT
    // cy.contains('.text-container', 'Does Eliza Hamilton ever do work which they would consider as overtime?');
    // cy.get('.text-container').contains('Eliza Hamilton works both paid and unpaid overtime').click();
    // func.save_cont();

    func.listerator([1,2,3], 'Does Eliza Hamilton ever do work which they would consider as overtime?',
    'how many hours does Eliza Hamilton usually work a week in their job or business?');

    func.randomiser([1,2,3], 'how many hours does Eliza Hamilton usually work a week in their job or business?');

    cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr_Hours"][role="textbox"]').clear().type('167');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr_Mins"][role="textbox"]').clear().type('59');
    func.save_cont();
    cy.contains('.text-container', 'What was the main reason Eliza Hamilton worked fewer hours or days than usual in the week').then(() => {

      influx.stop_timer("BP17_Block04_" + type);
     });



  }
  if ( full == "Yes" || partial == "Finish") {

    influx.wait_start_timer(1000);
    // YLESS.EMP
    cy.contains('.text-container', 'What was the main reason Eliza Hamilton worked fewer hours or days than usual in the week ');
    //func.yes_no("Yes");

    // func.listerator([1,4,6,7,10], 'What was the main reason Eliza Hamilton worked fewer hours or days than usual in the week',
    // 'What is Eliza Hamilton\'s full job title in their main job or business?');

    // func.listerator([1,6,7,10], 'What was the main reason Eliza Hamilton worked fewer hours or days than usual in the week',
    // 'What is Eliza Hamilton\'s full job title in their main job or business?');
    //func.randomiser([1,4,6,7,10], 'What is Eliza Hamilton\'s full job title in their main job or business?');
    func.randomiser([4], 'Is Eliza Hamilton receiving half of their salary or more while they are away?');

    // PAgeName
    cy.contains('.text-container', "Is Eliza Hamilton receiving half of their salary or more while they are away?");
    func.yes_no("Yes");

    // SOC_2020_pt1
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Jobbing Actor');
    func.save_cont();

    // SOC_2020_pt2
    cy.contains('.text-container', 'What does Eliza Hamilton mainly do in that job or business');
         cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
         cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Does some acting');
    func.save_cont();

    // SIC_2020_EMP
    cy.contains('.text-container', 'At Eliza Hamilton\'s main job, what does the firm or organisation mainly make or do?');
         cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').clear('textarea');
         cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').type('Makes Film and television programmes');
    func.save_cont();

    // SECTOR
    cy.contains('.text-container', 'And was that in a private firm, business, limited company, or some other kind of organisation?');
    cy.get('.text-container').contains('A private firm, business or limited company').click();
    func.save_cont();


    var d = new Date();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    // CONMPY/ CONMON.1
    cy.contains('.text-container', "When did Eliza Hamilton start working for their current employer?");
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').type(month);
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').type(year);
    func.save_cont();



    // REDPAID
    cy.contains('.text-container', "Has Eliza Hamilton left any paid jobs in the last three months?").then(() => {

      influx.stop_timer("BP17_Block05_" + type);
     });

    influx.wait_start_timer(1000);

    func.yes_no("Yes");

    //REDYL18
    cy.contains('.text-container', "Why did Eliza Hamilton leave their last paid job?");
    func.randomiser([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "Has Eliza Hamilton been made redundant from any other jobs in the last 3 months?");

    //REDANY
    func.yes_no("Yes");

    //cy.pause(80000);
    // WKLPL99
    cy.contains('.text-container', 'Which city, town or village is Eliza Hamilton\'s main workplace in?');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').type('Peterborough');//returns <tr><td>
    cy.wait(1000);
    cy.get('td').contains('Peterborough').should('be.visible');
    cy.get('td').contains('Peterborough').click();//table data
    cy.wait(1000);


    if (partial != "Finish"){
        func.save_cont();
    }
    cy.contains('.text-container', 'currently doing a formal apprenticeship with an employer which will lead to qualifications?');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();

    cy.contains('.text-container', 'currently enrolled on any other formal education courses?');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();

    cy.wait(2000); //needed to let the body be loaded
    cy.get("body").then($body => {
        if ($body.text().includes('find work or whilst waiting for a job to start?')) {
          cy.get('[role="button"]').contains('No').click();
          func.save_cont();
        }
    })

    cy.contains('.text-container', 'We are now going to ask you about the qualifications that');
    func.save_cont();

    cy.contains('.text-container', 'In the past, in which of these places did');
    cy.get('.text-container').contains('No qualifications have been gained in the past').click();
    func.save_cont();

    //TPBN20
    cy.contains('.text-container', 'was Eliza Hamilton personally receiving any of the following benefits?');
    cy.wait(1000);
    cy.get('[data-fieldname="QIndiv[1].QBenefits.TPBN20"]').should('be.visible');
    cy.get('[role="button"]').contains('Universal Credit').click();
    cy.wait(1000);
    cy.get('[role="button"]').contains('Child Benefit').click();
    func.save_cont();

    //UCREDIT20
   cy.contains('.text-container', "What was the main reason Eliza Hamilton was receiving Universal Credit?");
   func.randomiser([1, 2, 3, 4, 5], "Does Eliza Hamilton have any physical or mental health conditions or illnesses?");


    // LNGLST
    cy.contains('.text-container', "Does Eliza Hamilton have any physical or mental health conditions or illnesses?");
    func.yes_no("No");
    // HH_refday
    cy.contains('.text-container', "You have listed these people as living here now. Which of these people were living here on");
    cy.get('.text-container').contains('Eliza Hamilton').click();
    func.save_cont();

    // PAgeName
    cy.contains('.text-container', "Apart from the people already listed below, did anyone else live here on");
    func.yes_no("No");

    // PAgeName
    cy.contains('.text-container', "Has Eliza Hamilton lived at their current address for three years or more?");
    func.yes_no("Yes");

    // PAgeName
    cy.contains('.text-container', "Thank you, you are almost done.").then(() => {

      influx.stop_timer("BP17_Block06_" + type);
     });

    influx.wait_start_timer(1000);


    cy.get('.text-container').contains('I do not want to receive an e-voucher').click();
    cy.wait(1000);
    func.save_cont();

    cy.contains('.text-container', 'If you are happy to be contacted by email to take part in future research, please provide your email address.');
    cy.get('[data-fieldname="QOutro.Outro3a" ][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Outro3a"][role="textbox"]').type('mrtestingest@testery.com.uk');
    func.save_cont();

    cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
    cy.get('[data-fieldname="QOutro.Outro3b" ][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Outro3b"][role="textbox"]').type('01234567890');
    func.save_cont();

    cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked');
    cy.get('.text-container').contains('Very difficult').click();
    cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').type('Thank you for watching');
    cy.get('.text-container').contains('Submit').click();

    cy.contains('.text-container', 'Thank you, this study is now complete. You may close your browser.').then(() => {

      influx.stop_timer("BP17_Outtro_" + type);
     });

  };
};
export {bp17_online}
//-------------------------------------------------------------------------------------------------------------------
