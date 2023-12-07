
var start, stop, time, wait


// describe('Some Script', function () {
//     it('Some Test', function() {

//         wait_start_timer(1000)

//         cy.visit('https://lms.technical-testers.census-gcp.onsdigital.uk/lmslogintst/?layout=CAWI-web_large');
//         cy.contains('.text-container', 'Welcome to the Office for National Statistics').then(() => {

//             stop_timer()
//         });

//         wait_start_timer(1000)

//         cy.visit('https://lms.technical-testers.census-gcp.onsdigital.uk/lmslogintst/?layout=CAWI-web_large');
//         cy.contains('.text-container', 'Welcome to the Office for National Statistics').then(() => {

//             stop_timer()
//         });


//         wait_start_timer(1000)

//         cy.visit('https://lms.technical-testers.census-gcp.onsdigital.uk/lmslogintst/?layout=CAWI-web_large');
//         cy.contains('.text-container', 'Welcome to the Office for National Statistics').then(() => {

//             stop_timer()
//         });
//     })
// })


function response_time(transaction, time){
    var host = 'influxdb.tiss.gcp.onsdigital.uk'
    //var host = 'localhost'
    var database = 'cypress'
    var user = 'cypress'
    var pass = 'cypr3ss'
    //var transaction = 'page_load_b'
    var app = 'lms_web'
    cy.request({method:'POST',
            url: 'https://' + host + '/write?db=' + database + '&u=' + user + '&p=' + pass,
            body: 'response_time,transaction=' + transaction + ',app=' + app + ' value=' + time,
            encoding: 'binary'}).then((response) => {
                    expect(response.status).to.eq(204);
                    cy.log("HTTP " + response.status + " OK influx-id: " + response.headers['x-request-id']);
            });
        }

function wait_start_timer(wait){

    cy.wait(wait).then(() => {
        start = performance.now();
    });
}

function stop_timer(transaction){


    stop = performance.now();
    time = ((stop - start) / 1000).toFixed(2);
    cy.log(`Page load took ${time} sec.`)
    response_time(transaction, time);
}
export {wait_start_timer, stop_timer, response_time}