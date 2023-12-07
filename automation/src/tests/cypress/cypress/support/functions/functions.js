var guid

import dayjs from 'dayjs';

//STS Functions: Due to Favour async nature, Can't seem to call GET row and return value... only inline and process in the .then()
function check_sts(){
    //cy.request('http://127.0.0.1:9191/sts/STATUS').then((response) => {
    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/STATUS').then((response) => {
    expect(response).property('status').to.equal(200)
  });
}

function init_sts(){
  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/STATUS').then((response) => {
    expect(response).property('status').to.equal(200)
});
}

function get_caseid(new_file){

  //this extracts the Case ID, UAC, filename, TLA and CC - the filename is not needed for PreProd
  //cy.wait(10000)
  if (Cypress.env("validation") ) {
  var new_filename = new_file.replace('.tsv' , '')
  }
  var file_date = new Date().toLocaleDateString('en-gb').toString().replace(/\//g, "-")
  cy.get('#za_3e > .text-container', { timeout: 20000 }).should('be.visible').then(($el) => {
    var extract = $el.text();
    var caseid = extract.substring(6, 12)
    var uac = extract.substring(22, 36)
    var tla = extract.substring(46, 49)
    var cc = extract.substring(66, 67)
    cy.log( "Case ID is " + caseid );
    cy.log( "UAC is " + uac );
    cy.log("TLA is " + tla + " The CC is " + cc)



    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=lms_validation_to.csv&LINE=' + caseid + ", "  + uac + ", " + tla + "," + cc + "," + new_filename + ", " + file_date + '&ADDMODE=LAST&UNIQUE=FALSE').then((response) => {
    expect(response).property('status').to.equal(200);

  });


  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=lms_validation_to.csv').then((response) => {
  //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
  expect(response).property('status').to.equal(200)
});
return tla + "," + cc
});

}

// this saves all file in a for loop now
function save_sts(){
  let countries = ['en','ni','sco','wal']
  // let typeS = [ 'a', 'b', 'c', 'p', 'sand', 'validation']
  let typeS = [ 'a', 'sand' ]
  for (const country of countries){
    for (const survey_type of typeS){

    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=ts7_' + survey_type + '_lms_' + country + '_uacs.csv').then((response) => {
    //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200)

    });


    cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=ts7_' + survey_type + '_lmb_' + country + '_uacs.csv').then((response) => {
    //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200)

    });
  };
  }


  // cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=ts7_p_consumed_uacs.csv').then((response) => {
  //   //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
  //   expect(response).property('status').to.equal(200)

  //   });

  //   cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=ts7_c_consumed_uacs.csv').then((response) => {
  //   //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
  //   expect(response).property('status').to.equal(200)

  //   });

}

function save_single_sts(filename) {

  cy.request(Cypress.env('sts_url') + 'SAVE?FILENAME=' + filename).then((response) => {
    //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200)
              });

}

function extract_guid(payload){
  const re = /\d{4}/g;
  var array = payload.match(re);
 return array;
}

function extract_scriptname(payload){
 const re = /(?<=<body>)(.*?)(?=<\/body>)/g;
 // const re = /\d{4}/g;
 var array = payload.match(re);
return array;
}

function extract_user(payload){
 const re = /(test((.|[\n\r])*)\d)|(lms((.|[\n\r])*)\d)/g;
 var array = payload.match(re);
return array;
}

  function to_user(){
  cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=users.csv').then((response) => {
              expect(response).property('status').to.equal(200);
              //cy.log(response.body);
              username = extract_user(response.body);
              //cy.log(username);
              const user = username[0].split(",");
              //cy.log(username[0])

  });
};



// wait for all /lmtloginnew/api/application/executeaction and /lmtloginnew/api/application/audit_trail and general disappointment

function save_cont(delay = 0){
  //cy.wait('@saveCont');//server response time for all list/button clicks
  if (delay != 0){
    cy.wait(delay);
  }
  cy.get('[role="button"]').contains('Save and continue').click();

}

function getMonth() {
  var d = new Date();
  var n = d.getMonth();
  return n+1;
}

function rand_name(){
  const names = ["Alice", "Dave", "Bob", "Carol", "May", "Andy", "Jules"];
  const random = Math.floor(Math.random() * names.length);
    //console.log(random, names[random]);
  return names[random];
    }

function rand_surname(){
  const names = ["Smith", "Jones", "North", "East", "South", "Williams", "Johnson"];
  const random = Math.floor(Math.random() * names.length);
  return names[random];
    }

