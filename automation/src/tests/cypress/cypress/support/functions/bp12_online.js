import * as func from '../functions/functions';
import * as person1 from '../functions/lmb_en_person1';
function bp12_online(type = "Screen", full = "Yes", partial) {


if ( full == "Yes" || partial == "Start") {
  cy.contains('.text-container', 'Please enter your details');
    person1.lmb_en_person1(type);

    //Person 2 starts here
    cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
    cy.get('.text-container').contains('Start Survey').click();

    cy.contains('.text-container', 'Who will be answering questions for');
    cy.get('[data-fieldname="QIndiv[2].QPersProx.Rspndnt"][role="button"]').contains('Someone else').click();
    func.save_cont();

    cy.contains('.text-container', 'Does Teresa Jane Shipman currently live at any other addresses for part of the year?');
    func.yes_no("Yes");

    func.listerator([3, 4, 5, 6], "What type of property is Teresa Jane Shipman's other address?", "Is Teresa Jane Shipman currently away from")

    cy.get('.text-container').contains('A second home').click();
    func.save_cont();

    cy.contains('.text-container', "Is Teresa Jane Shipman currently away from");
    func.yes_no("No");

    cy.contains('.text-container', 'What is Teresa Jane Shipman\'s date of birth');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Day"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Day"][role="textbox"]').type('11');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Month"][role="textbox"]').type('11');

    cy.get('[data-fieldname="QIndiv[2].QDoB.Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Year"][role="textbox"]').type('1983');
    func.save_cont();


    cy.contains('.text-container', 'What is Teresa Jane Shipman\'s legal marital status');
    cy.get('.text-container').contains('Divorced').click();
    func.save_cont();

    cy.contains('.text-container', 'What is Teresa Jane Shipman\'s nationality');
    cy.get('.text-container').contains('British').click();
    func.save_cont();

    // cy.contains('.text-container', 'In which country was Teresa Jane Shipman born');

    //check route: values 5,6,7,8,9 proceed with 10
    func.listerator([5,6,7,8,9],
                    'In which country was Teresa Jane Shipman born', 'In which year did Teresa Jane Shipman first arrive to live in the UK?')



    cy.get('.text-container').contains('Other').click();
    func.save_cont();

    cy.contains('.text-container', 'Please specify');
    cy.get('[data-fieldname="QIndiv[2].QCntryBrth.Cry12Oth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QCntryBrth.Cry12Oth"][role="textbox"]').type('Mongolia');
    func.save_cont();

    //CAMEYR2
    cy.contains('.text-container', 'In which year did Teresa Jane Shipman first arrive to live in the UK?');
    cy.get('[data-fieldname="QIndiv[2].QCntryBrth.CameYrProxy"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QCntryBrth.CameYrProxy"][role="textbox"]').type('2015');
    func.save_cont();

    //CONTUK
    cy.contains('.text-container', 'Apart from holidays and short visits abroad, has Teresa Jane Shipman lived in the UK continuously since');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What was Teresa Jane Shipman\'s main reason for coming to the UK in ');
    cy.get('.text-container').contains('Seeking asylum').click();
    func.save_cont();

    cy.contains('.text-container', 'How would Teresa Jane Shipman describe their national identity?');
    cy.get('.text-container').contains('Scottish').click();
    func.save_cont();


    cy.contains('.text-container', "What is Teresa Jane Shipman's ethnic group?");
    cy.get('.text-container').contains('Caribbean or Black').click();
    func.save_cont();


    func.listerator([1,2],"Which one best describes Teresa Jane Shipman's Black, African, Caribbean or Black British ethnic group or background?",
                     "What is Teresa Jane Shipman's religion?")




    cy.get('.text-container').contains('Any other Black, African or Caribbean background').click();
    func.save_cont();
    cy.contains('.text-container', 'Please specify');
    cy.get('[data-fieldname="QIndiv[2].QEthnic.EthBlkOth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEthnic.EthBlkOth"][role="textbox"]').type('African');
    func.save_cont();

    cy.contains('.text-container', "What is Teresa Jane Shipman's religion?");

    func.listerator([1, 2, 3, 4, 5, 6, 7],"What is Teresa Jane Shipman's religion?",
                    'What current passports')


    cy.get('.text-container').contains('Other religion').click();
    func.save_cont();

    cy.contains('.text-container', 'Please specify');
    cy.get('[data-fieldname="QIndiv[2].QReligion.ReligOth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QReligion.ReligOth"][role="textbox"]').type('Jedi');
    func.save_cont();

    cy.contains('.text-container', 'What current passports');
    cy.get('.text-container').contains('None').click();
    func.save_cont();

    cy.contains('.text-container', 'What expired passports');
    cy.get('.text-container').contains('None').click();
    func.save_cont();

    //PAIDJOB
    cy.contains('.text-container', 'Did Teresa Jane Shipman have a paid job, either as an employee or self-employed, in the week');
    func.yes_no("Yes");

    //SECJOB
    cy.contains('.text-container', 'Did Teresa Jane Shipman have a second paid job or business?');
    func.yes_no("No");


    cy.contains('.text-container', 'Is Teresa Jane Shipman an employee or self-employed?');
    cy.get('.text-container').contains('An employee').click();
    cy.get('.text-container').contains('Full-time').click();
    func.save_cont();

    //cy.contains('.text-container', 'In their job, who pays Teresa Jane Shipman?');

    func.listerator([1, 3, 4, 5],"Who pays Teresa Jane Shipman?",
    'Who deals with Teresa Jane Shipman\'s tax or National Insurance?')

    var list = ['employer through PAYE', 'employment agency or umbrella company',
                'clients or customers', 'A company through an app or online platform, such as Deliveroo'];

    // for (var value in list) {
    //     cy.get('.text-container').contains(list[value]).click();
    //     func.save_cont();
    //     cy.contains('.text-container', 'In their main job, who deals with Teresa Jane Shipman\'s tax and National Insurance payments?');
    //     cy.get('.text-container').contains('Previous').click();
    //     cy.contains('.text-container', "In their main job, who pays Teresa Jane Shipman?");
    //   }

    cy.get('.text-container').contains('A company through an app or online platform, such as Deliveroo').click();
    func.save_cont();

    cy.contains('.text-container', 'Who deals with Teresa Jane Shipman\'s tax or National Insurance?');
    cy.get('.text-container').contains('deals with their own').click();
    func.save_cont();

  }
  if ( full == "Yes" || partial == "Finish") {


    cy.contains('.text-container', 'Who sets the price for Teresa Jane Shipman\'s goods or services?');
    cy.get('.text-container').contains('Another person or organisation does').click();
    func.save_cont();

    cy.contains('.text-container', ' find their work?');
    cy.get('.text-container').contains('Someone else finds Teresa Jane Shipman\'s work, such as an agency').click();
    func.save_cont();

    cy.contains('.text-container', 'Does Teresa Jane Shipman need permission to have non-working days?');
    func.yes_no("Any");

    // //TempJob18
    // cy.contains('.text-container', 'Is Teresa Jane Shipman\'s main job permanent, temporary or casual?');
    // cy.get('.text-container').contains('Temporary').click();
    // func.save_cont();

    // //JobTyp18
    // cy.contains('.text-container', 'In which way was Teresa Jane Shipman\'s job temporary?');
    // cy.get('.text-container').contains('A job that included training').click();
    // func.save_cont();

    // // WhyTemp18
    // cy.contains('.text-container', 'What was the main reason Teresa Jane Shipman took a temporary job rather than a permanent one?');
    // cy.get('.text-container').contains('Could not find a permanent job').click();
    // func.save_cont();


    // cy.contains('.text-container', 'In their main job, does Teresa Jane Shipman have a contract with their employer?');
    // func.yes_no("No");

    // cy.contains('.text-container', 'Is there an agreed minimum number of hours that they are supposed to work each week?');
    // func.yes_no("Any");


    // cy.contains('.text-container', 'In their second job, who pays Teresa Jane Shipman?');

    // var list = ['employer through PAYE', 'employment agency or umbrella company',
    //             'clients or customers', 'A company through an app, such as Deliveroo'];



    // HOME
    cy.contains('.text-container', 'Where do they mainly work?');
    cy.get('.text-container').contains('In a different location from their home').click();
    func.save_cont();

    // HOMEEV
    cy.contains('.text-container', 'Do they ever do any paid or unpaid work at home for their job?');
    func.yes_no("Any");

    // BroadbandA
    cy.contains('.text-container', 'Does Teresa Jane Shipman have access to broadband internet at home?');
    func.yes_no("Any");

    //BroadbandB
    cy.contains('.text-container', 'Would it be possible for Teresa Jane Shipman to be able to work from home without access to broadband internet?');
    func.yes_no("Any");

    // WHCDAYS18
    cy.contains('.text-container', 'On which of the following days did Teresa Jane Shipman do any work in their job or business?');
    cy.get('.text-container').contains('Monday').click();
    cy.get('.text-container').contains('Tuesday').click();
    cy.get('.text-container').contains('Wednesday').click();
    cy.get('.text-container').contains('Thursday').click();
    cy.get('.text-container').contains('Friday').click();
    cy.get('.text-container').contains('Saturday').click();
    cy.get('.text-container').contains('Sunday').click();
    func.save_cont();



    // OUTWORK
    cy.contains('.text-container', 'Did they do any work outside of the home in the week');
    func.yes_no("Yes");

    // HOMEREF
    cy.contains('.text-container', 'Did Teresa Jane Shipman do any work from home in the week ');
    func.yes_no("Yes");

    // EVEROT
    //outward routing incorrect for options 1,2,3 and 5 in the questionnaire. Going to REDANY incorrectly
    cy.contains('.text-container', 'Does Teresa Jane Shipman ever do work which they would consider as overtime?');
    cy.get('.text-container').contains('works paid overtime').click();
    func.save_cont();


    //POT
    cy.contains('.text-container', 'How many hours of paid overtime did Teresa Jane Shipman actually work in that week?');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.POT_Hours"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.POT_Hours"][role="textbox"]').type('10');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.POT_Mins"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.POT_Mins"][role="textbox"]').type('0');
    func.save_cont();

    cy.contains('.text-container', 'Many jobs or businesses have usual hours. Not including their overtime, how many hours does Teresa Jane Shipman usually work a week in their job or business?');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.UsHr_Hours"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.UsHr_Hours"][role="textbox"]').type('35');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.UsHr_Mins"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.UsHr_Mins"][role="textbox"]').type('0');
    //func.save_cont();

    cy.contains('.text-container', 'how many hours did Teresa Jane Shipman actually work, excluding overtime?');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ActHr_Hours"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ActHr_Hours"][role="textbox"]').type('35');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ActHr_Mins"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ActHr_Mins"][role="textbox"]').type('35');
    func.save_cont();

    //TOTAC2
    cy.contains('.text-container', 'We calculate the total number of hours that Teresa Jane Shipman worked in their job, including overtime, to be 45 hours 35 minutes for the week');
    cy.get('.text-container').contains('Yes').click();
    cy.wait(1000);
    func.save_cont();


    // // HERE
    // // SOC_2020_Pt1
    cy.contains('.text-container', 'What is Teresa Jane Shipman\'s full job title in their main job or business?');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Carpenter');
    func.save_cont();

    // // SOC_2020_Pt2
    cy.contains('.text-container', 'What does Teresa Jane Shipman mainly do in that job or business?');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Make furniture');
    func.save_cont();


    // // SOC2020SEMP
    cy.contains('.text-container', "At Teresa Jane Shipman's main job, what does the firm or organisation mainly make or do?");
    cy.get('[data-fieldname="QIndiv[2].QEmploy.SIC_2020_Emp"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.SIC_2020_Emp"][role="textbox"]').type('Make the best furniture money can buy. Hamilton antiques - call us on +44777777777');
    func.save_cont();

    // // SECTOR
    cy.contains('.text-container', 'And was that in a private firm, business, limited company, or some other kind of organisation?');
    cy.get('.text-container').contains('A private firm, business or limited company').click();
    func.save_cont();


    // //JbRoleChg
    // cy.contains('.text-container', 'Have they changed roles in their job because of the coronavirus (COVID-19) pandemic?');
    // func.yes_no("Any");
    var d = new Date();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    // CONMPY
    cy.contains('.text-container', 'When did Teresa Jane Shipman start working for their current employer?');
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ConMon1"][role="textbox"]').clear();
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ConMon1"][role="textbox"]').type(month);
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ConMPY"][role="textbox"]').clear();
    cy.get('[data-fieldname="QIndiv[2].QEmploy.ConMPY"][role="textbox"]').type(year);
    func.save_cont();

    // REDPAID
    cy.contains('.text-container', 'Has Teresa Jane Shipman left any paid jobs in the last three months?');
    func.yes_no("Yes");

    // REDYL18
    func.listerator([1, 2], 'Why did Teresa Jane Shipman leave their last paid job?',
                    'You said that Teresa Jane Shipman was made redundant, took voluntary redundancy or was dismissed. Was this mainly due to health reasons?');

    cy.get('.text-container').contains('Voluntary redundancy').click();
    func.save_cont();

    // HTHDIS
    cy.contains('.text-container', 'You said that Teresa Jane Shipman was made redundant, took voluntary redundancy or was dismissed. Was this mainly due to health reasons?');
    func.yes_no("Any");

    // REDANY
    cy.contains('.text-container', 'Has Teresa Jane Shipman been made redundant from any other jobs in the last 3 months?');
    func.yes_no("No");


    // cy.contains('.text-container', 'Which way would you like to tell us about your pay before deductions? ');
    // cy.get('.text-container').contains('Monthly').click();
    // func.save_cont();

    // cy.contains('.text-container', 'What is your monthly pay before deductions');
    // cy.get('[data-fieldname="QIndiv[2].QEarnings.GrsExp"][role="textbox"]').type('5000');
    // func.save_cont();

    // cy.contains('.text-container', 'full-time pay for your job');
    // cy.get('.text-container').contains('Yes').click();
    // func.save_cont();

    // cy.contains('.text-container', 'These questions are about the pay from your second job. ');
    // cy.get('.text-container').contains('Weekly').click();
    // func.save_cont();

    // cy.contains('.text-container', 'what is your weekly pay before deductions');
    // cy.get('[data-fieldname="QIndiv[2].QEarnings.SecGrsExp"][role="textbox"]').clear();
    // cy.get('[data-fieldname="QIndiv[2].QEarnings.SecGrsExp"][role="textbox"]').type('300');
    // func.save_cont();

    // cy.contains('.text-container', 'full-time pay for your second job');
    // cy.get('.text-container').contains('Yes').click();
    // func.save_cont();

    // WKLPL99
    cy.contains('.text-container', 'Which city, town, village or London borough is Teresa Jane Shipman\'s main workplace in?');
    cy.get('[data-fieldname="QIndiv[2].QTravToWork.WkPl99"][type="text"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QTravToWork.WkPl99"][type="text"]').type('Peterborough');//returns <tr><td>
    cy.wait(1000);
    cy.get('td').contains('Peterborough').should('be.visible');
    cy.get('td').contains('Peterborough').click();//table data
    cy.wait(1000);
    func.save_cont();

    //TRVTIME
    cy.contains('.text-container', 'How long in total does it usually take Teresa Jane Shipman to travel from home to work?');
    cy.get('[data-fieldname="QIndiv[2].QTravToWork.TrvTme"][type="text"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QTravToWork.TrvTme"][type="text"]').type('15');
    func.save_cont();


    // TRVMTH - Not sure
    cy.contains('.text-container', "How does Teresa Jane Shipman usually travel to work?");
    cy.get('.text-container').contains('Car, van, minibus or works van').click();
    func.save_cont();

    // TRVDRV
    cy.contains('.text-container', 'How does Teresa Jane Shipman travel?');
    cy.get('.text-container').contains('Sometimes as a passenger and sometimes as a driver').click();
    func.save_cont();


    // ACTWKDY
    cy.contains('.text-container', 'on which days was Teresa Jane Shipman scheduled to work?');
    cy.wait(1000)
    cy.get('[role="button"]').contains('Monday').click();
    cy.get('[role="button"]').contains('Tuesday').click();
    cy.get('[role="button"]').contains('Wednesday').click();
    cy.get('[role="button"]').contains('Thursday').click();
    cy.get('[role="button"]').contains('Friday').click();
    cy.get('[role="button"]').contains('Save and continue').click();


      // ILLWK
      cy.contains('.text-container', 'In that week, did Teresa Jane Shipman have any days off work because they were sick or injured?');
      func.yes_no("Yes");

    // ILLDAYS
    cy.contains('.text-container', 'Which days did Teresa Jane Shipman have off work because they were sick or injured?');
    cy.get('.text-container').contains('Monday').click();
    func.save_cont();

    // ILL1PD
    cy.contains('.text-container', 'how many periods of sickness absence from work did Teresa Jane Shipman have?');
    cy.get('.text-container').contains('One').click();
    func.save_cont();

    // IL1BEF
    cy.contains('.text-container', 'When did this period of sickness absence start?');
    cy.get('.text-container').contains('Before the first day worked').click();
    func.save_cont();


    // IL1NE20
    cy.contains('.text-container', 'What was the main condition that caused Teresa Jane Shipman to take this sickness absence?');
    cy.get('.text-container').contains('Minor illnesses').click();
    func.save_cont();

    // ILLST17
    func.listerator([1, 2, 3, 4, 5, 6, 7 ], 'did the sickness absence begin',
                    'In the last 12 months, has Teresa Jane Shipman had a period of being off sick from their job or self-employment for 4 weeks in a row or longer?');


    cy.get('.text-container').contains('At least two weeks but less than four weeks').click();
    func.save_cont();


    // EMPSICK4
    cy.contains('.text-container', 'In the last 12 months, has Teresa Jane Shipman had a period of being off sick from their job or self-employment for 4 weeks in a row or longer?');
    func.yes_no("Yes");

    // WKSK4
    cy.contains('.text-container', 'In total, how many different periods of 4 weeks or longer has Teresa Jane Shipman had off sick from work in the last 12 months?');
    cy.get('[data-fieldname="QIndiv[2].QSickness.WKSK4"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QSickness.WKSK4"][role="textbox"]').type('1');
    func.save_cont();

    // ABSWK
    cy.contains('.text-container', 'How long was this absence from work?');
    cy.get('.text-container').contains('At least six weeks but less than two months').click();
    func.save_cont();

    // ILNE20M
    cy.contains('.text-container', 'What was the main condition that caused Teresa Jane Shipman to take the longest sickness absence?');
    cy.get('.text-container').contains('Other musculoskeletal problems').click();
    func.save_cont();

    // ILNE12SE
    cy.contains('.text-container', 'At the time of their longest sickness absence, in Teresa Jane Shipman\'s main job were they absent from employment or self-employment?');
    cy.get('.text-container').contains('Employment').click();
    func.save_cont();

    // HWRET12E
    cy.contains('.text-container', 'Following this period of sickness absence what did Teresa Jane Shipman do?');
    cy.get('.text-container').contains('Returned to work for a different employer').click();
    func.save_cont();

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
    cy.contains('.text-container', 'was Teresa Jane Shipman personally receiving any of the following benefits?');
    cy.get('.text-container').contains('Job seeker\’s allowance (including National Insurance Credits)').click();
    func.save_cont();

    // JSATYP
    cy.contains('.text-container', 'What type of Job Seeker’s Allowance or Universal Credit was this?');
    cy.get('.text-container').contains('Contributory JSA').click();
    func.save_cont();

    // SMOYArea
    cy.contains('.text-container', 'When Teresa Jane Shipman was 14 years old, in which city, town or village were they living?');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYAreaProx"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYAreaProx"][role="textbox"]').type('Banstead');
    func.save_cont();

    // SMOYCty
    cy.contains('.text-container', 'Which county or borough is that in?');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYCty"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYCty"][role="textbox"]').type('Surrey');
    func.save_cont();

    // SMHCOMP
    cy.contains('.text-container', 'When Teresa Jane Shipman was 14 years old, who did they live with?');
    cy.get('.text-container').contains('One or both parents').click();
    func.save_cont();

    // SMEARNER
    cy.contains('.text-container', 'Who was the main wage earner in Teresa Jane Shipman\'s house at that time?');
    cy.get('.text-container').contains('Mother').click();
    func.save_cont();

    // SMOCCT
    cy.contains('.text-container', 'What was their main job at that time?');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOccT"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOccT"][role="textbox"]').type('Dustman');
    func.save_cont();

    // SMOCCT
    cy.contains('.text-container', 'What did they mainly do in that job?');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOccD"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOccD"][role="textbox"]').type('Sit around collecting dust');
    func.save_cont();

    // SMEARNER
    cy.contains('.text-container', 'Were they an employee or self-employed');
    cy.get('.text-container').contains('An employee').click();
    func.save_cont();

    cy.contains('.text-container', 'Does Teresa Jane Shipman have any physical or mental health conditions or illnesses?');
    func.yes_no("Yes");

    // QHEALTH1
    // cy.contains('.text-container', 'How is your health in general?');
    // cy.get('.text-container').contains('Fair').click();
    // func.save_cont();

    // //SATIS
    // cy.contains('.text-container', 'Overall, how satisfied are you with your life nowadays, where 0 is');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Satis"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Satis"][role="textbox"]').type('5');
    // func.save_cont();

    // //WORTH
    // cy.contains('.text-container', 'Overall, to what extent do you feel that the things you do in your life are worthwhile, where 0 is');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Worth"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Worth"][role="textbox"]').type('4');
    // func.save_cont();

    // //HAPPY
    // cy.contains('.text-container', 'Overall, how happy did you feel yesterday, where 0 is');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Happy"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Happy"][role="textbox"]').type('6');
    // func.save_cont();

    // //ANXIOUS
    // cy.contains('.text-container', 'overall, how anxious did you feel yesterday?');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Anxious"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QHealth.Anxious"][role="textbox"]').type('7');
    // func.save_cont();

    // //LNGLIST
    // cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
    // cy.get('[role="button"]').contains('No').click();
    // func.save_cont();

    //LNGLIST12
    cy.contains('.text-container', 'Has this lasted, or is it expected to last, for 12 months or more?');
    func.yes_no("Yes");

    // LIMACT
    cy.contains('.text-container', "Do any of Teresa Jane Shipman's illnesses or conditions reduce their ability to carry out day to day activities?");
    cy.get('.text-container').contains('Yes, a lot').click();
    func.save_cont();

   //LIMITK
   cy.contains('.text-container', 'Does this health problem affect the kind of paid work that Teresa Jane Shipman might do?');
   func.yes_no("Any");

   //LIMITA
   cy.contains('.text-container', 'Does this health problem affect the amount of paid work that Teresa Jane Shipman might do?');
   func.yes_no("Any");

    // HEAL20
    cy.contains('.text-container', 'Does Teresa Jane Shipman have any of the following?');
    cy.get('.text-container').contains('Severe or specific learning difficulties').click();
    func.save_cont();

    // LERND
    cy.contains('.text-container', 'Is this a learning difficulty or a learning disability?');
    cy.get('.text-container').contains('A learning disability').click();
    func.save_cont();

    // REDACT
    cy.contains('.text-container', 'For how long has Teresa Jane Shipman\'s ability to carry out day-to-day activities been reduced?');
    cy.get('.text-container').contains('Less than 6 months').click();
    func.save_cont();

    // HEALYR
    cy.contains('.text-container', 'Has Teresa Jane Shipman ever had any other health problems or disabilities that have lasted for longer than one year?');
    func.yes_no("Yes");

    // HEALPB
    cy.contains('.text-container', 'What were those health problems or disabilities?');
    cy.get('.text-container').contains('Diabetes').click();
    func.save_cont();

    // ACCDNT
    cy.contains('.text-container', 'has Teresa Jane Shipman had any accident resulting in injury at work or in the course of their work?');
    func.yes_no("Yes");

    // ROAD
    cy.contains('.text-container', 'Was that most recent injury caused by a road accident?');
    func.yes_no("Yes");


    cy.contains('.text-container', 'Which job was Teresa Jane Shipman doing when they were injured?');
    cy.get('.text-container').contains('Some other job').click();
    func.save_cont();

    cy.contains('.text-container', 'How soon was Teresa Jane Shipman able to start working again after the accident?');

    cy.get('.text-container').contains("On the fifth day or longer after the accident").click();
    func.save_cont();

    cy.contains('.text-container', 'How many days after the accident did Teresa Jane Shipman go back to work?');
    cy.get('[data-fieldname="QIndiv[2].QAccidAtWork.TimeDays"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QAccidAtWork.TimeDays"][role="textbox"]').type('10');
    func.save_cont();

    //carrying on with scrip using V27.3


    cy.contains('.text-container', 'How would you describe the injury Teresa Jane Shipman received?');
  //check route: all values proceed with one of them
    var list = ["Amputation", "Dislocation of a joint", "Strain or sprain", "Superficial",
                "Laceration or open wounds", "Temporary or permanent loss of sight",
                "Chemical or hot metal burn to the eyeball, or any penetrating injury to the eyeball", "Burn or scald",
                "Lack of oxygen (asphyxia) or poisoning", "Another type of injury",
                "Multiple injuries where no one injury was obviously more severe"];

    for (var value in list) {
      cy.get('.text-container').contains(list[value]).click();
      func.save_cont();
      cy.contains('.text-container', 'Still thinking of that accident, did any of the following happen to Teresa Jane Shipman?');
      cy.get('.text-container').contains('Previous').click();
      cy.contains('.text-container', 'How would you describe the injury Teresa Jane Shipman received?');
      }

      cy.get('.text-container').contains("Another type of injury").click();
      func.save_cont();

    //SITEFR
    // cy.contains('.text-container', 'Which bones did you fracture or break?');
    // cy.get('.text-container').contains('Toes').click();
    // func.save_cont();




    // ACCURH
    cy.contains('.text-container', 'Still thinking of that accident, did any of the following happen to Teresa Jane Shipman?');
    cy.get('.text-container').contains('Lost consciousness, even if just briefly').click();
    cy.get('.text-container').contains('Stayed in hospital for more than 24 hours').click();
    func.save_cont();



    // ACCKIND
    cy.contains('.text-container', 'Which of the following best describes how the accident happened?');
    cy.get('.text-container').contains('Hit something fixed or stationary').click();
    func.save_cont();


    //ILLWRK1
    cy.contains('.text-container', 'Apart from this accident, within the last 12 months has Teresa Jane Shipman suffered from any other physical or mental health conditions or illnesses that were caused or made worse by their work?');
    func.yes_no("No");

    // cy.contains('.text-container', 'How many illnesses have you had in the last 12 months that have been caused or been made worse by your work?');
    // cy.get('[data-fieldname="QIndiv[2].QWorkRelatedIll.NUMILL"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QWorkRelatedIll.NUMILL"][role="textbox"]').type('1');
    // func.save_cont();

    // cy.contains('.text-container', 'How would you describe the most serious of these illnesses?');
    // cy.get('.text-container').contains('A breathing or lung problem').click();
    // func.save_cont();

    // cy.contains('.text-container', 'When were you first aware of this illness?');
    // cy.get('.text-container').contains('Within the last 12 months').click();
    // func.save_cont();

    // cy.contains('.text-container', 'In the last 12 months, how much time off work have you had because of this illness?');
    // cy.get('.text-container').contains('No time off work').click();
    // func.save_cont();

    // cy.contains('.text-container', 'Which job caused or made your illness worse?');
    // cy.get('.text-container').contains('Main job').click();
    // func.save_cont();

    cy.contains('.text-container', 'Has Teresa Jane Shipman ever smoked cigarettes regularly?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Does Teresa Jane Shipman smoke cigarettes, even if occasionally?');
    func.yes_no("No");

    cy.contains('.text-container', 'Has Teresa Jane Shipman lived at their current address for three years or more?');
    func.yes_no("Yes");



    cy.contains('.text-container', 'Thank you, you are almost done.');
    cy.contains('.text-container', 'To receive your £10 e-voucher');
    cy.get('.text-container').contains('I do not want to receive an e-voucher').click();
    cy.wait(2000);
    func.save_cont();

    cy.contains('.text-container', 'If you are happy to be contacted by email to take part in future research, please provide your email address.');
    // cy.get('[data-fieldname="QOutro.Outro3a"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QOutro.Outro3a"][role="textbox"]').type('superted@yahoo.com');
    func.save_cont();

    cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
    cy.get('[data-fieldname="QOutro.Outro3b" ][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Outro3b"][role="textbox"]').type('01234567890');
    func.save_cont();

    cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked');
    cy.get('.text-container').contains('Very difficult').click();
    cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').type('Thankyou for watching');
    cy.get('.text-container').contains('Submit').click();

    cy.contains('.text-container', 'Thank you, this study is now complete. You may close your browser.');

  };
};


export {bp12_online}
//-------------------------------------------------------------------------------------------------------------------
