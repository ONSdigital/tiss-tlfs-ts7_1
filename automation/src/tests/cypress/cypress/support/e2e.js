// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
 //This afterEach writes out all the failed file test names to a  file on the STS
afterEach(function() {
	if (Cypress.env("validation") ) {
    var file_date = new Date().toLocaleDateString('en-gb').toString().replace(/\//g, "-")
    // var file =__filename.replace(/^.*[\\\/]/, '');
    if (this.currentTest.state === 'failed') {
        cy.log('The test has failed, the file name is : ' + Cypress.env('ERROR_FILE'))
        cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/ADD?FILENAME=lms_validation_errors.csv&LINE=' + Cypress.env('ERROR_FILE') + "," + file_date + '&ADDMODE=LAST&UNIQUE=FALSE').then((response) => {
        expect(response).property('status').to.equal(200);
        cy.request('http://nfs-server.c.ons-tiss-eng.internal:9191/sts/SAVE?FILENAME=lms_validation_errors.csv').then((response) => {
      //cy.request('http://127.0.0.1:9191/SAVE?FILENAME=lmb_en_uacs.csv').then((response) => {
        expect(response).property('status').to.equal(200)
    });
      });
	}
  }})

afterEach(() => {
	cy.window().then(win => {
		// window.gc is enabled with --js-flags=--expose-gc chrome flag
		if (typeof win.gc === 'function') {
			// run gc multiple times in an attempt to force a major GC between tests
			win.gc();
			win.gc();
			win.gc();
			win.gc();
			win.gc();
		}
	});
});