function rand_gender(){
  const gender = ["#ta_8jaca_1b", "#ta_8jaca_2b"];
  const random = Math.floor(Math.random() * gender.length);
  return gender[random];
    }

function yes_no(answer, delay = 0, save = "Yes") {

  if (answer == "Any"){
    const gong = ["Yes", "No"];
    answer = gong[Math.floor(Math.random() * gong.length)];
  }

  cy.get('[role="button"]').contains(answer).click();

  if (save == "Yes"){
  save_cont(delay);
  }
}


function name_string(fname, mname, sname){
  let full_name = ''
  if (mname =='') {
    full_name = fname + ' ' + sname
  }
  else {
    full_name = fname + ' ' + mname + ' ' +sname

  }
  return full_name
}

function getuac(survey, country, ver = 'ts7', completion = 'a'){


  cy.log("survey = " + survey)
  cy.log("Country = " + country)
  cy.log("ver = " + ver)
  cy.log("Completion = " + completion)

  cy.visit(Cypress.env('url'));
  cy.contains('.text-container', 'Welcome to the Office for National Statistics', { timeout: 60000 });

  //GET GUID
  cy.request(Cypress.env('sts_url') + 'READ?READ_MODE=FIRST&KEEP=FALSE&FILENAME=' + ver + '_' + completion + '_' + survey + '_' + country + '_uacs.csv').then((response) => {
    expect(response).property('status').to.equal(200);
    cy.log(response.body);
    guid = extract_guid(response.body);
    cy.log(guid);

  //Type GUID
    cy.get('input[data-fieldname="UAC1"]').clear().type(guid[0]);
    cy.get('input[data-fieldname="UAC2"]').clear().type(guid[1]);
    cy.get('input[data-fieldname="UAC3"]').clear().type(guid[2])

  //   cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=' + ver + '_' + completion + '_consumed_uacs.csv&LINE=' + guid[0] + " " + guid[1] + " " + guid[2] +'&ADDMODE=LAST&UNIQUE=TRUE').then((response) => {
  //     expect(response).property('status').to.equal(200);
  //   // return guid[0] + " " + guid[1] + " " + guid[2]
  //     cy.log("got to the sts save point")
  // });


});

}

function listerator(list, check_text1, check_text2) {

  cy.contains('.text-container', check_text1);

  for (var value in list) {
    if (list.every(Number.isInteger)) {
      cy.get('[type="radio"]').eq(list[value] - 1).click();
    }
    else {
      cy.get('.text-container').contains(list[value]).click();
    }

    cy.get('.text-container').contains('Save and continue').click();
    cy.contains('.text-container', check_text2);
    cy.get('.text-container').contains('Previous').click();
    cy.contains('.text-container', check_text1);
    }

}

//this is a variation on a theme where you can select check boxes without the previous button etc
function checkarator(list, check_text1) {

  cy.contains('.text-container', check_text1);

  for (var value in list) {
      cy.get('.text-container').contains(list[value]).click();
      cy.wait(500);
    }

}


//Only works with a list of numbers at the moment
function randomiser(listy, check_text) {

  const randiddly = listy[Math.floor(Math.random() * listy.length)];



  cy.get('[type="radio"]').eq(randiddly - 1).click();
  save_cont();

  cy.contains('.text-container', check_text);

}

  function radio_button(answer, field_name, save = "Yes", button_type = "button") {
      if (answer != "") {
        cy.get('[data-fieldname="' + field_name + '"][role="' + button_type + '"]').contains(answer).click();
        //cy.get('[data-fieldname="' + field_name + '"][role="button"]').contains(answer).click();
      }
      if (save = "Yes"){
        save_cont();
      }
  }
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //  This is a bit of a misnamed function as it doesn't click the value of a radio button, just an exact text match on a page.
   //  It goes through all elements on a page where there is text and if the answer passed in is not empty or blank, it will
   //  click the text where the exact match is found
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function click_exact_text(rbe_answer, save = "Yes", ) {
      var rbe_answers = rbe_answer.split(";")
      for (let i = 0; i < rbe_answers.length; i++) {
        cy.log("Zero is " + rbe_answers[0])

        rbe_answers[i] = change_empty_answer(rbe_answers[i]);

        if (rbe_answers[i] != ""){
          cy.get('.text-container').each(ele => {
          //  cy.log("rbe_value is: " + rbe_answers[i])
          if (ele.text() == rbe_answers[i].trim()){
            ele.click()
            cy.log("The answer is " + rbe_answers[i].trim());
                 }

                 })
         }
         else{//Catering for the empty answer which should then result in a redisplay if mandatory or just skip to the next page if not
          //cy.log("saving even though value is empty")
          save_cont(2500);
        }
        }

    if (save == "Yes"){
      save_cont();
    }
}


  function no_answer() {
    cy.contains('.text-container', 'No Answer').click();
    cy.contains('.text-container', 'No reply').click();
    save_cont();
  }
