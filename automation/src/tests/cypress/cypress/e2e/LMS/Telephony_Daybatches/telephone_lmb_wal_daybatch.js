import * as daybatch from '../../../support/functions/daybatch';
var dbsurvey = "'LMB'"
var dbcountry = "'W'"

describe('LMB Telephone Survey', function() {

    it('LMB Wales Daybatch', function() {
    //Change the daybatch to match the survey

    daybatch.daybatch(dbsurvey, dbcountry, Cypress.env('to_url'));
    });
});