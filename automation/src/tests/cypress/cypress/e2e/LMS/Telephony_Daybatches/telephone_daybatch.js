import * as daybatch from '../../../support/functions/daybatch';
var environment = "lms-ts5.tiss.gcp.onsdigital.uk"

describe('LMB Telephone Survey', function() {

    it('LMB England CATI Daybatch creation', function() {
        //Change the daybatch to match the survey

        daybatch.daybatch( "","", environment);
    });
});