// Little functions to set the viewport size to test mobiles and other screen sizes and orientation...
  function mob_sizer(){
    var sizes = ['ipad-mini', 'iphone-3', 'iphone-6', 'iphone-6+', 'iphone-7', 'iphone-x', 'iphone-xr', 'samsung-note9', 'samsung-s10']
    var randsize = sizes[Math.floor(Math.random() * sizes.length)];
    var orientation = ['landscape', 'portrait']
    var randorientation = orientation[Math.floor(Math.random() * orientation.length)];
    cy.viewport(randsize, randorientation, );
  }

  function screen_sizer(){
    var sizes = ['macbook-11', 'macbook-13', 'macbook-15', 'macbook-16']
    var randsize = sizes[Math.floor(Math.random() * sizes.length)];
    cy.viewport(randsize);
  }

  function verify_page(my_list, page_id, person, max_people, mobile){

    // var page_list = ["Nothing","AboutYou","AddressChk"]
    // var page_idents = ['Nowhere','QHousehold.QHHold.Person[*].Sex','QHousehold.QHHold.Person[*].AddressChk']
    if (mobile == true){
      // cy.scrollTo('center', { duration: 2000 })
      cy.scrollTo('center', { ensureScrollable: false }, { duration: 2000 })
    }
    var page_check = "The page look up has failed";
    var i = 0;
    var page_rows = my_list.split("\n")
    for (var value in page_rows) {

        let my_row = page_rows[value].replace(/(\r\n|\n|\r)/gm, "");
        var the_page = my_row.split("\t");
        // cy.log("the page is " + the_page[0].toUpperCase())

        // cy.log("the page_id is " + page_id.toUpperCase())
        if (the_page[0].toUpperCase() == page_id.toUpperCase()) {
            page_check = the_page[1];
            // cy.log("Before " + page_check)
            page_check = page_check.replace('**', parseInt(max_people))
            page_check = page_check.replace('*', person)
            // cy.log("After " + page_check)
        }
        i++;
    }

    if (page_check != "Skip" ){
      // cy.get("body").then($body => {
        // cy.log($body)
        // if ($body.text().includes(page_answer)){
        // cy.get('[data-fieldname="' + page_check + '"]', {timeout: 15000}).scrollIntoView();
        cy.get('[data-fieldname="' + page_check + '"]', {timeout: 15000}).should('exist');
      // });
    }
    else {
      cy.wait(2000)
    }
    return page_check;

}


function input_value(answer = "", iv_field, save = "Yes") {
  if (answer != "") {
      cy.get('input[data-fieldname="' + iv_field + '"][role="textbox"][aria-live="assertive"]').clear('textarea');
      cy.get('input[data-fieldname="' + iv_field + '"][role="textbox"][aria-live="assertive"]').type(answer);
  }
//   else if (answer == ""){
//     cy.wait(1000);
//     save_cont();
// }

  if (save == "Yes"){
    save_cont();
  }

}

function input_value_noaria(answer = "", ivn_name, save = "Yes") {
  if (answer != "") {

      cy.get('input[data-fieldname="' + ivn_name + '"][role="textbox"]').clear('textarea').type(answer);
  }
//   else if (answer == ""){
//     cy.wait(1000);
//     save_cont();
// }

  if (save == "Yes"){
    save_cont();
  }

}

function input_value_grsexp(answer = "", ivn_name, save = "Yes") {
  if (answer != "") {

      cy.get('input[data-fieldname="' + ivn_name + '"][role="textbox"][tabindex="50"]').clear('textarea').type(answer);
  }
//   else if (answer == ""){
//     cy.wait(1000);
//     save_cont();
// }

  if (save == "Yes"){
    save_cont();
  }

}

