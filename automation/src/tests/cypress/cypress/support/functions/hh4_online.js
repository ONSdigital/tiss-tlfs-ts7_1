import * as func from '../functions/functions';
function hh4_online(type = "Screen", full = "Yes", partial) {
  if ( full == "Yes" || partial == "Start") {
 cy.contains('.text-container', 'Please enter your details');

        //About you - ABOUTYOU
        cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').type('Mary');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').clear('textarea');
        cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').type('Poppins');

        cy.get('.text-container').contains('Female').click();
        func.save_cont();

      //Address check
      cy.contains('.text-container', 'Is the address below your main residence? ');
      func.yes_no("Yes");

      //Household check
      cy.contains('.text-container', 'Does anyone else live at');
      //      cy.contains('.text-container', 'Does anyone else live at');
      func.yes_no("Yes");

      //   Add people
      cy.contains('.text-container',  'Include all adults, children and babies who class this address as their main residence, even if they are currently away for a continuous period of up to 6 months.');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[2].FstNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[2].FstNme"][role="textbox"]').type('Bert');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[2].SurNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[2].SurNme"][role="textbox"]').type('Sweep');

      cy.get('.text-container').contains('Male').click();
      func.save_cont();

      //func.save_cont();
      cy.contains('.text-container', 'This person is my…');
      cy.get('.text-container').contains('Other non-relative').click();
      func.save_cont();

      cy.contains('.text-container', 'Does anyone else live at');
      //cy.contains('.text-container', 'Does anyone else live at');
      func.yes_no("Yes");

      cy.contains('.text-container', 'Person 3');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[3].FstNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[3].FstNme"][role="textbox"]').type('Jack');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[3].SurNme"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QHousehold.QHHold.Person[3].SurNme"][role="textbox"]').type('Lamp');

      cy.get('.text-container').contains('Male').click();
      func.save_cont();

      cy.contains('.text-container', 'This person is my…');
      cy.get('.text-container').contains('Other non-relative').click();
      func.save_cont();

      cy.contains('.text-container', 'Does anyone else live at');
      func.yes_no("No");

      cy.contains('.text-container', 'Is that everyone');
      func.yes_no("Yes");

      cy.contains('.text-container', 'Do any of these people currently live in a student halls of residence for part of the year');
      cy.get('.text-container').contains('None of these people live in a student halls of residence').click();
      func.save_cont();

      //Other Relationships
      cy.contains('.text-container', 'You have told us how you are related to the other household members.');
      func.save_cont();

      cy.contains('.text-container', 'Bert Sweep is the ... of Jack Lamp');
      cy.get('.text-container').contains('Other non-relative').click();
      func.save_cont();


      cy.contains('.text-container', 'Do all of these people share cooking facilities?');
      func.yes_no("Yes");

      cy.contains('.text-container', 'And do they all share a living room or dining room?');
      func.yes_no("Yes");

      //   Property named owner/renter
      cy.contains('.text-container', 'In whose name, or names, is this accommodation rented');
      cy.get('.text-container').contains('Bert Sweep').click();
      func.save_cont();

      //   How owned or rented
      //cy.contains('.text-container', 'How do the following people own or rent');
      cy.contains('.text-container', 'How do the following people own or rent');
      cy.get('.text-container').contains("Don't know").click();
      func.save_cont();

      //Individual Intro Page
      cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
      cy.get('.text-container').contains('Start Survey').click();

      //Proxy check
      cy.contains('.text-container', 'Who will be answering questions for Mary Poppins?');
      cy.get('[data-fieldname="QIndiv[1].QPersProx.Rspndnt"][role="button"]').contains('Mary Poppins').click();
      func.save_cont();

      //Alt Address
      cy.contains('.text-container', 'Do you currently live at any other addresses for part of the year?');
      func.yes_no("No");

      //DOB
      cy.contains('.text-container', 'What is your date of birth');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').type('04');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').type('04');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').type('1965');
      func.save_cont();

      //XMARSTA
      cy.contains('.text-container', 'What is your legal marital status?');
      cy.get('.text-container').contains("Never married").click();
      func.save_cont();

      //Nationality
      cy.contains('.text-container', 'What is your nationality?');
      cy.get('.text-container').contains("Irish").click();
      func.save_cont();

      //   CRY12
      cy.contains('.text-container', 'In which country were you born?');
      cy.get('.text-container').contains("Republic of Ireland").click();
      func.save_cont();

      //CAMEYR
      cy.contains('.text-container', 'In which year did you first arrive to live in the UK?');
      cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrInPer"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrInPer"][role="textbox"]').type('2000');
      func.save_cont();

      //CONTUK
      cy.contains('.text-container', 'Apart from holidays and short visits abroad, have you lived in the UK continuously since 2000?');
      func.yes_no("Yes");

      //WHYUK10
      cy.contains('.text-container', 'What was your main reason for coming to the UK in 2000?');
      cy.get('.text-container').contains("For employment").click();
      func.save_cont();

      //   National Identity
      cy.contains('.text-container', 'How would you describe your national identity?');
      cy.get('.text-container').contains("Other").click();
      func.save_cont();

      cy.contains('.text-container', 'Please specify');
      cy.get('[data-fieldname="QIndiv[1].QNation.NatIDSpec"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QNation.NatIDSpec"][role="textbox"]').type('Irish');
      func.save_cont();

      //Ethnicity
      cy.contains('.text-container', 'What is your ethnic group?');
      cy.get('.text-container').contains("Other").click();
      func.save_cont();

      //Other Second Page
      cy.contains('.text-container', 'Which one best describes your ethnic group or background?');
      cy.get('.text-container').contains("Any other background").click();
      func.save_cont();

      cy.contains('.text-container', 'Please specify');
      cy.get('[data-fieldname="QIndiv[1].QEthnic.EthAntOth"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QEthnic.EthAntOth"][role="textbox"]').type('Irish traveller');
      func.save_cont();

      //Religion
      cy.contains('.text-container', 'What is your religion?');
      cy.get('.text-container').contains("Buddhist").click();
      func.save_cont();

      cy.contains('.text-container', 'What current passports do you hold?');
      cy.get('.text-container').contains('None').click();
      func.save_cont();

      cy.contains('.text-container', 'What expired passports');
      cy.get('.text-container').contains('None').click();
      func.save_cont();

      //PAIDJOB
      cy.contains('.text-container','Did you have a paid job, either as an employee or self-employed,');
      //cy.contains('.text-container', 'Did you have a paid job, either as an employee or self-employed,');
      func.yes_no("Yes");

      //Might not need this bit
      cy.contains('.text-container', 'Did you have a second paid job or business?');
      func.yes_no("No");

      //Self Employed
      cy.contains('.text-container', 'Are you an employee or self-employed?');
      cy.get('[role="button"]').contains('Self-employed').click();
      cy.wait(2000);
      cy.get('[role="button"]').contains('Full-time').click();
      func.save_cont();

      //Who Pays you
      cy.contains('.text-container', 'Who pays you?');
      cy.get('.text-container').contains("My clients or customers").click();
      func.save_cont();

      //NI and PAYE
      cy.contains('.text-container', 'Who deals with your tax or National Insurance?');
      cy.get('.text-container').contains("I deal with my own tax or National Insurance").click();
      func.save_cont();

      //Who sets price
      cy.contains('.text-container', 'Who sets the price for your goods or services?');
      cy.get('.text-container').contains("I do").click();
      func.save_cont();

      //how do you find work
      cy.contains('.text-container', ' find your work?');
      cy.get('.text-container').contains("I find my work myself").click();
      func.save_cont();

    //   booking holibobs
      cy.contains('.text-container', 'Do you need permission to have non-working days?');
      cy.get('.text-container').contains("No, I can usually take non-working days without permission").click();
      func.save_cont();

      //incorpporated?
      cy.contains('.text-container', 'Is your business a limited company registered with Companies House?');
      func.yes_no("No");

      //Employees?
      cy.contains('.text-container', 'Did you have any employees on PAYE in the last 2 weeks?');
      func.yes_no("No");

      //where do you mainly work?
      cy.contains('.text-container', 'Where do you mainly work?');
      cy.get('.text-container').contains("In the same grounds or building as my home").click();
      func.save_cont();

      //any WFH?
      cy.contains('.text-container', 'Do you ever do any paid or unpaid work at home for your job?');
      func.yes_no("No");

      //internet at home?
      cy.contains('.text-container', 'Do you have access to broadband internet at home?');
      func.yes_no("Yes");

      //could you wfh without internet?
      cy.contains('.text-container', 'Would it be possible for you to be able to work from home without access to broadband internet?');
      func.yes_no("Yes");

      //what days did you work?
      cy.contains('.text-container', 'On which of the following days did you do any work in your job or business?');
      cy.get('.text-container').contains("Monday").click();
      cy.get('.text-container').contains("Tuesday").click();
      cy.get('.text-container').contains("Wednesday").click();
      cy.get('.text-container').contains("Thursday").click();
      cy.get('.text-container').contains("Friday").click();
      cy.get('.text-container').contains("Saturday").click();
      cy.get('.text-container').contains("Sunday").click();
      func.save_cont();

    //   work outside home?
      cy.contains('.text-container','Did you do any work outside of your home in the week');
      //cy.contains('.text-container', 'Did you do any work outside of your home in the week Monday 16th August 2021 to Sunday 22nd August 2021?');
      func.yes_no("Yes");

      //wfh last week
      cy.contains('.text-container','Did you do any work from home in the week');
      //cy.contains('.text-container', 'Did you do any work from home in the week Monday 16th August 2021 to Sunday 22nd August 2021?');
      func.yes_no("No");

      //Do overtime?
      cy.contains('.text-container', 'Do you ever do work which you would consider as overtime?');
      cy.get('.text-container').contains("I am self-employed and this does not apply to me").click();
      func.save_cont();


      //Usual hours
      cy.contains('.text-container', 'Many jobs or businesses have usual hours. Not including your overtime, how many hours do you usually work a week in your job or business?');

      cy.wait(1000);
      cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr_Hours"][role="textbox"]').clear().type('50');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.UsHr_Mins"][role="textbox"]').clear().type('0');
      //func.save_cont();

      cy.get('[data-fieldname="QIndiv[1].QEmploy.ActHr_Hours"][role="textbox"]').type('50');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.ActHr_Mins"][role="textbox"]').type('0');
      func.save_cont();


      //Is the input value correct?
      cy.contains('.text-container', 'We calculate the total number of hours that you worked in your job, including overtime, to be 50 hours for the week');
      cy.get('[role="button"]').contains("Yes").click();
      cy.wait(1000);
      func.save_cont();

      //full job title
      cy.contains('.text-container', 'What is your full job title in your main job or business?');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Nanny');
      func.save_cont();

    //what do you do in your job
      cy.contains('.text-container', 'What do you mainly do in that job or business?');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Look after children');
      func.save_cont();

    //   What is the business
      cy.contains('.text-container', 'What does that business mainly make or do?');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_SEmp"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_SEmp"][role="textbox"]').type('Nanny service');
      func.save_cont();


      //when self employed from
      cy.contains('.text-container', 'When did you start working continuously as a self-employed person?');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.ConSEY"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.ConSEY"][role="textbox"]').type('2000');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon2"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon2"][role="textbox"]').type('01');
      func.save_cont();

      //redundant?
      cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');
      func.yes_no("No");


      //where is workplace?
      cy.contains('.text-container', 'Which city, town, village or London borough is your main workplace in?');
      cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').type('Chelsea');//returns <tr><td>
      cy.wait(1000);
      cy.get('td').contains('Chelsea').should('be.visible');
      cy.get('td').contains('Chelsea').click();//table data
      cy.wait(1000);
      func.save_cont();
      // cy.contains('.text-container', 'How do you usually travel to work?');
      // cy.get('#ta_1iaca_7e > .text-container').click();
      // func.save_cont();

      // All this stuff is off the expected path but we have to carry on through
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Monday').click();
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Tuesday').click();
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Wednesday').click();
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Thursday').click();
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Friday').click();
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Saturday').click();
      cy.get('[data-fieldname="QIndiv[1].QSickness.ACTWKDY"][role="button"]').contains('Sunday').click();
      func.save_cont();

      //Sick or injured
      cy.contains('.text-container', 'In that week, did you have any days off work because you were sick or injured?');
      func.yes_no("No")

      //sick 12 months (shouldn't appear according to the spec)
      cy.contains('.text-container', 'In the last 12 months, have you had a period of being off sick from your job or self-employment for 4 weeks in a row or longer?');
      func.yes_no("No");


      //education
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


      //benefits
      cy.contains('.text-container','were you personally receiving any of the following benefits?');
      //cy.contains('.text-container', 'In the week Monday 30th August 2021 to Sunday 5th September 2021 were you personally receiving any of the following benefits?');
      cy.get('.text-container').contains('Not currently receiving any benefits').click();
      func.save_cont();

      //where living at 14
      cy.contains('.text-container', 'Thinking back to when you were 14 years old, in which city, town or village were you living?');
      cy.get('.text-container').contains('I was living outside of the UK');
      cy.get('.text-container').contains('I was living outside of the UK').click();
      func.save_cont();

      //func.save_cont();

      //what county is that
      cy.contains('.text-container', 'Which county or borough is that in?');
      cy.get('.text-container').contains('It is outside of the UK');
      cy.get('.text-container').contains('It is outside of the UK').click();
      func.save_cont();

      //who live with at 14
      cy.contains('.text-container', 'When you were 14 years old, who did you live with?');
      cy.get('.text-container').contains("One or both parents").click();
      func.save_cont();

      //main wage earner
      cy.contains('.text-container', 'Who was the main wage earner in your house at that time?');
      cy.get('.text-container').contains("Joint main earners").click();
      func.save_cont();

      //their main job
      cy.contains('.text-container', 'What was their main job at that time?');
      cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccT"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccT"][role="textbox"]').type('Doctor')
      func.save_cont();

      //what do in job
      cy.contains('.text-container', 'What did they mainly do in that job?');
      cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccD"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccD"][role="textbox"]').type('GP treating patients and referring them to hospitals')
      func.save_cont();

      //employed or self employed
      cy.contains('.text-container', 'Were they an employee or self-employed');
      cy.get('.text-container').contains("An employee").click();

      func.save_cont();

      //general health
      cy.contains('.text-container', 'How is your health in general?');
      cy.get('.text-container').contains("Very good").click();
      func.save_cont();

      //satisfied with life
      cy.contains('.text-container', 'Overall, how satisfied are you with your life nowadays, where 0 is \'not at all satisfied\' and 10 is \'completely satisfied’?');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Satis"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Satis"][role="textbox"]').type('9');
      func.save_cont();

      //worthwhile
      cy.contains('.text-container', 'Overall, to what extent do you feel that the things you do in your life are worthwhile, where 0 is \'not at all worthwhile\' and 10 is \'completely worthwhile\'?');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Worth"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Worth"][role="textbox"]').type('9');
      func.save_cont();

      //how happy
      cy.contains('.text-container', 'Overall, how happy did you feel yesterday, where 0 is \'not at all happy\' and 10 is \'completely happy\'?');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Happy"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Happy"][role="textbox"]').type('9');
      func.save_cont();

      // anxiety
      cy.contains('.text-container', 'On a scale where 0 is \'not at all anxious\' and 10 is \'completely anxious\', overall, how anxious did you feel yesterday?');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Anxious"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QHealth.Anxious"][role="textbox"]').type('1');
      func.save_cont();

      //any mental ohpysical conditions or illnesses
      cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
      func.yes_no("No");


      //any other health problems
      cy.contains('.text-container', 'Have you ever had any other health problems or disabilities that have lasted for longer than one year?');
      func.yes_no("No");


      //accident at work
      cy.contains('.text-container','have you had any accident resulting in injury at work or in the course of your work?');
      func.yes_no("No");


      //illness last 12 months caused by work
      cy.contains('.text-container', 'In the last 12 months, have you suffered from any physical or mental health conditions or illnesses that were caused or made worse by your work?');
      func.yes_no("No");


      //smoker?
      cy.contains('.text-container', 'Have you ever smoked cigarettes regularly?');
      func.yes_no("No");


      //who was living here on the selected date
      cy.contains('.text-container','You have listed these people as living here now. Which of these people were living here');
      //cy.contains('.text-container', 'You have listed these people as living here now. Which of these people were living here on Thursday 1st April 2021?');
      cy.get('.text-container').contains("Mary Poppins").click();
      cy.get('.text-container').contains("Bert Sweep").click();
      cy.get('.text-container').contains("Jack Lamp").click();
      func.save_cont();

      //did anyone else live here
      cy.contains('.text-container','Apart from the people already listed below, did anyone else live here');
      //cy.contains('.text-container', 'Apart from the people already listed below, did anyone else live here on Thursday 1st April 2021?');
      func.yes_no("No");

      //Continue to addresses
      cy.contains('.text-container', 'We would now like you to list all the addresses you have lived at over the last three years.');
      //func.save_cont();

      //Current address 3 years or more
      cy.contains('.text-container', 'Have you lived at your current address for three years or more?');
      func.yes_no("Yes");

      //This is the end of Mary Poppins so move onto the next person


      cy.get('.text-container > :nth-child(3)').should('have.text', 'Please click the ‘Save and Continue’ button to select another household member and complete their section.');
      func.save_cont();

      //Start the second person
      cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
      cy.get('.text-container').contains('Start Survey').click();

      //who will answer for bert
      cy.contains('.text-container', 'Who will be answering questions for Bert Sweep?');
      cy.get('[data-fieldname="QIndiv[2].QPersProx.Rspndnt"][role="button"]').contains('Mary Poppins').click();
      func.save_cont();

      //any other address
      cy.contains('.text-container', 'Does Bert Sweep currently live at any other addresses for part of the year?');
      func.yes_no("Yes");


      //what type of property is that address
      cy.contains('.text-container', 'What type of property is Bert Sweep\'s other address?');
      cy.get('.text-container').contains("A second home").click();
      func.save_cont();

      //currently away for 6 months?
      cy.contains('.text-container','for a continuous period of 6 months or more?');
      //cy.contains('.text-container', 'Is Bert Sweep currently away from 20 ONS Street London for a continuous period of 6 months or more?');
      func.yes_no("Yes");

      //save and continue
      cy.get('.text-container > :nth-child(2)').should('have.text', 'Please click the ‘Save and continue’ button to select another household member and complete their section.');
      func.save_cont();

  }

      if (full == "Yes" || partial == "Finish"){

      //select person 3
      cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
      cy.get('.text-container').contains('Start Survey').click();

      //who is answering for them
      cy.contains('.text-container', 'Who will be answering questions for Jack Lamp?');
      cy.get('[data-fieldname="QIndiv[3].QPersProx.Rspndnt"][role="button"]').contains('Jack Lamp').click();
      func.save_cont();

      //any other addresses
      cy.contains('.text-container', 'Do you currently live at any other addresses for part of the year?');
      func.yes_no("No");


      //DOB
      cy.contains('.text-container', 'What is your date of birth');
      cy.get('[data-fieldname="QIndiv[3].QDoB.Day"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QDoB.Day"][role="textbox"]').type('04');
      cy.get('[data-fieldname="QIndiv[3].QDoB.Month"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QDoB.Month"][role="textbox"]').type('04');
      cy.get('[data-fieldname="QIndiv[3].QDoB.Year"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QDoB.Year"][role="textbox"]').type('1961');
      func.save_cont();

      //marital status
      cy.contains('.text-container', 'What is your legal marital status?');
      cy.get('.text-container').contains("Separated but still legally in a civil partnership").click();
      func.save_cont();

      //nationality
      cy.contains('.text-container', 'What is your nationality?');
      cy.get('.text-container').contains("Other").click();
      //cy.wait(2000);
      //func.save_cont();

      cy.contains('.text-container', 'Please add all your nationalities');
      cy.wait(1000);
      cy.get('[data-fieldname="QIndiv[3].QCntryBrth.NationOth"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QCntryBrth.NationOth"][role="textbox"]').type('Cameroonian');
      func.save_cont();

      //birth country
      cy.contains('.text-container', 'In which country were you born?');
      cy.get('.text-container').contains("Other").click();
      func.save_cont();

      cy.contains('.text-container', 'Please specify');
      cy.get('[data-fieldname="QIndiv[3].QCntryBrth.Cry12Oth"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QCntryBrth.Cry12Oth"][role="textbox"]').type('Cameroon');
      func.save_cont();

      //year of arrival
      cy.contains('.text-container', 'In which year did you first arrive to live in the UK?');
      cy.get('[data-fieldname="QIndiv[3].QCntryBrth.CameYrInPer"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QCntryBrth.CameYrInPer"][role="textbox"]').type('2007');
      func.save_cont();

      //continuously lived here?
      cy.contains('.text-container', 'Apart from holidays and short visits abroad, have you lived in the UK continuously since 2007?');
      func.yes_no("Yes");


      //main reason for coming here
      cy.contains('.text-container', 'What was your main reason for coming to the UK in 2007?');
      cy.get('.text-container').contains("As a spouse or dependent of a UK citizen or settled person").click();
      func.save_cont();

      //national identity
      cy.contains('.text-container', "How would you describe your national identity?");
      cy.get('.text-container').contains('Other').click();
      func.save_cont();

      cy.contains('.text-container', "Please specify");
      cy.get('[data-fieldname="QIndiv[3].QNation.NatIDSpec"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QNation.NatIDSpec"][role="textbox"]').type('Cameroonian');
      func.save_cont();

      //ethnicity
      cy.contains('.text-container', 'What is your ethnic group?');
      cy.get('.text-container').contains("Black, African, Caribbean or Black British").click();
      func.save_cont();

      //ethnicity 2
      cy.contains('.text-container', 'Which one best describes your Black, African, Caribbean or Black British ethnic group or background?');
      cy.get('[role="button"]').contains('African').click();
      func.save_cont();

      //religion
      cy.contains('.text-container', 'What is your religion?');
      cy.get('.text-container').contains("Christian").click();
      func.save_cont();

      cy.contains('.text-container', 'What current passports do you hold?');
      cy.get('.text-container').contains('None').click();
      func.save_cont();

      cy.contains('.text-container', 'What expired passports');
      cy.get('.text-container').contains('None').click();
      func.save_cont();

      //paid job
      cy.contains('.text-container','Did you have a paid job, either as an employee or self-employed, in the week');
      func.yes_no("Yes");

      //second job
      cy.contains('.text-container', 'Did you have a second paid job or business?');
      func.yes_no("Yes");

      //employment status main job
      cy.contains('.text-container', 'In your main job, are you an employee or self-employed?');
      cy.get('.text-container').contains("An employee").click();
      cy.wait(1000);
      cy.get('.text-container').contains("Part-time").click();
      func.save_cont();

      //employment status second job
      cy.contains('.text-container', 'In your second job, are you an employee or self-employed?');
      cy.get('.text-container').contains("An employee").click();
      cy.wait(1000);
      cy.get('.text-container').contains("Part-time").click();
      func.save_cont();

      //reason for part-time
      cy.contains('.text-container', 'We know that people work in part-time jobs for a variety of reasons. What was the main reason you took a part-time job rather than a full-time job?');
      cy.get('.text-container').contains("Did not want a full-time job").click();
      func.save_cont();

      //who pays you
      cy.contains('.text-container', 'In your main job, who pays you?');
      cy.get('.text-container').contains("My employer through PAYE").click();
      func.save_cont();

      //who deals with tax
      cy.contains('.text-container', 'In your main job, who deals with your tax or National Insurance?');
      cy.get('.text-container').contains("My tax or National Insurance is taken from my pay before I am paid").click();
      func.save_cont();

      //temp or perm
      cy.contains('.text-container', 'Is your main job permanent, temporary or casual?');
      cy.get('.text-container').contains("Temporary").click();
      func.save_cont();

      //how temp
      cy.contains('.text-container', "In which way was the job temporary?");
      cy.get('.text-container').contains('A contract for a fixed period or fixed task').click();
      func.save_cont();

      //why temp
      cy.contains('.text-container', 'What was the main reason you took a temporary job rather than a permanent one?');
      cy.get('.text-container').contains("To suit my circumstances").click();
      func.save_cont();

      //contract
      cy.contains('.text-container', 'In your main job, do you have a contract with your employer?');
      func.yes_no("Yes");

      //zero hours?
      cy.contains('.text-container', 'In your main job, do you have a zero-hour contract?');
      func.yes_no("No");


      //3 months or less
      cy.contains('.text-container', 'Is the total duration of your contract for 3 months or less?');
      func.yes_no("No");


      //who pays you in job 2
      cy.contains('.text-container', 'In your second job, who pays you?');
      cy.get('.text-container').contains("A company through an app or online platform, such as Deliveroo").click();
      func.save_cont();

      //J2 who pys ni etc
      cy.contains('.text-container', 'In your second job, who deals with your tax or National Insurance?');
      cy.get('.text-container').contains("My tax or National Insurance is taken from my pay before I am paid").click();
      func.save_cont();

      //main job where work
      cy.contains('.text-container', 'In your main job where do you mainly work?');
      cy.get('.text-container').contains("In a different location from my home").click();
      func.save_cont();

      cy.contains('.text-container', 'In your second job, where do you mainly work?');
      cy.get('.text-container').contains("In a different location from my home").click();
      func.save_cont();

      //wfh
      cy.contains('.text-container', 'Do you ever do any paid or unpaid work at home for your jobs?');
      func.yes_no("No");

      //broadband access
      cy.contains('.text-container', 'Do you have access to broadband internet at home?');
      func.yes_no("Yes");

      //could you wfh without broadband
      cy.contains('.text-container', 'Would it be possible for you to be able to work from home without access to broadband internet?');
      func.yes_no("Yes");

      //what days worked
      cy.contains('.text-container', 'On which of the following days did you do any work in your jobs or businesses?');
      cy.get('[role="button"]').contains('Wednesday').click();
      cy.get('[role="button"]').contains('Thursday').click();
      cy.get('[role="button"]').contains('Friday').click();
      cy.get('[role="button"]').contains('Saturday').click();
      func.save_cont();

      //any work outside the home
      cy.contains('.text-container','Did you do any work outside of your home in the week');
      func.yes_no("Yes");

      //any wfh
      cy.contains('.text-container','Did you do any work from home in the week');
      func.yes_no("No");

      cy.contains('.text-container', 'Do you ever do work which you would consider as overtime?');
      cy.get('.text-container').contains("I do not work overtime").click();
      func.save_cont();

      cy.contains('.text-container', 'Many jobs or businesses have usual hours. Not including your overtime, how many hours do you usually work a week in your main job or business?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.UsHr1_Hours"][role="textbox"]').clear().type('25');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.UsHr1_Mins"][role="textbox"]').clear().type('0');
      //func.save_cont();

      cy.get('[data-fieldname="QIndiv[3].QEmploy.ActHr1_Hours"][role="textbox"]').clear().type('25');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.ActHr1_Mins"][role="textbox"]').clear().type('0');
      func.save_cont();

      //expected hours and actual hours
      cy.contains('.text-container', 'Many jobs or businesses have usual hours. Not including your overtime, how many hours do you usually work a week in your second job or business?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.UsHr2_Hours"][role="textbox"]').clear().type('10');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.UsHr2_Mins"][role="textbox"]').clear().type('0');
      //func.save_cont();

      cy.get('[data-fieldname="QIndiv[3].QEmploy.ActHr2_Hours"][role="textbox"]').clear().type('10');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.ActHr2_Mins"][role="textbox"]').clear().type('0');

      func.save_cont();

      //calculated hours
      cy.contains('.text-container', "We calculate the total number of hours that you worked in your main and second jobs, including overtime, to be 35 hours");
      cy.get('[role="button"]').contains("Yes").click();
      cy.wait(3000);
      func.save_cont();


      //  // ********* Not sure why this is missing will check - V24 ********** //
      // //why less work
      // cy.contains('.text-container', 'What was the main reason you worked fewer hours or days than usual in the week');
      // cy.get('.text-container').contains("Illness or injury expected to last fewer than 4 weeks").click();
      // func.save_cont();

      //full job title
      cy.contains('.text-container', 'What is your full job title in your main job or business?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Lamp lighter');
      func.save_cont();

      //job tasks
      cy.contains('.text-container', 'What do you mainly do in that job or business?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Light street lamps');
      func.save_cont();

      //firm purpose
      cy.contains('.text-container', 'At your main job, what does the firm or organisation mainly make or do?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SIC_2020_Emp"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SIC_2020_Emp"][role="textbox"]').type('Manage street lights');
      func.save_cont();



      cy.contains('.text-container', 'And was that in a private firm, business, limited company, or some other kind of organisation?');
      cy.get('.text-container').contains("Some other kind of organisation").click();
      func.save_cont();

      //org type
      cy.contains('.text-container', 'What kind of organisation was it?');
      cy.get('.text-container').contains("Local government").click();
      func.save_cont();

      //full job title
      cy.contains('.text-container', 'What is your full job title in your second job or business?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_2_Pt1"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_2_Pt1"][role="textbox"]').type('Gas lighter');
      func.save_cont();

      //job tasks
      cy.contains('.text-container', 'What do you mainly do in that job or business?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_2_Pt2"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SOC_2020_2_Pt2"][role="textbox"]').type('Light gas lamps');
      func.save_cont();

      //firm purpose
      cy.contains('.text-container', 'At your second job, what does the firm or organisation mainly make or do?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SIC_2020_2_Emp"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.SIC_2020_2_Emp"][role="textbox"]').type('Manage gas lights');
            func.save_cont();


      //when start work for current employer
      cy.contains('.text-container', 'In your main job, when did you start working for your current employer?');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.ConMPY"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEmploy.ConMPY"][role="textbox"]').type('2010')
      cy.get('[data-fieldname="QIndiv[3].QEmploy.ConMon1"][role="textbox"]').clear('textarea');
      // cy.wait(1000);
      cy.get('[data-fieldname="QIndiv[3].QEmploy.ConMon1"][role="textbox"]').type('01')
      func.save_cont();

      //redundant
      cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');
      func.yes_no("No");

      //pay
      cy.contains('.text-container', 'The next section is about the pay you get as an employee. ');
      func.save_cont();

      //pay from main job
      cy.contains('.text-container', 'These questions are about the pay from your main job. We will ask you about your second job after. ');
      cy.get('.text-container').contains('Weekly').click();
      func.save_cont();

      //pay before deductions
      cy.contains('.text-container', 'What is your weekly pay before deductions? ');
      cy.get('[data-fieldname="QIndiv[3].QEarnings.GrsExp"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QEarnings.GrsExp"][role="textbox"]').type('250');
      func.save_cont();

      //check pay amount
      cy.contains('.text-container', 'Just to check, is £250 the full-time pay for your job?');
      cy.get('.text-container').contains("No, this is the pay I receive for my part-time job").click();
      func.save_cont();

      cy.contains('.text-container', 'These questions are about the pay from your second job. ');
      cy.get('.text-container').contains("Weekly").click();
      func.save_cont();

      cy.contains('.text-container', 'In your second job, what is your weekly pay before deductions? ');
      func.save_cont();//Skip

      //message after skipping
      cy.contains('.text-container',
          'UK legislation allows us to collect and process your data to produce statistics for the public good. Your information will be treated as confidential as directed by the Code of Practice for Statistics. It will only be held for as long as it is being used for producing statistics and will not identify you or anyone in your household. Study information may be provided to approved organisations or researchers for statistical purposes only. '
      );
      func.save_cont();

      //selecting pay period
      cy.contains('.text-container', 'If you had options to choose your pay from, for example £0 up to £500, £501 up to £1000, how would you like to report your pay from your second job before deductions? ');
      cy.get('.text-container').contains("Weekly").click();
      func.save_cont();

      //select from a range
      cy.contains('.text-container', 'In your second job, how much is your weekly pay before deductions? ');
      cy.get('.text-container').contains("£110 up to £220?").click();
      func.save_cont();

      //where is workplace?

      cy.contains('.text-container', 'Which city, town, village or London borough is your main workplace in?');
      cy.get('[data-fieldname="QIndiv[3].QTravToWork.WkPl99"][type="text"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QTravToWork.WkPl99"][type="text"]').type('Chelsea');//returns <tr><td>
      cy.wait(1000);
      cy.get('td').contains('Chelsea').should('be.visible');
      cy.get('td').contains('Chelsea').click();//table data
      cy.wait(1000);
      func.save_cont();


      //TRVTME
      cy.contains('.text-container', 'How long in total does it usually take you to travel from home to work?');
      cy.get('[data-fieldname="QIndiv[3].QTravToWork.TrvTmePers"][type="text"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QTravToWork.TrvTmePers"][type="text"]').type('10');
      func.save_cont();

      //how travel to work
      cy.contains('.text-container', 'How do you usually travel to work?');
      cy.get('.text-container').contains("Walk").click();
      func.save_cont();

      cy.contains('.text-container', 'In your second job, which city, town, village or London borough is your workplace in?');
      cy.get('[data-fieldname="QIndiv[3].QTravToWork.Workplace_Location_Second_Job"][type="text"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[3].QTravToWork.Workplace_Location_Second_Job"][type="text"]').type('Chelsea');//returns <tr><td>
      cy.wait(1000);
      cy.get('td').contains('Chelsea').should('be.visible');
      cy.get('td').contains('Chelsea').click();//table data
      cy.wait(1000);
      func.save_cont();

      //which days scheduled to work
      cy.contains('.text-container','on which days were you scheduled to work?');
      //cy.contains('.text-container', 'In the week Monday 30th August 2021 to Sunday 5th September 2021 on which days were you scheduled to work?');
      cy.contains('.text-container','on which days were you scheduled to work?');
      cy.get('[data-fieldname="QIndiv[3].QSickness.ACTWKDY"][role="button"]').contains('Monday').click();
      cy.get('[data-fieldname="QIndiv[3].QSickness.ACTWKDY"][role="button"]').contains('Tuesday').click();
      cy.get('[data-fieldname="QIndiv[3].QSickness.ACTWKDY"][role="button"]').contains('Wednesday').click();
      cy.get('[data-fieldname="QIndiv[3].QSickness.ACTWKDY"][role="button"]').contains('Thursday').click();
      cy.get('[data-fieldname="QIndiv[3].QSickness.ACTWKDY"][role="button"]').contains('Friday').click();
      cy.get('[data-fieldname="QIndiv[3].QSickness.ACTWKDY"][role="button"]').contains('Saturday').click();

      func.save_cont();

      //any days off sick
      cy.contains('.text-container', 'In that week, did you have any days off work because you were sick or injured?');
      func.yes_no("Yes");

      //which days off sick
      cy.contains('.text-container', 'Which days did you have off work because you were sick or injured?');
      cy.get('[role="button"]').contains('Monday').click();
      cy.get('[role="button"]').contains('Tuesday').click();

      func.save_cont();


      //periods of sickness last week
      cy.contains('.text-container','how many periods of sickness absence from work did you have?');
      //cy.contains('.text-container', 'In the week Monday 30th August 2021 to Sunday 5th September 2021 how many periods of sickness absence from work did you have?');
      cy.get('.text-container').contains("One").click();
      func.save_cont();
      //cy.get('#ta_1iaca_1c').click();

      cy.contains('.text-container', 'When did this period of sickness absence start?');
      cy.wait(1000);
      cy.get('.text-container').contains("Before the first day worked in the week").click();
      func.save_cont();

      cy.contains('.text-container', 'What was the main condition that caused you to take this sickness absence?');
      cy.get('.text-container').contains("Stress, depression, anxiety").click();
      func.save_cont();

      //When were you sick
      cy.contains('.text-container','did the sickness absence begin?');
      //cy.contains('.text-container', 'How long before Monday 30th August did the sickness absence begin?');
      cy.get('.text-container').contains("Four days").click();
      func.save_cont();

      //sick in last 12 months
      cy.contains('.text-container', 'In the last 12 months, have you had a period of being off sick from your job or self-employment for 4 weeks in a row or longer?');
      func.yes_no("No");

      //formal education
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


      //Benefits
      cy.contains('.text-container','were you personally receiving any of the following benefits?');
      //cy.contains('.text-container', 'In the week Monday 30th August 2021 to Sunday 5th September 2021 were you personally receiving any of the following benefits?');
      cy.get('.text-container').contains('Not currently receiving any benefits').click();
      func.save_cont();


      //where living at 14
      cy.contains('.text-container', 'Thinking back to when you were 14 years old, in which city, town or village were you living?');
      cy.get('.text-container').contains('I was living outside of the UK');
      cy.get('.text-container').contains('I was living outside of the UK').click();
      func.save_cont();

      //what county
      cy.contains('.text-container', 'Which county or borough is that in?');
      cy.get('.text-container').contains('It is outside of the UK');
      cy.get('.text-container').contains('It is outside of the UK').click();
      func.save_cont();

      //who did you live with at 14
      cy.contains('.text-container', 'When you were 14 years old, who did you live with?');
      cy.get('.text-container').contains("Other non-family").click();
      func.save_cont();

      //how is your health
      cy.contains('.text-container', 'How is your health in general?');
      cy.get('.text-container').contains("Fair").click();
      func.save_cont();

    //satisfied with life
    cy.contains('.text-container', 'Overall, how satisfied are you with your life nowadays, where 0 is \'not at all satisfied\' and 10 is \'completely satisfied’?');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Satis"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Satis"][role="textbox"]').type('7');
    func.save_cont();

    //worthwhile
    cy.contains('.text-container', 'Overall, to what extent do you feel that the things you do in your life are worthwhile, where 0 is \'not at all worthwhile\' and 10 is \'completely worthwhile\'?');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Worth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Worth"][role="textbox"]').type('6');
    func.save_cont();

    //how happy
    cy.contains('.text-container', 'Overall, how happy did you feel yesterday, where 0 is \'not at all happy\' and 10 is \'completely happy\'?');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Happy"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Happy"][role="textbox"]').type('7');
    func.save_cont();

    // anxiety
    cy.contains('.text-container', 'On a scale where 0 is \'not at all anxious\' and 10 is \'completely anxious\', overall, how anxious did you feel yesterday?');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Anxious"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[3].QHealth.Anxious"][role="textbox"]').type('5');
    func.save_cont();


      //conditions or illnesses
      cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
      func.yes_no("No");


        /*

          This question should not appear
        */


      //anything that lasted longer than a year
      cy.contains('.text-container', 'Have you ever had any other health problems or disabilities that have lasted for longer than one year?');
      func.yes_no("No");


      //any accident or injury at work
      cy.contains('.text-container','have you had any accident resulting in injury at work');
      // cy.contains('.text-container', 'Thinking of the 12 months since 30th August 2020, have you had any accident resulting in injury at work or in the course of your work?');
      func.yes_no("No");

      //anything caused by work
      cy.contains('.text-container', 'In the last 12 months, have you suffered from any physical or mental health conditions or illnesses that were caused or made worse by your work?');
      func.yes_no("No");

      //have you smoked
      cy.contains('.text-container', 'Have you ever smoked cigarettes regularly?');
      func.yes_no("Yes");

      //do you smoke now
      cy.contains('.text-container', 'Do you smoke cigarettes, even if occasionally?');
      func.yes_no("No");

      //list previous address - continue to section
      cy.contains('.text-container', 'We would now like you to list all the addresses you have lived at over the last three years.');
      //func.save_cont();

      //3 years or more yes
      cy.contains('.text-container', 'Have you lived at your current address for three years or more?');
      func.yes_no("Yes");

      //NOT REQUIRED
      //end of Person 3
      // cy.get('.text-container > :nth-child(3)').should('have.text', 'Please click the ‘Save and Continue’ button to select another household member and complete their section.');
      // func.save_cont();

      //This is all unspecified so took the easy options
      cy.contains('.text-container', 'To receive your £10 e-voucher please provide an email address:');
      cy.wait(3000);
      cy.get('.text-container').contains("I do not want to receive an e-voucher").click();
      cy.wait(3000);
      func.save_cont();

      cy.contains('.text-container', 'If you are happy to be contacted by email to take part in future research, please provide your email address.');

      func.save_cont();

      cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
      cy.wait(1000);
      func.save_cont();

      cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked. ');
      cy.get('.text-container').contains('Submit').click();

      cy.contains('.text-container', 'Thank you, this study is now complete. You may close your browser.');
  }
}
export {hh4_online}
