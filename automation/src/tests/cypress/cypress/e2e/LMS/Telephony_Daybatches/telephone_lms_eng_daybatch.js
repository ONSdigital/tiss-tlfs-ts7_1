import * as daybatch from '../../../support/functions/daybatch';
var dbsurvey = "'LMS'"
var dbcountry = "'E'"
// var environment = "lms-ts7-sandbox.tiss.gcp.onsdigital.uk"

describe('LMS Telephone Survey', function() {

    it('LMS England CATI Daybatch creation', function() {
        //Change the daybatch to match the survey

        daybatch.daybatch(dbsurvey, dbcountry, Cypress.env('to_url'));

})
});