function multiple_ticks(field_name, mt_answer, save = "Yes") {
  // cy.log("Going in to multiple ticks")
  // cy.log("Am I gonna save this? " + save)
  if (mt_answer != "") {

    var mt_answers = mt_answer.toString().split(";")

    for (var mt_value in mt_answers) {

      mt_answers[mt_value] = change_empty_answer(mt_answers[mt_value]);

      if (mt_answers[mt_value] != "") {
        cy.get('a[data-fieldname="' + field_name + '"][role="button"]')
        .find('div[class="text-container no-auto word-break"]')
        .contains(mt_answers[mt_value].trim())
        .scrollIntoView()
        .click();
      }
    }
  }
  if (save == "Yes") {
    save_cont();
  }
}

function default_behaviour(page_list, page_ident, page_answer = "", person, full_row, checkbox = "No", telephone, save = "Yes", verify = "Yes", mobile = false){
  //cy.log("Going through default behaviour")
  const yesno_array = ["Yes", "No", "Any"];
  const dontprefer = ["Don't know", "Prefer not to say"]
  var field_name = ""

  //default_behaviour(page_list, ele[0], ele[1], person, my_row )
  //cy.log("Default");
  //Will always want to confirm we are on the page as this is the default behaviour for
  if (verify == "Yes"){
     field_name = verify_page(page_list, page_ident, person, full_row, mobile);
  }

  //if the value to input (in ele[1]) is "Yes", "No" or "Any" then do the yes_no function.
  if (yesno_array.includes(page_answer)) {

      yes_no(page_answer);
  }
  else if (dontprefer.includes(page_answer) && checkbox == "Yes"){
    // cy.log("Don't know if statement for checkboxes")
    save_cont();
    cy.wait(1000);

    cy.get('a[data-fieldname="' + field_name + '"][role="button"]')
    .find('div[class="text-container no-auto word-break"]')
    .contains(page_answer.trim())
    .scrollIntoView()
    .click();

    if (save == "Yes" ) {
      //cy.log("SaveTime")
      save_cont();
    }
      }
  //If there is a Don't know or Prefer not to say then these won't appear on the first pass, needs a save and cont to see them
  else if (dontprefer.includes(page_answer) && checkbox == "No"){
    //cy.log("Don't know if statement for radio buttons")
    //cy.get('.text-container').contains(page_answer).then($button => {
      cy.get("body").then($body => {
        if ($body.text().includes(page_answer)){
        // cy.log("It is assuming the button is visible")
        cy.wait(1000);
        cy.get('.text-container').contains(page_answer).click();
        if (save == "Yes" ) {
          //cy.log("SaveTime")
          save_cont();
        }
        //you get here only if button is visible
      }
      else {
        // cy.log("Should get to here if the button is not visible")
        save_cont();
        cy.wait(1000);
        cy.get('.text-container').contains(page_answer).click();
        if (save == "Yes" ) {
          //cy.log("SaveTime")
          save_cont();
        }
      }
    })
  }

  //if the value in ele[1] contains semi colons, then it is assumed to be a multi answer checkbox
  //Note that all pages where multiple values are input as text are covered as their own cases (like AboutYou for instance)
  else if(page_answer.search(";") > 0) {
      //cy.log("Got to multiple ticks")
      multiple_ticks(field_name, page_answer, save);

  }

  //everything else can be assumed to be a single radio button, and there maybe commas in the text answer
  // so the array needs to be processed
  else {
      // ele.shift();
      // var input_string = ele.join(",");
      if (page_answer == "Other" && telephone == "Yes") {
        cy.get('.text-container').each(ele => {
          if (ele.text() == page_answer){
            ele.click()
          }

        })
        // if (save == "Yes" ) {
        //   cy.log("SaveTime")
        //   save_cont();
        // }
      }

      else if (page_answer != "") {

            cy.get('a[data-fieldname="' + field_name + '"][role="button"]')
            .find('div[class="text-container no-auto word-break"]')
            .contains(page_answer.trim())
            .scrollIntoView()
            .click();

      }
    if (save == "Yes" ) {
      //cy.log("SaveTime")
      save_cont();
    }
  }

}


