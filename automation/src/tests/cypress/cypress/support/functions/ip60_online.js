import * as func from '../functions/functions';
import * as person1 from '../functions/lmb_wa_person1';
function ip60_online(type = "Screen", full = "Yes", partial) {
  if ( full == "Yes" || partial == "Start") {
 cy.contains('.text-container', 'Please enter your details');

    //1st person function will complete all the first part of the questionaire
    person1.lmb_wa_person1(type);

    //example of traversing down the dom.. selects 2nd button that matches the filters
    cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
    cy.get('a[role="button"][id^=ta_]').within(() => {
      cy.get('div[class="text-container no-auto word-break"]').eq(1).click();//have to find by index
      })

    //the function here only ever sees the top 'Start Study' so can actually just use this if sequential
    //cy.contains('.text-container', 'We would now like to ask some questions of each individual.');
    //cy.get('.text-container').contains('Start Study').click();





    //-----------------------Person #2 The Script P60 Starts Here--------------------------

    //---INDIVIDUAL---

    cy.contains('.text-container', 'Who will be answering questions for');
    cy.get('[data-fieldname="QIndiv[2].QPersProx.Rspndnt"][role="button"]').contains('Teresa Jane Shipman').click();
    func.save_cont();

    cy.contains('.text-container', 'Do you currently live at any other addresses for part of the year?');
    cy.get('.text-container').contains('Yes').click();
    func.save_cont();

    cy.contains('.text-container', 'What type of property is your other address?');
    cy.get('.text-container').contains('A student halls of residence').click();
    func.save_cont();


    var today = new Date();
    var day = today.getDate();
    var year = today.getFullYear();
    var month = today.getMonth()+1;

    cy.contains('.text-container', 'What is your date of birth');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Day"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Day"][role="textbox"]').type(day);
    cy.get('[data-fieldname="QIndiv[2].QDoB.Month"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Month"][role="textbox"]').type(month);
    cy.get('[data-fieldname="QIndiv[2].QDoB.Year"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QDoB.Year"][role="textbox"]').type(year-30);
    func.save_cont();

    cy.contains('.text-container', 'What is your legal marital status');
    cy.get('.text-container').contains('A surviving member of a legally registered civil partnership').click();
    func.save_cont();

    cy.contains('.text-container', 'What is your nationality');
    cy.get('.text-container').contains('British').click();
    func.save_cont();

    cy.contains('.text-container', 'In which country were you born');

    cy.get('.text-container').contains('Isle of Man or Channel Islands').click();
    func.save_cont();

    // <= 2 yrs
    cy.contains('.text-container', 'In which year did you first arrive to live in the UK?');
    cy.get('[data-fieldname="QIndiv[2].QCntryBrth.CameYrInPer"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QCntryBrth.CameYrInPer"][role="textbox"]').type(year-2);
    func.save_cont();

    cy.contains('.text-container', 'Apart from holidays and short visits abroad, have you lived in the UK continuously since');
    cy.get('.text-container').contains('Yes').click();
    func.save_cont();

    // month needs to be >= current month for [Y-2] to be > 12 months within 2 years
    let longmon = today.toLocaleString('default', {month: 'long'});

    cy.contains('.text-container', /In which month of [\w,\s]* did you most recently arrive to live in the UK/);
    cy.get('.text-container').contains(longmon).click();
    func.save_cont();

    cy.contains('.text-container', 'What was your main reason for coming to the UK');
    cy.get('.text-container').contains('Seeking asylum').click();
    func.save_cont();

    cy.contains('.text-container', 'How would you describe your national identity?');
    cy.get('.text-container').contains('Welsh').click();
    cy.get('.text-container').contains('British').click();
    func.save_cont();

    cy.contains('.text-container', 'What is your ethnic group?');
    cy.get('.text-container').contains('Mixed or multiple ethnic groups').click();
    func.save_cont();

    cy.contains('.text-container', /Which one best describes your [\w,\s]* ethnic group or background/);
    cy.get('.text-container').contains('White and Black Caribbean').click();
    func.save_cont();

    cy.contains('.text-container', 'What is your religion?');
    cy.get('.text-container').contains('Buddhist').click();
    func.save_cont();

    cy.contains('.text-container', 'Can you understand, speak, read or write Welsh?');
    cy.get('.text-container').contains('Understand spoken Welsh').click();
    cy.get('.text-container').contains('Read Welsh').click();
    cy.get('.text-container').contains('Write Welsh').click();
    func.save_cont();

    cy.contains('.text-container', 'What current passports do you hold?');
    cy.get('.text-container').contains('None').click();
    func.save_cont();

    cy.contains('.text-container', 'What expired passports');
    cy.get('.text-container').contains('None').click();
    func.save_cont();

    //---LABOUR MARKET: EMPLOYMENT---

    cy.contains('.text-container', 'Did you have a paid job, either as an employee or self-employed, in the week');
    cy.get('[role="button"]').contains('No').click();// November text clash
    func.save_cont();

    //---LABOUR MARKET: UNEMPLOYMENT---

    cy.contains('.text-container', 'Do you have a casual job?');
    cy.get('.text-container').contains('Yes').click();
    func.save_cont();

    cy.contains('.text-container', 'Did you do any casual work for payment, even for an hour, in the week');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();

    cy.contains('.text-container', /In the 4 weeks between [\s,\w]*, did you look for any paid work/);
    cy.get('.text-container').contains('Yes').click();
    func.save_cont();

    cy.contains('.text-container', 'How long have you been looking for paid work?');
    cy.get('[data-fieldname="QIndiv[2].QUnemploy.LkTimAMth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QUnemploy.LkTimAMth"][role="textbox"]').type('0');
    cy.get('[data-fieldname="QIndiv[2].QUnemploy.LkTimAYr"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QUnemploy.LkTimAYr"][role="textbox"]').type('5');
    func.save_cont();

    cy.contains('.text-container', /If you had been offered a job in the week starting [\w,\s]*, would you be able to start before [\w,\s]*/);
    cy.get('[role="button"]').contains('Yes').click();
    func.save_cont();

    cy.contains('.text-container', 'Are you waiting to start a new job you have accepted?');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();

    //PDWG20
    cy.contains('.text-container', 'Did you do any unpaid or voluntary work in the week');
    func.yes_no("No");

    //NITAX20 #3
    cy.contains('.text-container', 'When did you leave your last paid job?');
    cy.get('.text-container').contains('I have never had a paid job').click();
    func.save_cont();

    // //COROFURL.semp
    // cy.contains('.text-container', 'Have you received financial support from the Coronavirus (COVID-19) Self-employment Income Support Scheme?');
    // cy.get('[role="button"]').contains('No').click();
    // func.save_cont();

    // cy.contains('.text-container', 'What is your full job title in your main job or business?');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt1"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt1"][role="textbox"]').type('Carpet Fitter');
    // func.save_cont();

    // cy.contains('.text-container', 'What do you mainly do in your job');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt2"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.SOC_2020_Pt2"][role="textbox"]').type('Drive fancy cars');
    // func.save_cont();



    // cy.contains('.text-container', 'What does your business mainly make or do?');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.SIC_2020_SEmp"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.SIC_2020_SEmp"][role="textbox"]').type('Terminate people and run for the airport');
    // cy.wait(1000);
    // func.save_cont();


    // //JbRoleChg
    // cy.contains('.text-container', 'Have you changed roles in your job because of the coronavirus (COVID-19) pandemic?');
    // cy.get('.text-container').contains('Yes').click();
    // func.save_cont();

    //LMS-1032 JbRoleChg - incorrectly routing out to REDANY
    //should go to CONSEY/CONMON then DIFJB_CORO (Have you looked for a different job) v27
    // CONSEY / CONMON.2
    // cy.contains('.text-container', 'When did you start working continuously as a self-employed person?');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.ConMon2"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.ConMon2"][role="textbox"]').type('05');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.ConSEY"][role="textbox"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QEmploy.ConSEY"][role="textbox"]').type('2020');
    // func.save_cont();



    // //REDANY
    // cy.contains('.text-container', 'Have you been made redundant from any other jobs in the last 3 months?');
    // cy.get('.text-container').contains('Yes').click();
    // func.save_cont();




    // //WKPL99 Missing: ---DEFECT LMS-963---

    // cy.contains('.text-container', 'Which city, town, village or London borough is your main workplace in?');
    // cy.get('[data-fieldname="QIndiv[2].QTravToWork.WkPl99"][type="text"]').clear('textarea');
    // cy.get('[data-fieldname="QIndiv[2].QTravToWork.WkPl99"][type="text"]').type('Peterborough');//returns <tr><td>
    // cy.wait(1000);
    // cy.get('td').contains('Peterborough').should('be.visible');
    // cy.get('td').contains('Peterborough').click();//table data
    // cy.wait(1000);
    // func.save_cont();

    //ENROL18
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

  }
  if ( full == "Yes" || partial == "Finish") {


    //---BENEFITS---

    cy.contains('.text-container', /In the week [\w,\s,\\.]* were you personally receiving any of the following benefits/);
    cy.get('[data-fieldname="QIndiv[2].QBenefits.TPBN20"]').should('be.visible');
    cy.get('[role="button"]').contains('Child Benefit').click();
    func.save_cont();


    //---SOCIAL MOBILITY---

    cy.contains('.text-container', 'Thinking back to when you were 14 years old, in which city, town or village were you living?');
    //cy.get('.text-container').contains('I was living outside of the UK').click();
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYAreaPers" ][role="textbox"]').clear();
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYAreaPers" ][role="textbox"]').type('Portsmouth');
    func.save_cont();

    cy.contains('.text-container', 'Which county or borough is that in?');
    //cy.get('.text-container').contains('It is outside of the UK').click();
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYCty"][role="textbox"]').clear();
    cy.get('[data-fieldname="QIndiv[2].QSocialMob.SMOYCty"][role="textbox"]').type('Hampshire');
    func.save_cont();

    cy.contains('.text-container', 'When you were 14 years old, who did you live with?');
    cy.get('.text-container').contains('Other non-family members').click();
    func.save_cont();



    //---HEALTH---

    cy.contains('.text-container', 'How is your health in general?');
    cy.get('.text-container').contains('Good').click();
    func.save_cont();

    cy.contains('.text-container', 'Overall, how satisfied are you with your life nowadays');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Satis"][role="textbox"]').click();//clear appears to trigger a "please provide answer" and disables field
    cy.get('[data-fieldname="QIndiv[2].QHealth.Satis"][role="textbox"]').type('5', {force: true});
    func.save_cont();

    cy.contains('.text-container', 'Overall, to what extent do you feel that the things you do in your life are worthwhile');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Worth"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Worth"][role="textbox"]').type('5');
    func.save_cont();

    cy.contains('.text-container', 'Overall, how happy did you feel yesterday');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Happy"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Happy"][role="textbox"]').type('5');
    func.save_cont();

    cy.contains('.text-container', 'On a scale where 0 is \'not at all anxious\' and 10 is \'completely anxious\'');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Anxious"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QIndiv[2].QHealth.Anxious"][role="textbox"]').type('5');
    func.save_cont();

    cy.contains('.text-container', 'Do you have any physical or mental health conditions or illnesses?');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();

    //HEALYR should be here... scenario amended on SP
    cy.contains('.text-container', 'Have you ever had any other health problems or disabilities that have lasted for longer than one year?');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();


    //---ACCIDENTS AT WORK---

    //---WORK RELATED ILLNESS---

    //---SMOKING--

    cy.contains('.text-container', 'Have you ever smoked cigarettes regularly?');
    cy.get('[role="button"]').contains('No').click();
    func.save_cont();


    //---FURTHER ADDRESS DETAILS---

    cy.contains('.text-container', 'Have you lived at your current address for three years or more?');
    cy.get('.text-container').contains('Yes').click();
    func.save_cont();

    //--OUTRO---

    cy.contains('.text-container', 'Thank you, you are almost done.');
    cy.get('[data-fieldname="QOutro.Email"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Email"][role="textbox"]').type('noddy@bigears.com');
    cy.get('[data-fieldname="QOutro.EmailChk"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.EmailChk"][role="textbox"]').type('noddy@bigears.com');
    func.save_cont();

    cy.contains('.text-container', 'Are you happy for us to use your email address for these purposes?');
    cy.get('.text-container').contains('Yes').click();
    func.save_cont();

    cy.contains('.text-container', 'To take part in future research by phone, please provide your telephone number:');
    cy.get('[data-fieldname="QOutro.Outro3b" ][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Outro3b"][role="textbox"]').type('01234567890');
    func.save_cont();

    cy.contains('.text-container', 'Thank you for providing your information. Your information has been submitted and your survey locked');
    cy.get('.text-container').contains('Very difficult').click();

    //v27 defect
    cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').clear('textarea');
    cy.get('[data-fieldname="QOutro.Comments"][role="textbox"]').type('Thankyou for watching');
    cy.get('.text-container').contains('Submit').click();

    cy.contains('.text-container', 'Thank you, this study is now complete. You may close your browser.');

   }
  }

export {ip60_online}
