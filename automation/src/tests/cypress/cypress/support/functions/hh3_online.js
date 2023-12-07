import * as func from '../functions/functions';
function hh3_online(type = "Screen", full = "Yes", partial) {

  if ( full == "Yes" || partial == "Start") {

    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].FstNme"][role="textbox"]').type('Bob');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].MidNme"][role="textbox"]').type('Theo');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QHousehold.QHHold.Person[1].SurNme"][role="textbox"]').type('Builder');

    cy.get('.text-container').contains('Male').click();
    func.save_cont();


    cy.contains('.text-container', 'Is the address below your main residence?');
    func.yes_no("Yes");

    cy.contains('.text-container',  'Does anyone else live at');
    func.yes_no("No");

    cy.contains('.text-container', 'Is that everyone?');
    func.yes_no("Yes");


    cy.contains('.text-container', 'Do any of these people currently live in a student halls of residence for part of the year?');
    cy.get('.text-container').contains("None of these people live in a student halls of residence").click();
    func.save_cont();


    cy.contains('.text-container', 'In whose name, or names, is this accommodation rented');
    cy.get('.text-container').contains("Bob Theo Builder").click();
    func.save_cont();

    cy.contains('.text-container',  'How do you own or rent');
    cy.get('.text-container').contains("Pay rent to a private landlord").click();
    func.save_cont();

    cy.contains('.text-container', 'Does the accommodation go with the job of anyone in the household?');
    func.yes_no("No");

    cy.contains('.text-container',  'Please click on the button below to answer some more questions.');
    cy.get('.text-container').contains('Start Survey').click();

    //Proxy check
    cy.contains('.text-container', 'Who will be answering questions for Bob Theo Builder?');
    cy.get('[data-fieldname="QIndiv[1].QPersProx.Rspndnt"][role="button"]').contains('Bob Theo Builder').click();
    func.save_cont();


    cy.contains('.text-container', 'Do you currently live at any other addresses for part of the year?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What type of property is your other address?');
    cy.get('.text-container').contains("My second home").click();
    func.save_cont();

    cy.contains('.text-container',  'Are you currently away from');
    func.yes_no("No");

      //DOB
      cy.contains('.text-container', 'What is your date of birth');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Day"][role="textbox"]').type('03');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Month"][role="textbox"]').type('03');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').clear('textarea');
      cy.get('[data-fieldname="QIndiv[1].QDoB.Year"][role="textbox"]').type('1957');
      func.save_cont();

    cy.contains('.text-container', 'What is your legal marital status?');
    cy.get('.text-container').contains("A surviving member of a legally registered civil partnership").click();
    func.save_cont();

    cy.contains('.text-container', 'What is your nationality?');
    cy.get('.text-container').contains("Pakistani").click();
    func.save_cont();

    cy.contains('.text-container',  'In which country were you born?');
    cy.get('.text-container').contains("Pakistan").click();
    func.save_cont();

    //CAMEYR
    cy.contains('.text-container', 'In which year did you first arrive to live in the UK?');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrInPer"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYrInPer"][role="textbox"]').type('1980');
    func.save_cont();

    cy.contains('.text-container', 'Apart from holidays and short visits abroad, have you lived in the UK continuously since 1980?');
    func.yes_no("No");

    cy.contains('.text-container',  'In which year did you most recently arrive to live in the UK?');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYr2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QCntryBrth.CameYr2"][role="textbox"]').type('2020');
    func.save_cont();

    cy.contains('.text-container',  /In which month of [\w,\s]* did you most recently arrive to live in the UK\?/);
    cy.get('.text-container').contains("December").click();
    func.save_cont();

    //This step is now missing in v29
    // cy.contains('.text-container',  'Including the time you have already spent here, how long do you intend to stay in the United Kingdom?');
    // cy.get('.text-container').contains("12 months or more").click();
    // func.save_cont();

    cy.contains('.text-container',  'What was your main reason for coming to the UK in');
    cy.get('.text-container').contains("For employment").click();
    func.save_cont();

    cy.contains('.text-container',  'How would you describe your national identity?');
    cy.get('.text-container').contains("Other").click();
    func.save_cont();

    cy.contains('.text-container',  'Please specify');
    cy.get('[data-fieldname="QIndiv[1].QNation.NatIDSpec"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QNation.NatIDSpec"][role="textbox"]').type('Pakistani');
    func.save_cont();

    cy.contains('.text-container',  'What is your ethnic group?');
    cy.get('.text-container').contains("Asian or Asian British").click();
    func.save_cont();

    cy.contains('.text-container',  'Which one best describes your Asian or Asian British ethnic group or background?');
    cy.get('.text-container').contains("Pakistani").click();
    func.save_cont();

    cy.contains('.text-container',  'What is your religious denomination?');
    cy.get('.text-container').contains("Other religion").click();
    func.save_cont();

    cy.contains('.text-container', 'Please specify');
    cy.get('[data-fieldname="QIndiv[1].QReligion.ReligOth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QReligion.ReligOth"][role="textbox"]').type('The God of Chaos');
    func.save_cont();

    cy.contains('.text-container', 'What current passports do you hold?');
    cy.get('.text-container').contains('None').click();
    func.save_cont();

    cy.contains('.text-container', 'What expired passports');
    cy.get('.text-container').contains('None').click();
    func.save_cont();

    cy.contains('.text-container',  'Did you have a paid job, either as an employee or self-employed, in the week');
    func.yes_no("No");

    cy.contains('.text-container', 'Do you have a casual job?');
    func.yes_no("Yes");

    cy.contains('.text-container',  'Did you do any casual work for payment, even for an hour, in the week');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What was the main reason you took a casual job rather than a permanent one?');
    cy.get('.text-container').contains("To suit my circumstances").click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, who pays you?');
    cy.get('.text-container').contains("My employer through PAYE").click();
    func.save_cont();

    cy.contains('.text-container', 'In your main job, who deals with your tax or National Insurance?');
    //cy.contains('.text-container', 'Who deals with your tax and National Insurance payments?'); V28 fixes this
    cy.get('.text-container').contains("My tax or National Insurance is taken from my pay before I am paid").click();
    func.save_cont();

    cy.contains('.text-container', 'In your job, do you have a contract with your employer?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'In your main job, do you have a zero-hour contract?'); //still says main job
    func.yes_no("Yes");

    cy.contains('.text-container', 'Where do you mainly work?');
    cy.get('.text-container').contains("In a different location from my home").click();
    func.save_cont();

    cy.contains('.text-container', 'Do you ever do any paid or unpaid work at home for your job?');
    func.yes_no("No");

    cy.contains('.text-container', 'Do you have access to broadband internet at home?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Would it be possible for you to be able to work from home without access to broadband internet?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'On which of the following days did you do any work in your job or business?');
    cy.get('.text-container').contains("Monday").click();
    func.save_cont();

    cy.contains('.text-container',  'Did you do any work outside of your home in the week');
    func.yes_no("Yes");

    cy.contains('.text-container',  'Did you do any work from home in the week');
    func.yes_no("No");

    // cy.contains('.text-container', 'Do you ever do work which you would consider as overtime?');
    // cy.get('.text-container').contains("I do not work overtime").click();
    // func.save_cont();

    cy.contains('.text-container',  /In the week [\w,\s]*, how many hours did you actually work/);
    cy.get('[data-fieldname="QIndiv[1].QEmploy.CasAc_Hours"][role="textbox"]').clear().type('5');
    cy.wait(1000);

    func.save_cont();

    // cy.get('[data-fieldname="QIndiv[1].QEmploy.CasAc_Mins"][role="textbox"]').type('1');
    cy.wait(1000);
    cy.get('[data-fieldname="QIndiv[1].QEmploy.CasAc_Mins"][role="textbox"]').type('1');
    func.save_cont();


    cy.contains('.text-container', 'What is your full job title in your main job or business?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Builder');
    func.save_cont();

    cy.contains('.text-container', 'What do you mainly do in that job or business?');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Build homes');
    func.save_cont();

    cy.contains('.text-container', 'At your main job, what does the firm or organisation mainly make or do?');
		cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.SIC_2020_Emp"][role="textbox"]').type('Builds Properties');
    func.save_cont();

    cy.contains('.text-container', 'And was that in a private firm, business, limited company, or some other kind of organisation?');
    cy.get('.text-container').contains("Some other kind of organisation").click();
    func.save_cont();

    cy.contains('.text-container', 'What kind of organisation was it?');
    cy.get('.text-container').contains("A charity, voluntary organisation or trust").click();
    func.save_cont();

    cy.contains('.text-container',  'When did you start working for your current employer?');
		cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMon1"][role="textbox"]').type('02');

    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QEmploy.ConMPY"][role="textbox"]').type('2020');
    func.save_cont();
  };
  if ( full == "Yes" || partial == "Finish") {

    cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');
    func.yes_no("No");

    //WORKAROUND NO NI TOWNS, DEFECT
    cy.contains('.text-container', 'Which city, town or village is your main workplace in?');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.WkPl99"][type="text"]').type('Belfast');//returns <tr><td>
    cy.wait(1000);
    cy.get('td').contains('Belfast').should('be.visible');
    cy.get('td').contains('Belfast').click();//table data
    cy.wait(1000);
    func.save_cont();

    cy.contains('.text-container', 'How long in total does it usually take you to travel from home to work?');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.TrvTmePers"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QTravToWork.TrvTmePers"][role="textbox"]').type('60');
    func.save_cont();

    cy.contains('.text-container', 'How do you usually travel to work?');
    cy.get('.text-container').contains("Car, van, minibus or works van").click();
    func.save_cont();

    cy.contains('.text-container', 'How do you travel?');
    cy.get('.text-container').contains("As a driver").click();
    func.save_cont();

    cy.contains('.text-container',  /In the week [\w,\s]* on which days were you scheduled to work\?/);
    cy.get('.text-container').contains("I was not scheduled to work").click();
    func.save_cont();

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

    cy.contains('.text-container',  /In the week [\w,\s]* were you personally receiving any of the following benefits\?/);
    cy.get('.text-container').contains("Not currently receiving any benefits").click();
    func.save_cont();

    cy.contains('.text-container', 'Thinking back to when you were 14 years old, in which city, town or village were you living?');
    cy.get('.text-container').contains("I was living outside of the UK").click();
    func.save_cont();

    cy.contains('.text-container', 'Which county or borough is that in?');
    cy.get('.text-container').contains("It is outside of the UK").click();
    func.save_cont();

    cy.contains('.text-container', 'When you were 14 years old, who did you live with?');
    cy.get('.text-container').contains("Other family members").click();
    func.save_cont();

    cy.contains('.text-container', 'Who was the main wage earner in your house at that time?');
    cy.get('.text-container').contains("Other family member").click();
    func.save_cont();

    cy.contains('.text-container', 'What was their main job at that time?');
		cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccT"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccT"][role="textbox"]').type('Builder');
    func.save_cont();

    cy.contains('.text-container', 'What did they mainly do in that job?');
	cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccD"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QSocialMob.SMOccD"][role="textbox"]').type('Build homes');
    func.save_cont();

    cy.contains('.text-container', 'Were they an employee or self-employed');
    cy.get('.text-container').contains("Self-employed").click();
    func.save_cont();

    cy.contains('.text-container', 'How is your health in general?');
    cy.get('.text-container').contains("Good").click();
    func.save_cont();

    cy.contains('.text-container', 'Overall, how satisfied are you with your life nowadays, where 0 is \'not at all satisfied\' and 10 is \'completely satisfied’?');
		cy.get('[data-fieldname="QIndiv[1].QHealth.Satis"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QHealth.Satis"][role="textbox"]').type('8');
    func.save_cont();

    cy.contains('.text-container', 'Overall, to what extent do you feel that the things you do in your life are worthwhile, where 0 is \'not at all worthwhile\' and 10 is \'completely worthwhile\'?');
		cy.get('[data-fieldname="QIndiv[1].QHealth.Worth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QHealth.Worth"][role="textbox"]').type('7');
    func.save_cont();

    cy.contains('.text-container', 'Overall, how happy did you feel yesterday, where 0 is \'not at all happy\' and 10 is \'completely happy\'?');
    cy.get('[data-fieldname="QIndiv[1].QHealth.Happy"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QHealth.Happy"][role="textbox"]').type('7');
    func.save_cont();

    cy.contains('.text-container', 'On a scale where 0 is \'not at all anxious\' and 10 is \'completely anxious\', overall, how anxious did you feel yesterday?');
    cy.get('[data-fieldname="QIndiv[1].QHealth.Anxious"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[1].QHealth.Anxious"][role="textbox"]').type('2');
    func.save_cont();

    cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Has this lasted, or is it expected to last, for 12 months or more?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Do any of your illnesses or conditions reduce your ability to carry out day to day activities?');
    cy.get('.text-container').contains("Yes, a little").click();
    func.save_cont();

    // cy.contains('.text-container', 'Does this health problem affect the kind of paid work that you might do?');
    // func.yes_no("No");

    // cy.contains('.text-container', 'Does this health problem affect the amount of paid work that you might do?');
    // func.yes_no("Yes");

    cy.contains('.text-container', 'Do you have any of the following?');
    cy.get('.text-container').contains("Severe or specific learning difficulties").click();
    func.save_cont();

    cy.contains('.text-container', 'Is this a learning difficulty or a learning disability?');
    cy.get('.text-container').contains("A learning difficulty").click();
    func.save_cont();

    cy.contains('.text-container', 'For how long has your ability to carry out day-to-day activities been reduced?');
    cy.get('.text-container').contains("12 months or more").click();
    func.save_cont();

    cy.contains('.text-container', 'Have you ever had any other health problems or disabilities that have lasted for longer than one year?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'What were those health problems or disabilities?');
    cy.get('.text-container').contains("Problems or disabilities connected with your back or neck").click();
    func.save_cont();

    cy.contains('.text-container', 'Have you ever smoked cigarettes regularly?');
    func.yes_no("Yes");

    cy.contains('.text-container', 'Do you smoke cigarettes, even if occasionally?')
    cy.get('.text-container').contains("No").click();
    if (type == "Mobile"){
        //No need to have the save and continue as all on one page..
    }
    else {
        func.yes_no("No");
    }


    cy.contains('.text-container',  'You have listed these people as living here now. Which of these people were living here on');
    cy.get('.text-container').contains("Bob Theo Builder").click();
    func.save_cont();

    cy.contains('.text-container',  'Apart from the people already listed below, did anyone else live here on');
    func.yes_no("No");

    cy.contains('.text-container',  'We would now like you to list all the addresses you have lived at over the last three years.');
    //func.save_cont();
    cy.contains('.text-container',  'Have you lived at your current address for three years or more?');
    func.yes_no("Yes");


    cy.contains('.text-container', 'Thank you, you are almost done.');
    cy.get('.text-container').contains("I do not want to receive an e-voucher").click();
    cy.wait(3000)// hack... waiting for something to load
    func.save_cont();

    cy.contains('.text-container', 'If you are happy to be contacted by email to take part in future research, please provide your email address. ');
    func.save_cont();

    cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
		cy.get('[data-fieldname="QOutro.Outro3b"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Outro3b"][role="textbox"]').type('01234567890');
    func.save_cont();

    cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked. ');
    cy.get('.text-container').contains("Very difficult").click();
    cy.wait(1000);
    cy.get('[role="button"]').contains('Submit').should('exist');
    cy.get('[role="button"]').contains('Submit').click();

    cy.contains('.text-container',  'Thank you, this study is now complete. You may close your browser.');

}
}
export {hh3_online}