function cleanser(test_file, lookup_file, country, telephone){

  let file_row = test_file.split('\n');
  let proxy = "No"
  let fail_flag = 0;
  let cleansed_file = [];
  let new_row = "";
  let check_qual = "";
  let uk_flag = 0;
  for (var value in file_row) {

    let my_row = file_row[value].replace(/(\r\n|\n|\r)/gm, "");
    let ele = my_row.split('\t');
    ele.length = 2;

    ele[1] = change_empty_answer(ele[1]);
    var split_answers = ele[1].split(";");
    for (var answer_index in split_answers){
      split_answers[answer_index] = change_empty_answer(split_answers[answer_index]);
    }
    ele[1] = split_answers.join(";");

    // Sometimes the testers have put semicolons in place of blank answers and that is causing failures.
    // This should cleanse those and replace with blanks, which the framework deals with mich better.
    // it doesn't work if spaces are put between those values but if that is problematic then we need a different solution
    if (ele[1] == ';' || ele[1] == ';;' || ele[1] == ';;;'){
      ele[1] = '';
    }
    let lookup_array = lookup_file.split('\n');
    let found = 0;

    for (var row in lookup_array){
      let lookup_row = lookup_array[row].replace(/(\r\n|\n|\r)/gm, "").trim();
      let lookup = lookup_row.split('\t');
      //cy.log(lookup[0]);
      if (lookup[0].toUpperCase() == ele[0].toUpperCase()){
        // cy.log("We are in")
          found = 1;
      }
    }

    if (found == 0) {
      cy.log("Page value " + ele[0] + " has not passed preliminary checks on line " + (value));
      fail_flag = 1
    }
    //Once everything has been parsed


    switch (ele[0].toUpperCase()) {

      case "EWNI_SCHOOL": case "EWNI_COLLEGE": case "EWNI_ADDITIONAL": case "EWNI_PROF": case "EWNI_UNI":
      case "EWNISCOT_SCHOOL": case "EWNISCOT_COLLEGE":  case "EWNISCOT_PROF": case "EWNISCOT_UNI":
      case "SCOT_LEAVERS": case "SCOT_SCHOOL":
        uk_flag = 1;
        var text_check = ele[1].split(";")

        for (var check_value in text_check) {
          if (text_check[check_value].includes("O Grades")){
            text_check.splice(check_value, 1, 'O Grades, also known as ordinary grades');
          }
          if (text_check[check_value] !="None of these"){
            // cy.log("Value " + text_check[check_value]);

            if (check_qual == ""){
              check_qual = text_check[check_value];
            }
            else {
              check_qual = check_qual + ";" + text_check[check_value];
            }
        }
        }
        break;

      case "COUNTRY_QUAL":
        // Where there is more than one person, we can't be having the text from the previous person checked, so at this point we reset check_qual
        //check_qual is used in a loop to create a list of checktext commands to verify the qual_check page has everything it should on it
        check_qual = "";
        break;

      case "NONUK_SCHOOL": case "NONUK_DEG":
        var text_check = ele[1].split(";")
        for (var check_value in text_check) {
          if (text_check[check_value] !="None of these"){
            if (check_qual == ""){
              check_qual = text_check[check_value];
            }
            else {
              check_qual = check_qual + ";" + text_check[check_value];
            }
        }
        }
        break;

        case "NUMBER_EMPLOYEES_WORKPLACE_1JOB": case "WORK_ILLNESS_MOST_SERIOUS_TIME_OFF_LENGTH": case 'NUMBER_EMPLOYEES_WORKPLACE_MAIN_2JOB':
        case 'NUMBER_EMPLOYEES_WORKPLACE_SECOND_2JOB': case 'NUMBER_EMPLOYEES_WORKPLACE_PREVIOUS_JOB': case 'NUMBER_EMPLOYEES_SELF_EMPLOYED_1JOB':
        case 'SICKNESS_CONTINUOUS_ABSENCE_LENGTH': case 'NUMBER_EMPLOYEES_SELF_EMPLOYED_PREVIOUS_JOB': case 'WORK_ILLNESS_TIME_OFF_LENGTH':
        case 'GRSSKP2A': case 'NUMBER_EMPLOYEES_SELF_EMPLOYED_MAIN_2JOB': case 'NUMBER_EMPLOYEES_SELF_EMPLOYED_SECOND_2JOB':

        if (telephone == "Yes"){
          ele[0] = ele[0] + '_tel';
          cy.log('new value for TO is ' + ele[0])
        }
        break;

        case "SCOT_OTHER": case "EWNISCOT_ADDITIONAL":
          var text_check = ele[1].split(";")
          for (var check_value in text_check) {
            if (text_check[check_value].includes("Skills for Work")){
              text_check.splice(check_value, 1, 'Skills for Work Qualifications at level 3 or higher');
            }
            if (text_check[check_value] !="None of these"){
              if (check_qual == ""){
                check_qual = text_check[check_value];
              }
              else {
                check_qual = check_qual + ";" + text_check[check_value];
              }
            }

          }
          break;
          case "QUAL_CHECK_SCOT":
            var text_check = ele[1].split(";")
            for (var check_value in text_check) {
              if (text_check[check_value].includes("Youth Training") && telephone == "Yes"){
                text_check.splice(check_value, 1, 'Youth Training Scheme Certificate, YTS, YTP or YT');
              }
              if (text_check[check_value] !="None of these"){
                if (check_qual == ""){
                  check_qual = text_check[check_value];
                }
                else {
                  check_qual = check_qual + ";" + text_check[check_value];
                }
              }

            }
            break;
        case "SCOT_HIGHERED":
          var text_check = ele[1].split(";")
          for (var check_value in text_check) {
             if (text_check[check_value] !="None of these"){
              if (text_check[check_value].includes("Nursing")){
                text_check.splice(check_value, 1, 'Nursing Qualification');
              }
              if (text_check[check_value].includes("Chartered")){
                text_check.splice(check_value, 1, 'Chartered Qualification');
              }
              if (check_qual == ""){
                check_qual = text_check[check_value];
              }
              else {
                check_qual = check_qual + ";" + text_check[check_value];
              }
            }
          }
          break;

      case "OTHER_UNI_LEV":
        var text_check = ele[1].split(";")
        for (var check_value in text_check) {
          if (check_qual == ""){
            check_qual = "Other formal university qualification, " + text_check[check_value];
          }
          else {
            check_qual = check_qual + ";" + "Other formal university qualification, " + text_check[check_value]
          }
      }
        break;

        case "SAFETY_NET_LEVEL_AWARDS":
          var text_check = ele[1].split(";")
          var main_text = "Other Formal Award, ";
          for (var check_value in text_check) {
            if (text_check[check_value].includes("not formal")){
              text_check.splice(check_value, 1, 'no level');
              main_text = "Award Qualification, ";
            }


            if (text_check[check_value] == "Entry level" || text_check[check_value] == "Level 1" || text_check[check_value] == "Level 2"){
              main_text = "Other Formal Award, "

            }

            if (check_qual == ""){
              check_qual = main_text + text_check[check_value];
            }
            else {
              check_qual = check_qual + ";" + main_text + text_check[check_value]
            }
        }
          break;

        case "SAFETY_NET_LEVEL_CERTS":
          var text_check = ele[1].split(";")
          var main_text = "Other Formal Certificate, "
          for (var check_value in text_check) {
            if (text_check[check_value].includes("not formal")){
              text_check.splice(check_value, 1, 'no level');
              main_text = "Certificate Qualification, "
            }
            if (check_qual == ""){
              check_qual = main_text + text_check[check_value];
            }
            else {
              check_qual = check_qual + ";" + main_text + text_check[check_value]
            }
        }
          break;

          case "SAFETY_NET_LEVEL_DIPS":
            var text_check = ele[1].split(";")
            var main_text = "Other Formal Diploma, "
            for (var check_value in text_check) {
              if (text_check[check_value].includes("not formal")){
                text_check.splice(check_value, 1, 'no level');
                main_text = "Diploma Qualification, "
              }
              if (check_qual == ""){
                check_qual = main_text + text_check[check_value];
              }
              else {
                check_qual = check_qual + ";" + main_text + text_check[check_value]
              }
          }
            break;

            case "SAFETY_NET_LEVEL_OTHER":
              var text_check = ele[1].split(";")
              var main_text = "Other Formal Qualification, "
              for (var check_value in text_check) {
                if (text_check[check_value].includes("not formal")){
                  text_check.splice(check_value, 1, 'no level');
                  main_text = "Other Qualification, "
                }
                if (check_qual == ""){
                  check_qual = main_text + text_check[check_value];
                }
                else {
                  check_qual = check_qual + ";" + main_text + text_check[check_value]
                }
            }
              break;

      case "QUAL_CHECK":
        var text_check = check_qual.split(";")
        var check_row = ""
        for (var check_value in text_check) {

          check_row = 'CheckText' +'\t' + text_check[check_value].trim();
          cleansed_file.push(check_row);
          // cy.log("Check_Row is " + check_row)

        }
        break;

        case "QUAL_CHECK_NONUK":
        var text_check = check_qual.split(";")
        var check_row = ""
        for (var check_value in text_check) {

          check_row = 'CheckText' +'\t' + text_check[check_value].trim();
          cleansed_file.push(check_row);
          // cy.log("Check_Row is " + check_row)


        }
          break;

          case "NATID": case "ETHNICITY": case "WHITE": case "CRY12":
            //This is where the question has different fields depending on the country of the survey.
            //To make things easier for the user, I have set it up so that when they put in these commands
            //it picks the right value based on the country in the calling test - lookups are created for each country.
            ele[0] = ele[0] + "_" + country.toUpperCase();
            //cy.log("Country should be added here " + ele[0])
            break;

      case "ACTWKDY": case "INTUSE":  case "SMOYAREA": case "CAMEYR": case "TRVTME":
      case "HTHDIS": case "HTHOTH": case "TIMEOFF": case "HTHRET": case "HTHRES":
        case 'PREVIOUSLY_SERVED_ARMED_FORCES':
        //cy.log(("Proxy is: " + proxy + " page is " + ele[0]))
        if (proxy.toUpperCase() == "YES") {
            ele[0] = ele[0] + "_PROXY";
            //cy.log("Changed to " + ele[0]);
        }
        break;
      case "SETPROXY":

        proxy = ele[1];
        break;

      case "CHECKPAGE":
        let page_check_found = 0

        for (var checkrow in lookup_array){
          let page_check_row = lookup_array[checkrow].replace(/(\r\n|\n|\r)/gm, "");
          let page_check_lookup = page_check_row.split('\t');
          //cy.log(lookup[0]);
          if (page_check_lookup[0].toUpperCase() == ele[1].toUpperCase()){
            page_check_found = 1;
          }
        }

        if (page_check_found == 0) {
          cy.log("Page value " + ele[1] + " has not passed preliminary checks for the CheckPage Command on line " + value);
          fail_flag = 1
        }

        switch (ele[1].toUpperCase()) {

          case "ACTWKDY": case "INTUSE":  case "SMOYAREA": case "CAMEYR": case"TRVTME":
          case "HTHDIS": case "HTHOTH": case "HTHRES": case "TIMEOFF":

            if (proxy.toUpperCase() == "YES") {
                ele[1] = ele[1] + "_PROXY";
            }
            break;

        case "NATID": case "ETHNICITY": case "WHITE": case "CRY12":
              //This is where the question has different fields depending on the country of the survey.
              //To make things easier for the user, I have set it up so that when they put in these commands
              //it picks the right value based on the country in the calling test - lookups are created for each country.
              ele[1] = ele[1] + "_" + country.toUpperCase();
              //cy.log("Country should be added here " + ele[1])
              break;
        }//end switch ele[1]

      }

      ele[1] = ele[1].trim();
    new_row = ele.join('\t');
    cleansed_file.push(new_row);
  }//end switch ele[0]
  if (fail_flag  == 1) {
    cy.get('.text-container').contains("Page value has not passed preliminary checks", {timeout: 500}).click();
  }
  //cy.log("end of cleanser")

  return cleansed_file;

}


