import * as daybatch from '../../../support/functions/daybatch';
var dbsurvey = "'LMB'"
var dbcountry = "'S'"


describe('LMB Telephone Survey', function() {

    it('LMB Scotland CATI Daybatch creation', function() {
    //Change the daybatch to match the survey

    daybatch.daybatch(dbsurvey, dbcountry, Cypress.env('to_url'));
    });
});