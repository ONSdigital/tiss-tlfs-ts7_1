import * as func from '../functions/functions';
import * as influx from '../functions/write_influx';
function hh1_online(type = "Screen", full = "Yes", partial) {

    cy.log(partial)



    if ( full == "Yes" || partial == "Start") {
        // influx.wait_start_timer(1000);
        influx.wait_start_timer(1000);

        cy.get('[role="button"]').contains('Save and continue').click();

        cy.contains('.text-container', 'Please enter your details').then(() => {

            influx.stop_timer("HH1_GetNewSurvey_" + type);
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
        func.yes_no("Yes")

        cy.contains('.text-container','Does anyone else live at');
        func.yes_no("Yes")

        cy.contains('.text-container','Who do you need to add to');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[2].FstNme"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[2].FstNme"][role="textbox"]').type('Stacey');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[2].MidNme"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[2].MidNme"][role="textbox"]').type('Gwen');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[2].SurNme"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[2].SurNme"][role="textbox"]').type('Shipman');

        cy.get('.text-container').contains('Female').click();
        func.save_cont();

        cy.contains('.text-container', 'This person is my…');
        cy.get('.text-container').contains('Partner').click();
        func.save_cont();

        cy.contains('.text-container','Does anyone else live at');
        func.yes_no("No")

        cy.contains('.text-container', 'Is that everyone');
        func.yes_no("Yes")

        cy.contains('.text-container', 'Do any of these people currently live in a student halls of residence for part of the year');
        cy.get('.text-container').contains('None of these people live in a student halls of residence').click();
        func.save_cont();

        cy.contains('.text-container', 'Do all of these people share cooking facilities?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'And do they all share a living room or dining room?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'In whose name, or names, is this accommodation rented');
        cy.get('.text-container').contains('Gavin Michael Shipman').click();
        cy.get('.text-container').contains('Stacey Gwen Shipman').click();
        func.save_cont();


        cy.contains('.text-container', 'How do the following people own or rent').then(() => {

        influx.stop_timer("HH1_Block01_" + type);
        });

        influx.wait_start_timer(1000);

        cy.get('.text-container').contains('Own it outright').click();
        func.save_cont();

        if (type == "Mobile"){

        cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
        cy.get('a[role="button"][id^=va_]').within(() => {
        cy.get('div[class="text-container no-auto word-break"]').eq(0).click();//find by index, 'Start Study' only found one element
        })
        }
        else
        {
            cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
            cy.get('a[role="button"][id^=ta_]').within(() => {
            cy.get('div[class="text-container no-auto word-break"]').eq(0).click();//find by index, 'Start Study' only found one element
            })
        }

    //the function here only ever sees the "top" Start Study so can actually just use this if sequential
    //cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
    //cy.get('.text-container').contains('Start Study').click();

        cy.contains('.text-container', 'Who will be answering questions for').then(() => {

            influx.stop_timer("HH1_StartStudy1_" + type);
        });

        influx.wait_start_timer(1000);
        cy.get('[data-fieldname="QIndiv[1].QPersProx.Rspndnt"][role="button"]').contains('Gavin Michael Shipman').click();
        func.save_cont();

        cy.contains('.text-container', 'Do you currently live at any other addresses for part of the year?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'What type of property is your other address?');
        cy.get('.text-container').contains('A family or parental home').click();
        func.save_cont();

        cy.contains('.text-container', 'for a continuous period of 6 months or more');
        func.yes_no("No")

        cy.contains('.text-container', 'What is your date of birth');
        cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').type('01');
        cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').type('01');
        cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').type('1980');
        func.save_cont();


        cy.contains('.text-container', 'What is your legal marital status');
        cy.get('.text-container').contains('Married').click();
        func.save_cont();

        cy.contains('.text-container', 'What is your nationality');
        cy.get('.text-container').contains('British').click();
        func.save_cont();

        cy.contains('.text-container', 'In which country were you born');
        cy.get('.text-container').contains('England').click();
        func.save_cont();

        cy.contains('.text-container', 'How would you describe your national identity?');
        cy.get('.text-container').contains('English').click();
        func.save_cont();

        cy.contains('.text-container', 'What is your ethnic group?');
        cy.get('.text-container').contains('White').click();
        func.save_cont();

        cy.contains('.text-container', 'Which one best describes your White ethnic group or background?');
        cy.get('.text-container').contains('Welsh, English, Scottish, Northern Irish or British').click();
        func.save_cont();

        cy.contains('.text-container', 'What is your religion?');
        cy.get('.text-container').contains('No religion').click();
        func.save_cont();

        cy.contains('.text-container', 'Can you understand, speak, read or write Welsh?').then(() => {

            influx.stop_timer("HH1_Block02_" + type);
        });


        cy.get('.text-container').contains('None of these apply').click();
        func.save_cont();

        cy.contains('.text-container', 'What current passports do you hold?');
        cy.get('.text-container').contains('None').click();
        func.save_cont();

        cy.contains('.text-container', 'What expired passports');
        cy.get('.text-container').contains('None').click();
        func.save_cont();

        cy.task('log', 'HH1: Employment...');

        cy.contains('.text-container', 'Did you have a paid job, either as an employee or self-employed, in the week');
        func.yes_no("Yes")

        cy.contains('.text-container', 'Did you have a second paid job or business');
        func.yes_no("No")

        cy.contains('.text-container', 'Are you an employee or self-employed');
        cy.get('.text-container').contains('An employee').click();
        cy.wait(1000);
        cy.get('.text-container').contains('Full-time').click();
        func.save_cont();

        cy.contains('.text-container', 'Who pays you');
        cy.get('.text-container').contains('My employer through PAYE').click();
        func.save_cont();

        cy.contains('.text-container', 'Who deals with your tax or National Insurance?');
        cy.get('.text-container').contains('My tax or National Insurance is taken from my pay before I am paid').click();
        func.save_cont();

        cy.contains('.text-container', 'Is your main job permanent, temporary or casual?');
        cy.get('.text-container').contains('Permanent').click();
        func.save_cont();

        cy.contains('.text-container', 'In your job, do you have a contract with your employer?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'In your main job, do you have a zero-hour contract?');
        func.yes_no("No")
        cy.contains('.text-container', 'Is the total duration of your contract for 3 months or less?');
        func.yes_no("No")

        cy.contains('.text-container', 'Where do you mainly work?');
        cy.get('.text-container').contains('In a different location from my home').click();
        func.save_cont();

        cy.contains('.text-container', 'Do you ever do any paid or unpaid work at home for your job?').then(() => {

            influx.stop_timer("HH1_Block03_" + type);
        });

        influx.wait_start_timer(1000);

        func.yes_no("Yes")

        cy.contains('.text-container', 'Do you have access to broadband internet at home?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'Would it be possible for you to be able to work from home without access to broadband internet?');
        func.yes_no("No")

        cy.contains('.text-container', 'On which of the following days did you do any work in your job or business?');
        cy.get('.text-container').contains('Monday').click();
        cy.get('.text-container').contains('Tuesday').click();
        cy.get('.text-container').contains('Wednesday').click();
        cy.get('.text-container').contains('Thursday').click();
        cy.get('.text-container').contains('Friday').click();
        func.save_cont();

        cy.contains('.text-container', 'Did you do any work outside of your home in the week');
        func.yes_no("Yes")

        cy.contains('.text-container', 'Did you do any work from home in the week');
        func.yes_no("No")

        cy.contains('.text-container', 'Do you ever do work which you would consider as overtime');
        cy.get('.text-container').contains('I work unpaid overtime').click();
        func.save_cont();

        cy.contains('.text-container', 'How many hours of unpaid overtime did you actually work in that week?');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.UpOT_Hours"][role="textbox"]').clear().type('4');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.UpOT_Mins"][role="textbox"]').clear().type('0');
        func.save_cont();

        cy.contains('.text-container', 'Many jobs or businesses have usual hours. Not including your overtime, how many hours do you usually work a week in your job or business?');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr_Hours"][role="textbox"]').clear().type('38');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr_Mins"][role="textbox"]').clear().type('0');
        //func.save_cont();

        cy.contains('.text-container', 'how many hours did you actually work, excluding overtime?');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.ActHr_Hours"][role="textbox"]').clear().type('38');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.ActHr_Mins"][role="textbox"]').clear().type('0');
        func.save_cont();

        cy.contains('.text-container', /We calculate the total number of hours that you worked in your job, including overtime, to be [\w,\s]* hours for the week/);
        cy.get('.text-container').contains('Yes').click();
        cy.wait(2000);
        func.save_cont();

        cy.contains('.text-container', 'What is your full job title in your main job or business?');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Sales Executive');
        func.save_cont();

        cy.contains('.text-container', 'What do you mainly do in that job');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Sell Computers');
        func.save_cont();

        cy.contains('.text-container', 'At your main job, what does the firm or organisation mainly make or do?').then(() => {

            influx.stop_timer("HH1_Block04_" + type);
        });

        influx.wait_start_timer(1000);


        cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').type('Computer sales');
        func.save_cont();

        cy.contains('.text-container', 'And was that in a private firm, business, limited company, or some other kind of organisation?');
        cy.get('.text-container').contains('A private firm, business or limited company').click();
        func.save_cont();

        cy.contains('.text-container', 'When did you start working for your current employer?');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').type('05');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').type('2012');
        func.save_cont();


        cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');
        func.yes_no("No");

        cy.contains('.text-container', 'The next section is about the pay you get as an employee. ');
        func.save_cont();

        cy.task('log', 'HH1: Pay...');

        cy.contains('.text-container', 'Which way would you like to tell us about your pay before deductions? ');
        cy.get('.text-container').contains('Annually').click();
        func.save_cont();

        cy.contains('.text-container', 'What is your annual pay before deductions?');
        cy.get('[data-fieldname="QIndiv[1].QEarnings.GrsExp"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QEarnings.GrsExp"][role="textbox"]').type('35000');
        func.save_cont();

        cy.contains('.text-container', 'Which city, town or village is your main workplace in?');
        cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').type('Barry');
        cy.get('td').contains('Barry').click();//table data
        cy.wait(1000);
        func.save_cont();


        //TRVTIME
        cy.contains('.text-container', 'How long in total does it usually take you to travel from home to work?').then(() => {

            influx.stop_timer("HH1_Block05_" + type);
        });

    };

    if ( full == "Yes" || partial == "Finish") {

        influx.wait_start_timer(1000);

        cy.get('[data-fieldname="QIndiv[1].QTravToWork.TrvTmePers"][type="text"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QTravToWork.TrvTmePers"][type="text"]').type('20');
        func.save_cont();

        cy.contains('.text-container', "How do you usually travel to work?");
        cy.get('.text-container').contains('Car, van, minibus or works van').click();
        func.save_cont();

        cy.contains('.text-container', "How do you travel?");
        cy.get('.text-container').contains('As a passenger').click();
        func.save_cont();

        // ACTWKDY
        cy.contains('.text-container', 'on which days were you scheduled to work?');
        cy.get('.text-container').contains('Monday').click();
        cy.get('.text-container').contains('Tuesday').click();
        cy.get('.text-container').contains('Wednesday').click();
        cy.get('.text-container').contains('Thursday').click();
        cy.get('.text-container').contains('Friday').click();
        func.save_cont();

        cy.contains('.text-container', 'In that week, did you have any days off work because you were sick or injured?');
        func.yes_no("No");

        cy.contains('.text-container', 'In the last 12 months, have you had a period of being off sick from your job or self-employment for 4 weeks in a row or longer?');
        func.yes_no("No");

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

        cy.contains('.text-container', 'were you personally receiving any of the following benefits');
        cy.get('.text-container').contains('Not currently receiving any benefits').click();
        func.save_cont();

        cy.contains('.text-container', 'Thinking back to when you were 14 years old, in which city, town or village were you living?');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOYAreaPers"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOYAreaPers"][role="textbox"]').type('Billericay');
        func.save_cont();

        cy.contains('.text-container', 'Which county or borough is that in?');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOYCty"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOYCty"][role="textbox"]').type('Essex');
        func.save_cont();


        cy.contains('.text-container', 'When you were 14 years old, who did you live with?');
        cy.get('.text-container').contains('One or both parents').click();
        func.save_cont();

        cy.contains('.text-container', 'Who was the main wage earner in your house at that time?');
        cy.get('.text-container').contains('Father').click();
        func.save_cont();

        cy.contains('.text-container', 'What was their main job at that time?');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccT"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccT"][role="textbox"]').type('Accountant');
        func.save_cont();

        cy.contains('.text-container', 'What did they mainly do in that job?');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccD"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccD"][role="textbox"]').type('Prepare accounts and tax returns');
        func.save_cont();

        cy.contains('.text-container', 'Were they an employee or self-employed').then(() => {

            influx.stop_timer("HH1_Block06_" + type);
        });

        influx.wait_start_timer(1000);

        cy.get('.text-container').contains('Self-employed').click();
        func.save_cont();

        cy.task('log', 'HH1: Health...');

        cy.contains('.text-container', 'How is your health in general?');
        cy.get('.text-container').contains('Good').click();
        func.save_cont();

        cy.contains('.text-container', 'Overall, how satisfied are you with your life nowadays');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Satis"][role="textbox"]').click();//clear appears to trigger a "please provide answer" and disables field
        cy.get('[data-fieldname="QIndiv[1].QHealth.Satis"][role="textbox"]').type('8', {force: true});
        func.save_cont();

        cy.contains('.text-container', 'Overall, to what extent do you feel that the things you do in your life are worthwhile');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Worth"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Worth"][role="textbox"]').type('8');
        func.save_cont();

        cy.contains('.text-container', 'Overall, how happy did you feel yesterday');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Happy"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Happy"][role="textbox"]').type('8');
        func.save_cont();

        cy.contains('.text-container', 'On a scale where 0 is \'not at all anxious\' and 10 is \'completely anxious\'');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Anxious"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[1].QHealth.Anxious"][role="textbox"]').type('4');
        func.save_cont();

        cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
        func.yes_no("No");

        cy.contains('.text-container', 'Have you ever had any other health problems or disabilities that have lasted for longer than one year?');
        func.yes_no("No");

        cy.contains('.text-container', /Thinking of the 12 months since [\w,\s]*, have you had any accident resulting in injury at work or in the course of your work\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', 'Was that most recent injury caused by a road accident?');
        func.yes_no("No");

        cy.contains('.text-container', 'Which job were you doing when you were injured?');
        cy.get('.text-container').contains('Main job').click();
        func.save_cont();

        cy.contains('.text-container', 'How soon were you able to start working again after the accident?');
        cy.get('.text-container').contains('The day after the accident').click();
        func.save_cont();

        cy.contains('.text-container', 'How would you describe the injury you received?');
        cy.get('.text-container').contains('Fracture or broken bones').click();
        func.save_cont();

        cy.contains('.text-container', 'Which bones did you fracture or break?');
        cy.get('.text-container').contains('Wrist or ankle').click();
        func.save_cont();

        cy.contains('.text-container', 'Still thinking of that accident, did any of the following happen to you?');
        cy.get('.text-container').contains('None of these').click();
        func.save_cont();

        cy.contains('.text-container', 'Which of the following best describes how the accident happened?').then(() => {

            influx.stop_timer("HH1_Block07_" + type);
        });

        influx.wait_start_timer(1000);

        cy.get('.text-container').contains('Slipped, tripped or fell on the same level').click();
        func.save_cont();

        cy.contains('.text-container', 'Apart from this accident, within the last 12 months have you suffered from any other physical or mental health conditions or illnesses that were caused or made worse by your work?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'How many illnesses have you had in the last 12 months that have been caused or been made worse by your work?');
        cy.get('[data-fieldname="QIndiv[1].QWorkRelatedIll.NUMILL"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QWorkRelatedIll.NUMILL"][role="textbox"]').type('5');

        if (type != "Mobile"){
            func.save_cont();
        }


        cy.contains('.text-container', 'How would you describe the most serious of these illnesses?');
        cy.get('.text-container').contains('Headache or eyestrain').click();
        func.save_cont();

        cy.contains('.text-container', 'When were you first aware of this illness?');
        cy.get('.text-container').contains('More than 12 months ago').click();
        if (type != "Mobile"){
                func.save_cont();
            }

        cy.contains('.text-container', 'In the last 12 months, how much time off work have you had because of this illness?');
        cy.get('.text-container').contains('No time off work').click();
        func.save_cont();

        cy.contains('.text-container', 'Which job caused or made your illness worse?');
        cy.get('.text-container').contains('Main job').click();
        func.save_cont();

        cy.contains('.text-container', 'Have you ever smoked cigarettes regularly?');
        func.yes_no("Yes")

        cy.contains('.text-container', 'Do you smoke cigarettes, even if occasionally?');
        cy.get('.text-container').contains('No').click();
        if (type != "Mobile"){
                func.save_cont();
            }


        cy.contains('.text-container', /You have listed these people as living here now. Which of these people were living here on [\w,\s]*\?/);
        cy.get('.text-container').contains('Gavin').click();
        cy.get('.text-container').contains('Stacey').click();
        func.save_cont();

        cy.contains('.text-container', /Apart from the people already listed below, did anyone else live here on [\w,\s]*\?/);
        func.yes_no("Yes")

        cy.contains('.text-container', /What was the total number of people who lived here on [\w,\s]*\?/);
        cy.get('[data-fieldname="QIndiv[1].QAddHH.HH_Refday2"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.HH_Refday2"][role="textbox"]').type('3');
        func.save_cont();

        cy.contains('.text-container', 'Please enter the details of the other people who lived here on');
        cy.wait(2000);
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].FstNme"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].FstNme"][role="textbox"]').type('Nessa');
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].MidNme"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].MidNme"][role="textbox"]').type('Shanessa');
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].SurNme"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].SurNme"][role="textbox"]').type('Jenkins');
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].Day"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].Day"][role="textbox"]').type('02');
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].Month"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].Month"][role="textbox"]').type('02');
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].Year"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[1].QAddHH.Person[3].Year"][role="textbox"]').type('1970');
        cy.get('.text-container').contains('Female').click();
        func.save_cont();
        cy.wait(3000);
        cy.contains('.text-container', 'Add another person');
        cy.get('[role="button"]').contains('No').click();
        func.save_cont();
        cy.contains('.text-container', 'Is that everyone who lived at this address?');
        cy.get('[type="radio"]').eq(-2).click()//This is added as there are more than one yes/no combo on the page... it gets confused... bless
        cy.wait(1000);
        func.save_cont();

        cy.contains('.text-container', 'Have you lived at your current address for three years or more?');
        func.yes_no("Yes")

        cy.contains('.text-container' , /[\w,\s]* section is now complete./);
        func.save_cont();

        cy.contains('.text-container', 'We would now like to ask some questions of each individual.').then(() => {

            influx.stop_timer("HH1_Block08_" + type);
        });

        influx.wait_start_timer(1000);

        cy.get('.text-container').contains('Start Survey').click();

        cy.task('log', 'HH1: Starting 2nd user...');

        cy.contains('.text-container', 'Who will be answering questions for').then(() => {

            influx.stop_timer("HH1_StartSurvey2_" + type);
        });

        influx.wait_start_timer(1000);
        cy.get('[data-fieldname="QIndiv[2].QPersProx.Rspndnt"][role="button"]').contains('Gavin').click();
        func.save_cont();

        cy.contains('.text-container', 'Does Stacey Gwen Shipman currently live at any other addresses for part of the year?');
        cy.get('.text-container').contains('Yes').click();
        func.save_cont();

        cy.contains('.text-container', 'What type of property is Stacey Gwen Shipman\'s other address?');
        cy.get('.text-container').contains('A family or parental home').click();
        func.save_cont();

        cy.contains('.text-container', 'for a continuous period of 6 months or more');
        func.yes_no("No");

        cy.contains('.text-container', 'What is Stacey Gwen Shipman\'s date of birth');
        func.save_cont();
        // cy.get('[type="radio"]').eq(1).click()
        // cy.get('[type="radio"]').eq(3).click()
        // cy.get('[type="radio"]').eq(5).click()
        // func.save_cont();

        cy.contains('.text-container', 'What is Stacey Gwen Shipman\'s age');
        cy.get('[data-fieldname="QIndiv[2].QDoB.AgeIf"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QIndiv[2].QDoB.AgeIf"][role="textbox"]').type('40');
        func.save_cont();

        cy.contains('.text-container', /What is [\w,\s]*\'s legal marital status\?/);
        cy.get('.text-container').contains('Married').click();
        func.save_cont();

        cy.contains('.text-container', /What is [\w,\s]*\'s nationality\?/);
        cy.get('.text-container').contains('British').click();
        func.save_cont();

        cy.contains('.text-container', /In which country was [\w,\s]* born\?/);
        cy.get('.text-container').contains('Wales').click();
        func.save_cont();

        cy.contains('.text-container', /How would [\w,\s]* describe their national identity\?/);
        cy.get('.text-container').contains('Welsh').click();
        func.save_cont();

        cy.contains('.text-container', /What is [\w,\s]*\'s ethnic group\?/);
        cy.get('.text-container').contains('White').click();
        func.save_cont();

        cy.contains('.text-container', /Which one best describes [\w,\s]*\'s White ethnic group or background\?/);
        cy.get('.text-container').contains('Welsh, English, Scottish, Northern Irish or British').click();
        func.save_cont();

        cy.contains('.text-container', /What is [\w,\s]*\'s religion\?/);
        cy.get('.text-container').contains('Christian').click();
        func.save_cont();

        cy.contains('.text-container',/Can [\w,\s]* understand, speak, read or write Welsh\?/);
        cy.get('.text-container').contains('Understand spoken Welsh').click();
        cy.get('.text-container').contains('Speak Welsh').click();
        func.save_cont();

        cy.contains('.text-container', /How often does [\w,\s]* speak Welsh\?/);
        cy.get('.text-container').contains('Weekly').click();
        func.save_cont();

        cy.contains('.text-container', 'What current passports does');
        cy.get('.text-container').contains('None').click();
        func.save_cont();

        cy.contains('.text-container', 'What expired passports');
        cy.get('.text-container').contains('None').click();
        func.save_cont();

        cy.contains('.text-container', /Did [\w,\s]* have a paid job, either as an employee or self-employed, in the week [\w,\s]*\?/).then(() => {

            influx.stop_timer("HH1_Block09_" + type);
        });

        influx.wait_start_timer(1000);

        func.yes_no("No");

        cy.contains('.text-container', /Does [\w,\s]* have a casual job\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', /Did [\w,\s]* do any casual work for payment, even for an hour, in the week [\w,\s]*\?/);
        func.yes_no("No");

        cy.contains('.text-container', /In the 4 weeks between [\w,\s]*, did [\w,\s]* look for any paid work\?/);
        func.yes_no("No");

        cy.contains('.text-container', /What was the main reason [\w,\s]* did not look for work in this period\?/);
        cy.get('.text-container').contains('Waiting for the results of a job application').click();
        func.save_cont();

        cy.contains('.text-container', /Has [\w,\s]* looked for a paid job in the last 12 months\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', /Did [\w,\s]* do any unpaid or voluntary work in the week [\w,\s]*\?/);
        cy.get('.text-container').contains('Yes, for a family owned business').click();
        func.save_cont();

        cy.contains('.text-container', /When did [\w,\s]* leave their last paid job\?/);//skip
        // cy.get('[class="Font30 reset-font select-text"]').contains('Select a value').should('be.visible');
        // cy.get('[class="Font30 reset-font select-text"]').contains('Select a value').trigger('mouseover').click();
        // cy.get('.option-label').contains('January').click({force: true})

        // cy.get('[data-fieldname="QIndiv[2].QUnemploy.LeftYr"][role="textbox"]').clear('textarea');
        // cy.get('[data-fieldname="QIndiv[2].QUnemploy.LeftYr"][role="textbox"]').type(year-1);
        func.save_cont();

    cy.contains('.text-container', /In the week [\w,\s]* on which days was [\w,\s]* scheduled to work\?/);
    cy.get('.text-container').contains('They were not scheduled to work').click();
    func.save_cont();

    cy.contains('.text-container', /In the last 12 months, has [\w,\s]* had a period of being off sick from their job or self-employment for 4 weeks in a row or longer\?/);
    func.yes_no("No");

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

        cy.contains('.text-container', /In the week [\w,\s]* was [\w,\s]* personally receiving any of the following benefits\?/);
        cy.get('.text-container').contains('Not currently receiving any benefits').click();
        func.save_cont();

        cy.contains('.text-container',  /When [\w,\s]* was 14 years old, in which city, town or village were they living\?/);
        //cy.get('.text-container').contains('I was living outside of the UK').click();
        cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYAreaProx" ][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYAreaProx" ][role="textbox"]').type('Barry');
        func.save_cont();

        cy.contains('.text-container', 'Which county or borough is that in?');
        //cy.get('.text-container').contains('It is outside of the UK').click();
        cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYCty"][role="textbox"]').clear();
        cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYCty"][role="textbox"]').type('Vale of Glamorgan');
        func.save_cont();

        cy.contains('.text-container', /When [\w,\s]* was 14 years old, who did they live with\?/);
        cy.get('.text-container').contains('One or both parents').click();
        func.save_cont();

        cy.contains('.text-container', /Who was the main wage earner in [\w,\s]*\'s house at that time\?/);
        cy.get('.text-container').contains('No-one was earning').click();
        func.save_cont();

        cy.contains('.text-container', /Does [\w,\s]* have any physical or mental health conditions or illnesses\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', 'Has this lasted, or is it expected to last, for 12 months or more?').then(() => {

            influx.stop_timer("HH1_Block10_" + type);
        });

        influx.wait_start_timer(1000);
        func.yes_no("Yes");

        cy.contains('.text-container', /Do any of [\w,\s]*\'s illnesses or conditions reduce their ability to carry out day to day activities\?/);
        cy.get('.text-container').contains('Yes, a little').click();
        func.save_cont();

        cy.contains('.text-container', /Does this health problem affect the kind of paid work that [\w,\s]* might do\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', /Does this health problem affect the amount of paid work that [\w,\s]* might do\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', /Does [\w,\s]* have any of the following\?/);
        cy.get('.text-container').contains('Chest or breathing problems, asthma or bronchitis').click();
        func.save_cont();

        cy.contains('.text-container', /For how long has [\w,\s]*\'s ability to carry out day-to-day activities been reduced\?/);
        cy.get('.text-container').contains('Between 6 months and 12 months').click();
        func.save_cont();

        cy.contains('.text-container', /Has [\w,\s]* ever had any other health problems or disabilities that have lasted for longer than one year\?/);
        func.yes_no("No");

        cy.contains('.text-container', /Thinking of the 12 months since [\w,\s]*, has [\w,\s]* had any accident resulting in injury at work or in the course of their work/);
        func.yes_no("No");

        cy.contains('.text-container', /In the last 12 months, has [\w,\s]* suffered from any physical or mental health conditions or illnesses that were caused or made worse by their work/);
        func.yes_no("No");

        cy.contains('.text-container', /Has [\w,\s]* ever smoked cigarettes regularly\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', /Does [\w,\s]* smoke cigarettes, even if occasionally\?/);
        func.yes_no("Yes");

        cy.contains('.text-container', /Has [\w,\s]* lived at their current address for three years or more\?/);
        func.yes_no("Yes");

        cy.task('log', 'HH1: Outro...');

        //--OUTRO---

        cy.contains('.text-container', 'Thank you, you are almost done.').then(() => {

            influx.stop_timer("HH1_Block11_" + type);
        });

        influx.wait_start_timer(1000);

        cy.get('[data-fieldname="QOutro.Email"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QOutro.Email"][role="textbox"]').type('noddy@bigears.com');
        cy.get('[data-fieldname="QOutro.EmailChk"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QOutro.EmailChk"][role="textbox"]').type('noddy@bigears.com');
        func.save_cont();

        cy.contains('.text-container', 'Are you happy for us to use your email address for these purposes?');
        cy.get('.text-container').contains('Yes').click();
        func.save_cont();

        cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
        // cy.get('[data-fieldname="QOutro.Outro3b" ][role="textbox"]').clear('textarea');
        // cy.get('[data-fieldname="QOutro.Outro3b"][role="textbox"]').type('01234567890');
        func.save_cont();

        cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked. ');
        cy.get('.text-container').contains('Very difficult').click();

        //v27 DEFECT: does not wait for submit button
        cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').type('Thankyou for watching');
        cy.get('.text-container').contains('Submit').click();


        cy.contains('.text-container', 'Thank you, this study is now complete. You may close your browser.').then(() => {

            influx.stop_timer("HH1_Outro_" + type);
        });

    };
};
export {hh1_online}