function offset_date(value, requested){
//This function offsets the current date by the number of months, backwards or forwards.
//If the value is not in the format for offsetting it just returns the value originally passed in.
//requested is either MMMM for Full Month and MM for numerical month, or YYYY for Year (YY for 2 digit year), so the calling code only has to deal with one returned value
//The format is -10m for minus 10 months.  Doesn't cope with y for years or d for days

  //get the number of months by finding the position of the "m" at the end of the string

  var finish = value.search("m") - 1 ;

  var startdate = dayjs()
  if (value.search("\\-") >=0 ){
    var finish = value.search("m") - 1 ;
    var offset_months = value.substring(1,finish + 1);
    startdate = startdate.subtract(offset_months, "months");
    // cy.log(startdate);
  }
  else if (value.search("\\+") >=0 ){
    var finish = value.search("m") - 1 ;
    var offset_months = value.substring(1,finish + 1);
    startdate = startdate.add(offset_months, "months")
  }
  else {
    return value;
  }

    return startdate.format(requested);



}
function tickbox_entry(answer, field_name, save = "Yes", delay = 0){
  answer = change_empty_answer(answer);
  if (answer != "" ) {

    var answers = answer.split(";")

    for (var value in answers) {
      answers[value] = change_empty_answer(answers[value]);

      if (answers[value] != ""){
        cy.get('a[data-fieldname="' + field_name + '"][role="button"]').find('div[class="text-container no-auto word-break"]')
          .contains(answers[value].trim()).scrollIntoView().click();
       // cy.get('[data-fieldname="' + field_name + '"][role="button"]').contains(answers[value].trim()).click();
        // cy.get('.text-container').contains(answers[value].trim()).click();

      }

    }
  }
    if (save == "Yes"){
      save_cont(delay);
    }


}

