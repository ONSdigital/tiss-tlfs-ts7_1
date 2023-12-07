import * as func from './functions';
import * as influx from './write_influx';

function ip13_online(type = "Screen", full = "Yes", partial) {

    if ( full == "Yes" || partial == "Start") {

      influx.wait_start_timer(1000);

      cy.get('[role="button"]').contains('Save and continue').click();

      cy.contains('.text-container', 'Please enter your details').then(() => {

          influx.stop_timer("IP13_GetNewSurvey_" + type);
      });

      influx.wait_start_timer(1000);
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').type('Gavin');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').type('Michael');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').type('Shipman');

    cy.get('.text-container').contains('Male').click();
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

    cy.contains('.text-container', 'In whose name, or names, is this accommodation owned or rented? ');
    cy.get('.text-container').contains('Gavin Michael Shipman').click();
    func.save_cont();

    cy.contains('.text-container', 'How do you own or rent');
    cy.get('.text-container').contains('Own it outright').click();
    func.save_cont();

    cy.contains('.text-container', 'Please click on the button below to answer some more questions');
    cy.get('.text-container').contains('Start Survey').click();

    cy.contains('.text-container', 'Who will be answering questions for');
    cy.get('[data-fieldname="QIndiv[1].QPersProx.Rspndnt"][role="button"]').contains('Gavin Michael Shipman').click();
    func.save_cont();

    cy.contains('.text-container', 'Do you currently live at any other addresses for part of the year?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What type of property is your other address?');

    //check route: values 3,4,5 proceed with 6
    var list = ["A family or parental home", "My second home", "My holiday home"];

    for (var value in list) {
        cy.get('.text-container').contains(list[value]).click();
        func.save_cont();
        cy.contains('.text-container', 'for a continuous period of 6 months or more');
        cy.get('.text-container').contains('Previous').click();
        cy.contains('.text-container', 'What type of property is your other address?');
      }

    cy.get('.text-container').contains('Another type of address').click();
    func.save_cont();

    cy.contains('.text-container', 'for a continuous period of 6 months or more');
    func.yes_no("No");

    cy.contains('.text-container', 'What is your date of birth');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').type('01');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').type('01');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').type('1980');
    func.save_cont();

    cy.contains('.text-container', 'What is your legal marital status');
    cy.get('.text-container').contains('Divorced').click();
    func.save_cont();

    cy.contains('.text-container', 'What is your nationality');
    cy.get('.text-container').contains('Polish').click();
    func.save_cont();

    cy.contains('.text-container', 'In which country were you born').then(() => {

      influx.stop_timer("IP13_Block01_" + type);
  });

  influx.wait_start_timer(1000);

    //check route: values 5,6,7,8,9 proceed with 10
    var list = ["Republic of Ireland", "Isle of Man or Channel Islands", "India", "Pakistan", "Poland"];

    for (var value in list) {
        cy.get('.text-container').contains(list[value]).click();
        func.save_cont();
        cy.contains('.text-container', 'In which year did you first arrive to live in the UK?');
        cy.get('.text-container').contains('Previous').click();
        cy.contains('.text-container', 'In which country were you born');
      }

    cy.get('.text-container').contains('Other').click();
    //cy.wait(2000);
    func.save_cont();

    cy.contains('.text-container', 'Please specify');
    cy.wait(1000);
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.Cry12Oth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.Cry12Oth"][role="textbox"]').type('Mongolia');
    func.save_cont();

    cy.contains('.text-container', 'In which year did you first arrive to live in the UK?');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrInPer"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrInPer"][role="textbox"]').type('2015');
    func.save_cont();

    cy.contains('.text-container', 'Apart from holidays and short visits abroad, have you lived in the UK continuously since');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What was your main reason for coming to the UK');
    cy.get('.text-container').contains('As a visitor').click();
    func.save_cont();

    cy.contains('.text-container', 'How would you describe your national identity?');
    cy.get('.text-container').contains('Scottish').click();
    func.save_cont();

    cy.contains('.text-container', 'What is your ethnic group?');
    cy.get('.text-container').contains('Other').click();
    func.save_cont();

    cy.contains('.text-container', 'Which one best describes your ethnic group or background?');
    cy.get('.text-container').contains('Any other background').click();
    //cy.wait(2000);
    func.save_cont();

    cy.contains('.text-container', 'Please specify');
    cy.get('[data-fieldname="QIndiv[1].QEthnic.EthAntOth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEthnic.EthAntOth"][role="textbox"]').type('Venusian');
    func.save_cont();

    cy.contains('.text-container', 'What is your religion?');
    cy.get('.text-container').contains('Hindu').click();
    func.save_cont();

    cy.contains('.text-container', 'Did you have a paid job, either as an employee or self-employed, in the week');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Did you have a second paid job or business?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'In your main job, are you an employee or self-employed?');
    cy.get('.text-container').contains('An employee').click();
    cy.wait(1000);
    cy.get('.text-container').contains('Full-time').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, are you an employee or self-employed?');
    cy.get('.text-container').contains('An employee').click();
    cy.wait(1000);
    cy.get('.text-container').contains('Part-time').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, who pays you?').then(() => {

      influx.stop_timer("IP13_Block02_" + type);
  });

  influx.wait_start_timer(1000);

    //check route: values 1,3,4 proceed with 5
    var list = ["My employer through PAYE", "An employment agency or umbrella company", "My clients or customers"];

    for (var value in list) {
        cy.get('.text-container').contains(list[value]).click();
        func.save_cont();
        cy.contains('.text-container', 'In your main job, who deals with your tax and National Insurance payments');
        cy.get('.text-container').contains('Previous').click();
        cy.contains('.text-container', 'In your main job, who pays you?');
      }

    cy.get('.text-container').contains('A company through an app').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, who deals with your tax and National Insurance payments');
    cy.get('.text-container').contains('I deal with my own tax and National Insurance').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, who sets the price for your goods or services?');
    cy.get('.text-container').contains('Another person or organisation does').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, how do you');
    cy.get('.text-container').contains('Someone else finds my work, such as an agency').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, do you need permission to have non-working days?');
    cy.get('.text-container').contains('Yes, someone has to approve it').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, who pays you?');

    //check route: values 1,3,4 proceed with 5
    var list = ["My employer through PAYE", "An employment agency or umbrella company", "My clients or customers"];

    for (var value in list) {
        cy.get('.text-container').contains(list[value]).click();
        func.save_cont();
        cy.contains('.text-container', 'In your second job, who deals with your tax and National Insurance payments');
        cy.get('.text-container').contains('Previous').click();
        cy.contains('.text-container', 'In your second job, who pays you?');
      }

    cy.get('.text-container').contains('A company through an app or online platform, such as Deliveroo').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, who deals with your tax and National Insurance payments');

    //check route: value 1 proceed with 2
    var list = ["I deal with my own tax and National Insurance"];

    for (var value in list) {
        cy.get('.text-container').contains(list[value]).click();
        func.save_cont();
        cy.contains('.text-container', 'In your second job, who sets the price for your goods or services?');
        cy.get('.text-container').contains('Previous').click();
        cy.contains('.text-container', 'In your second job, who deals with your tax and National Insurance payments');
      }

    cy.contains('.text-container', 'In your second job, who deals with your tax and National Insurance payments');
    cy.get('.text-container').contains('My accountant deals with my tax and National Insurance').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, who sets the price for your goods or services?');
    cy.get('.text-container').contains('Another person or organisation does').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, how do you');
    cy.get('.text-container').contains('I find my work myself').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, do you need permission to have non-working days?');
    cy.get('.text-container').contains('No, I can usually take non-working days without permission').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job where do you mainly work?');
    cy.get('.text-container').contains('From home').click();
    func.save_cont();

    cy.contains('.text-container', 'Do you have access to broadband internet at home?');


    func.yes_no("Yes");

    cy.contains('.text-container', 'Would it be possible for you to be able to work from home without access to broadband internet').then(() => {

      influx.stop_timer("IP13_Block03_" + type);
  });


};
if ( full == "Yes" || partial == "Finish") {

    influx.wait_start_timer(1000);

    func.yes_no("Yes");

    cy.contains('.text-container', 'On which of the following days did you do any work in your jobs or businesses?');
    cy.get('.text-container').contains('Monday').click();
    cy.get('.text-container').contains('Tuesday').click();
    cy.get('.text-container').contains('Wednesday').click();
    cy.get('.text-container').contains('Thursday').click();
    cy.get('.text-container').contains('Friday').click();
    cy.get('.text-container').contains('Saturday').click();
    cy.get('.text-container').contains('Sunday').click();
    func.save_cont();

    cy.contains('.text-container', 'Did you do any work from home in the week');
    func.yes_no("No");

    cy.contains('.text-container', 'Do you ever do work which you would consider as overtime');
    cy.get('.text-container').contains('I work paid overtime').click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, how many hours of paid overtime did you actually work in that week?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.POT1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.POT1"][role="textbox"]').type('10');

    cy.contains('.text-container', 'In your second job, how many hours of paid overtime did you actually work in that week?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.POT2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.POT2"][role="textbox"]').type('3');
    func.save_cont();

    cy.contains('.text-container', 'Not including your overtime, how many hours do you usually work a week in your main job or business?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr1"][role="textbox"]').type('37');

    cy.contains('.text-container', 'how many hours did you actually work in your main job, excluding overtime?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.Acthr1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.Acthr1"][role="textbox"]').type('50');
    func.save_cont();

    cy.contains('.text-container', 'Not including your overtime, how many hours do you usually work a week in your second job or business?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr2"][role="textbox"]').type('8');

    cy.contains('.text-container', 'how many hours did you actually work in your second job, excluding overtime?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.Acthr2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.Acthr2"][role="textbox"]').type('14');
    func.save_cont();

    cy.contains('.text-container', 'We calculate the total number of hours that you worked in your main and second jobs, including overtime, to be 77 hours for the week');
    cy.get('.text-container').contains('Yes').click();
    cy.wait(1000);
    func.save_cont();

    cy.contains('.text-container', 'Did you work more hours in that week for reasons related to the coronavirus (COVID-19) outbreak?');
    func.yes_no("No");

    cy.contains('.text-container', 'What is your full job title in your main job or business?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Carpet Fitter');
    func.save_cont();

    cy.contains('.text-container', 'What do you mainly do in your job');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Drive fancy cars and fly fighter aircraft');
    func.save_cont();

    cy.contains('.text-container', 'At your main job, what does the firm or organisation mainly make or do?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').type('Invent Cool Stuff');
    func.save_cont();

    cy.contains('.text-container', 'And was that in a private firm, business, limited company, or some other kind of organisation?');
    cy.get('.text-container').contains('Some other kind of organisation').click();
    func.save_cont();

    cy.contains('.text-container', 'What kind of organisation was it?').then(() => {

      influx.stop_timer("IP13_Block04_" + type);
    });

    influx.wait_start_timer(1000);

    cy.get('.text-container').contains('The armed forces').click();
    func.save_cont();

    cy.contains('.text-container', 'Have you changed roles in your job because of the coronavirus (COVID-19) pandemic?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'In your main job, when did you start working for your current employer?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').type('01');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').type('2020');
    func.save_cont();

    cy.contains('.text-container', 'Have you looked for a different or additional job for reasons related to the coronavirus (COVID-19) pandemic?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What is the main reason you have looked for a different job?');
    cy.get('.text-container').contains('Employer might go out of business').click();
    func.save_cont();

    cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');
    func.yes_no("No");

    cy.contains('.text-container', 'The next section is about the pay you get as an employee. ');
    func.save_cont();

    cy.contains('.text-container', 'These questions are about the pay from your main job. We will ask you about your second job after');
    cy.get('.text-container').contains('Annually').click();
    func.save_cont();

    //GrsExp
    cy.contains('.text-container', 'What is your annual pay before deductions?');
    cy.get('[data-fieldname="QIndiv[1].QEarnings.GrsExp"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEarnings.GrsExp"][role="textbox"]').type('65000');
    func.save_cont();

    //Defect LMS-927 fixed in V27.5
    //**DEFECT LMS-927: From GrsExp should be routed to SecGrs, but currently being routed to PTHRS** STILL here in v27
    //PTHRS
    // cy.contains('.text-container', 'Just to check, is £65000 the full-time pay for your job?');
    // cy.get('.text-container').contains('Yes, this is the full-time pay for my job').click();
    // func.save_cont();

    // //SecGrs
    cy.contains('.text-container', 'These questions are about the pay from your second job');
    cy.get('.text-container').contains('Annually').click();
    func.save_cont();

    cy.contains('.text-container', 'In your second job, what is your annual pay before deductions?');
    cy.get('[data-fieldname="QIndiv[1].QEarnings.SecGrsExp"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEarnings.SecGrsExp"][role="textbox"]').type('35000');
    func.save_cont();

    cy.contains('.text-container', 'Just to check, is £35000 the full-time pay for your second job?').then(() => {

      influx.stop_timer("IP13_Block05_" + type);
    });

    influx.wait_start_timer(1000);

    cy.get('.text-container').contains('Yes, this is the full-time pay for my job').click();
    func.save_cont();

    cy.contains('.text-container', 'Which city, town, village or London borough is your main workplace in?');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').type('Peterborough');//returns <tr><td>
    cy.wait(1000);
    cy.get('td').contains('Peterborough').should('be.visible');
    cy.get('td').contains('Peterborough').click();//table data
    cy.wait(1000);
    func.save_cont();
    //Defect where clicking on Peterborough just jumps straight to the next page
    //func.save_cont();

    //cy.wait(30000);

    cy.contains('.text-container', 'Are you currently enrolled on any formal education courses?');
    cy.get('[role="button"]').contains("No").click();
    cy.wait(1000);
    func.save_cont();

    cy.contains('.text-container', /In the week Monday [\w,\s]* were you personally receiving any of the following benefits/);
    cy.wait(1000);
    cy.get('[data-fieldname="QIndiv[1].QBenefits.TPBN20"]').should('be.visible');
    cy.get('[role="button"]').contains('Universal Credit').click();
    cy.wait(1000);
    cy.get('[role="button"]').contains('Other').click();
    cy.wait(1000);

    func.save_cont();

    cy.contains('.text-container', 'What other benefits are you receiving?').then(() => {

      influx.stop_timer("IP13_Block06_" + type);
    });

    influx.wait_start_timer(1000);

    cy.get('[data-fieldname="QIndiv[1].QBenefits.BenefitOth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QBenefits.BenefitOth"][role="textbox"]').type('Large Feet Allowance');
    func.save_cont();

    cy.contains('.text-container', 'What was the main reason you were receiving Universal Credit?');
    cy.get('.text-container').contains('Not working because you were sick, injured or disabled').click();
    func.save_cont();

    cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
    func.yes_no("No");

    cy.contains('.text-container', 'You have listed these people as living here now. Which of these people were living here on');
    cy.get('.text-container').contains('None of the above').click();
    func.save_cont();

    cy.contains('.text-container', 'Apart from the people already listed below, did anyone else live here on');
    func.yes_no("No");

    cy.contains('.text-container', 'Have you lived at your current address for three years or more?');
    func.yes_no("No");

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;

    cy.contains('.text-container', 'When did you move into your current address?');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].Month"][role="textbox"]').type(month);
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].Year"][role="textbox"]').type(year-1);
    func.save_cont();

    cy.contains('.text-container', 'Please enter the address you lived at before');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrNum"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrNum"][role="textbox"]').type('99');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrStreet"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrStreet"][role="textbox"]').type('Letsbe Avenue');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrTown"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrTown"][role="textbox"]').type('Shrewsbury');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrCounty"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrCounty"][role="textbox"]').type('Shropshire');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrPostcode"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].AddrPostcode"][role="textbox"]').type('SH6 6LA');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].Country"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[1].Country"][role="textbox"]').type('UK');
    func.save_cont();

    cy.contains('.text-container', 'When did you move into:');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].Month"][role="textbox"]').type(month);
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].Year"][role="textbox"]').type(year-2);
    func.save_cont();

    cy.contains('.text-container', 'Please enter the address you lived at before');

    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrNum"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrNum"][role="textbox"]').type('49');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrStreet"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrStreet"][role="textbox"]').type('Lonsdale Drive');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrTown"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrTown"][role="textbox"]').type('Titchfield');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrCounty"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrCounty"][role="textbox"]').type('Hampshire');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrPostcode"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].AddrPostcode"][role="textbox"]').type('PO6 6RT');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].Country"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[2].Country"][role="textbox"]').type('UK');
    func.save_cont();

    cy.contains('.text-container', 'When did you move into:');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].Month"][role="textbox"]').type(month);
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].Year"][role="textbox"]').type(year-3);
    func.save_cont();

    cy.contains('.text-container', 'Please enter the address you lived at before');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrNum"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrNum"][role="textbox"]').type('39');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrStreet"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrStreet"][role="textbox"]').type('West Drive');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrTown"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrTown"][role="textbox"]').type('Porstmouth');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrCounty"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrCounty"][role="textbox"]').type('Hampshire');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrPostcode"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].AddrPostcode"][role="textbox"]').type('PO5 6RT');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].Country"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QAddrHist.QAddress[3].Country"][role="textbox"]').type('UK');
    func.save_cont();

    cy.contains('.text-container', 'Thank you, you are almost done.').then(() => {

      influx.stop_timer("IP13_Block07_" + type);
    });

    influx.wait_start_timer(1000);
    cy.contains('.text-container', 'To receive your £10 e-voucher');
    cy.get('.text-container').contains('I do not want to receive an e-voucher').click();
    cy.wait(2000);
    func.save_cont();

    cy.contains('.text-container', 'If you are happy to be contacted by email to take part in future research, please provide your email address. ');
    cy.get('[data-fieldname="QOutro.Outro3a"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Outro3a"][role="textbox"]').type('superted@yahoo.com');
    func.save_cont();

    cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
    func.save_cont();

    cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked');
    cy.get('.text-container').contains('Very difficult').click();
    cy.wait(1000);
    cy.get('[role="button"]').contains('Submit').click();

    cy.contains('.text-container', 'Thank you, this study is now complete. You may close your browser.').then(() => {

      influx.stop_timer("IP13_Outtro_" + type);
    });
};
};
    export {ip13_online};
