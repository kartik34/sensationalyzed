<h1>Sensationalyzed </h1>

<p>
Sensationalyzed adresses the era-old phenomenon of sensationalized news article titles in the popular and mainstream media, Sensationalyzed uses <a href="https://azure.microsoft.com/en-ca/services/cognitive-services/text-analytics/"> Microsoft Azure's </a> sentiment analysis API to analyze a piece of text on a scale of 0.0-1.0, with 1.0 being purely positive. Users simply input the names of three news organizations online (ex. cnn.com, foxnews.com, cbc.ca) and Sensationalyzed analyzes each article from each news organization in the past 30 days using the <a href="https://webhose.io/news-data-feed"> WebHose news API </a> and computes an average score. More conservative outlets will general score a more negative score on topics generally considered liberal such as the Democratic Party and Free-trade, and positive on those such as tax cuts and the republican party, while an opposite rating occurs for more liberal outlets. 
</p>
<p>
 Further clicking on a news organization breaks down all their articles in the past 30 days by neutral, positive and negative, and displayed using <a href="http://www.chartjs.org/"> Chart.js </a>, while news articles are broken down and sorted in those categories as well, allowing users to specifically read articles deemed to be more neutral in nature. 
<p>
<p>
 In the future I would like to do the sentiment analysis myself and analyize whole news stories, thereby allowing for more range and granularity in the data, making for more interesting analyses to be made. 
</p>

<p><h2>Built Using:</h2></P>
<ul>
  <li>Node.JS</li>
  <li>Express</li>
  <li>MongoDB</li>
</UL>
  

 