function start_education(){


  cy.visit('https://lms-ts4.tiss.gcp.onsdigital.uk/lme2202_group1/');
  cy.contains('.text-container', 'Welcome to the Survey', { timeout: 60000 });
  //GET GUID
  cy.get('[role="button"]').contains('Start').click();
  cy.contains('.text-container', "Please enter your access code");
};

function time_split(page_list, command, answer, person, save = "No", wait = 0, orig_name, replacement_name, mobile) {

  var page = verify_page(page_list, command, person, "Yes", mobile);
  var thm = answer.split((";"))
  let page_2 = page.replace(orig_name, replacement_name);
  for (let i = 0; i < 3; i++) {
        thm[i] = change_empty_answer(thm[i]);
  }
  // Might be overkill, but if the value in the hours and minutes is already populated then you can't progress when you click on I only worked in my 1st/2nd job
  // So my workaround solution is to set them to zero
  if (thm[0].includes("only worked")){
    cy.get('input[data-fieldname="' + page + '"][role="textbox"][aria-live="assertive"]').clear().type("0");
    cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"][aria-live="assertive"]').clear();
    cy.wait(1000)
    cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"][aria-live="assertive"]').type("0");
    cy.get('.text-container').contains(thm[0]).click();


  }
  else {
    if (thm[0] != "") {
      if (mobile == true){
        cy.log(("Should be typing into the hours box for Mobile"))
        cy.get('input[data-fieldname="' + page + '"][role="textbox"]').clear().type(thm[0]);
      }
      else {
        cy.log(("Should be typing into the hours box for Desktop"))
        //cy.get('input[data-fieldname="' + field_name + '_Hours"][role="textbox"][aria-live="assertive"]').clear().type((thm[0]));
        cy.get('input[data-fieldname="' + page + '"][role="textbox"][aria-live="assertive"]').clear().type(thm[0]);
        }
    }

    if (thm[1] != "") {
      cy.get('[role="button"]').contains('Save and continue').then(($save_button) => {
        if (mobile == true){
          cy.log(("Should be typing into the minutes box for Mobile"))
          cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"]').clear();
          cy.wait(1000)
          cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"]').type(thm[1]);
        }
        else {
          cy.log(("Should be typing into the minutes box for Desktop"))
          cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"][aria-live="assertive"]').clear();
          cy.wait(1000)
          cy.get('input[data-fieldname="' + page_2 + '"][role="textbox"][aria-live="assertive"]').type(thm[1]);
        }

      })

    }
  }
  if (save == "Yes"){
      save_cont();
    }

}


