import * as daybatch from '../../../support/functions/daybatch';
var dbsurvey = "'LMS'"
var dbcountry = "'W'"

describe('LMS Telephone Survey', function() {

    it('LMB Wales CATI Daybatch creation', function() {
    //Change the daybatch to match the survey

    daybatch.daybatch(dbsurvey, dbcountry, Cypress.env('to_url'));
    });
});