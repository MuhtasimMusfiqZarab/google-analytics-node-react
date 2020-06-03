//this is our analytics handler--------------------------------------------

//------------------Config----------------------------------

//variables
const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n'), '\n');
//define some scopes for Google APIs
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

//---------here are some of the other scopes we can use
// https://www.googleapis.com/auth/analytics to view and manage the data
// https://www.googleapis.com/auth/analytics.edit to edit the management entities
// https://www.googleapis.com/auth/analytics.manage.users to manage the account users and permissions

//--------------------API's -(setting up google analytics)----------------------

//require google to create analytics and jwt
const { google } = require('googleapis');
const analytics = google.analytics('v3');
const viewId = process.env.VIEW_ID;
//jwt is for authorizing ourselves later on
const jwt = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes,
});

//-----------------------------retrieve data------------------------------

//async so that we can fetch many matrics at once
async function getMetric(metric, startDate, endDate) {
  //radom wait because there is a quote imposed to us by GOOGLE (but is creates scalability issues when there are many users)
  await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
    Math.trunc(1000 * Math.random())
  ); // 3 sec

  //here we fetch the data
  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    'start-date': startDate,
    'end-date': endDate,
    metrics: metric,
  });
  const res = {};
  res[metric] = {
    //taking only the object properties we need (result.data.totalsForAllResults[metric])
    value: parseInt(result.data.totalsForAllResults[metric], 10),
    start: startDate,
    end: endDate,
  };
  return res;
}
//-----------way to batch getting matrics--------------------------------
//make request for a bunch of matrics all at once

//clean up the matric names using parseMetics
function parseMetric(metric) {
  let cleanMetric = metric;
  //adds 'ga' to the front of the metric
  if (!cleanMetric.startsWith('ga:')) {
    cleanMetric = `ga:${cleanMetric}`;
  }
  return cleanMetric;
}
function getData(
  metrics = ['ga:users'],
  startDate = '30daysAgo',
  endDate = 'today'
) {
  // ensure all metrics have ga:
  const results = [];
  for (let i = 0; i < metrics.length; i += 1) {
    //parseMetric is passed to getMetric
    const metric = parseMetric(metrics[i]);
    //(this returns getMetric promises)
    results.push(getMetric(metric, startDate, endDate));
  }
  return results;
}

//exporting getData
module.exports = { getData };