function to_recovery(page_list, page, answers, person, my_row, telephone ){

  cy.contains('.text-container', 'Refusals', { timeout: 60000 }).click();

  cy.contains('.text-container', 'What type of refusal is this?', { timeout: 60000 });
  cy.get('.text-container').contains("Interviewer").click();
  save_cont();

  cy.contains('.text-container', 'Select the reason for non-response', { timeout: 60000 });
  cy.get('.text-container').contains("Impossible to contact").click();
  save_cont();

  cy.contains('.text-container', 'Thank you for your time', { timeout: 60000 });
  save_cont();

  cy.contains('.text-container', 'The record has been updated', { timeout: 60000 });
  cy.get('[role="button"]').contains("Next Case").click();

  cy.wait(10000)
  var i = 0;
  cy.get("body").then($body => {
      i++
      cy.log($body.text())
      if ($body.text().includes('AddChk1')) {
          cy.log("addchk1 found")
          verify_page(page_list, page, person);
          default_behaviour(page_list, page, answers, person, my_row, "No", telephone, "Yes", "Yes" )
          return 0;
      }
      else if (i > 5){
        return 1;
      }
      else {
          to_recovery(page_list, page, answers, person, my_row, telephone);
        }
      })
}
function change_empty_answer(answer_text){
  if (typeof answer_text == 'undefined'){
    answer_text = "";
  }
  return answer_text;
}

export { save_cont, check_sts, save_sts, save_single_sts, extract_guid, getMonth, init_sts, rand_name, rand_surname, rand_gender, input_value_noaria, time_split, get_caseid,
         yes_no, name_string, getuac, listerator, randomiser, no_answer, verify_page, mob_sizer, screen_sizer, start_education, input_value_grsexp,
         extract_user, input_value, multiple_ticks, radio_button, click_exact_text, checkarator, default_behaviour, cleanser, offset_date, tickbox_entry,
         to_recovery, extract_scriptname, to_user, change_empty_answer};
