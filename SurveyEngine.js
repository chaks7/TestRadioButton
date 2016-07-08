'use strict';

export default function loadSurvey() {
    var surveyJson = require('./LoopAndSkip.xml.json');
    var surveyQuestions = surveyJson.Survey.Questions;
    return surveyQuestions;
}

function fetchWallsJSON() {
	/***/
    var url = 'http://someurl/';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log(jsonData);
      })
	.catch( error => console.log('Fetch error ' + error) );
	/***/
  }

