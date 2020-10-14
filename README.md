# CSCI-571
USC CSCI 571 2020 fall, Web Technologies, by Prof. Marco Papa

[toc]

- Course homepage:
  - __Username:__ csci571
  - __Password:__ notes1

- Piazza access code: lafc3252usc

- Class ID: 17757KtZX

- Homework page: https://agentds.github.io/a1g1t10046.html

- Office Hour: Zoom Meeting

  https://usc.zoom.us/j/98121476613?pwd=VWJMWWRBKy9tTk9FSWpPRldTZGlLdz09

  Meeting ID: 981 2147 6613

  Passcode: 188837





## Homework

### Homework 1 (UNGRADED)

[Description](Assignment/HW1/HW1_Description.pdf)

- sign up GitHub 
- get student development pack from GitHub
- sign up at course homepage https://csci571.com
  - Input your information:
    - name
    - Session#
    - email
    - homework page URL (e.g. http://username.github.io/sd45fh67.html)
- sign up for Piazza and enroll in class



### Homework 2

[Description](Assignment/HW2/HW2_GitHub_Pages.pdf)

- Sign up GitHub account 
- get student GitHub develop pack (with usc.edu email)
- Sign up for GitHub Pages
- create GitHub private reposity named __username.github.io__, and clone it to local machine
- Create an index.html file in  __username.github.io__
- Create the Table of Exercises using [ScrambleThisTable.html](./Assignment/HW2/ScrambleThisTable.html) in your repo and rename it as ``[randomstring].html``
- Push all changed to GitHub remote repo



### Homework 3


- Final result: https://youtu.be/eI-YjCv1w9M
- To find the similar fonts (use FireFox for review) and size as possible as you can:
  - https://www.myfonts.com/WhatTheFont/
  - https://fonts.google.com/
- Use hyperlinks for images, rather than local images
  - https://csci571.com/hw/hw3/images/Bathroom.png
  - https://csci571.com/hw/hw3/images/Kitchen.png
  - https://csci571.com/hw/hw3/images/Bedroom.png
  - https://csci571.com/hw/hw3/images/Decor.png
  - https://csci571.com/hw/hw3/images/Cutlery.png
- Use ``CSS`` to _'crop'_ the images if needed
- Use browser tools to get the __identical colors__ used in example:
  - in firefox, use Tool->Web Developer->Eyedropper to get the color
- no response for any part of the web page
- Special character and its unicode (needed for ``Ö``): 
  - https://www.htmlsymbols.xyz/unicode
  - https://www.martinstoeckli.ch/fontmap/fontmap.html?mode=hex





#### Grading

1. To test your hw#3, please view your web page using Firefox. Resize your browser window to the same size as the Home Page PNG image and then see if you have used the correct font, color and size, and if the position of text is correct. As long as the various items on the pages are “proportionally” correct, you will get full points.
2. Resize the browser so it show your top picture , plus the extra white space as in in the video and snapshots. Then they will scroll vertically to see if the rest of the site follows the same "proportions". Lastly they will check if the site is "static" vs. "responsive", by lowering the horizontal size. The site should "crop" and no items should move with respect to each other.
3. You can decide on your "horizontal" size and then proportionally place each component on the page. If all the components are placed similarly, you will get full points.
4. Graders will resize the browse window "horizontally" to contain all your site.
5. Smaller horizontally should "crop". Larger horizontally should either 1) let the site be flush left, with a single white band on right, or 2) cenbter the site with 2 identical white bands on each side.
6. Websites are responsive, not CSS. CSS is just a tool to design the website. You can use CSS to design responsive and non responsive websites. For example, I used flexbox to design the website, but __made the website non-responsive by setting a fixed width in pixels on the body__



### Homework 5

- [AWS & Python](./Assignment/HW5/HW5_AWS_Python.pdf)
- [Azure & Python](./Assignment/HW5/HW5_Azure_Python.pdf): conda environment ``csci571``
- [Google & Python](./Assignment/HW5/HW5_Google_Python.pdf): conda environment ``gcp571``



### Homework 6

- Final result: \- https://youtu.be/1vOis6BxYq4

- Python 3.7

- Flask framework

-  HTML, CSS, JavaScript, DOM, JSON format and XMLHJpRequest object

- [Tiingo](https://www.tiingo.com/) Stocks API and [newsapi.org](https://newsapi.org/)’s News API

  - the results will be displayed in both tabular format and charts format using [HighCharts](https://www.highcharts.com/)

  - provide news articles for the selected stock using the News API

- Getting hands-on experience in GCP, AWS or Azure





Tips:

1. search button:

   - front-end JavaScript script will make a request to your web server providing it with the form data that was entered (the ticker symbol)

   - use ``GET`` to transfer the form data to your web server

     > (do not use POST, as you would be unable to provide a sample link to your cloud services)

   -  Python script using Flask will retrieve the data and send it to the Tiingo Stocks API, use the *Flask* Python framework to make all the API calls

   - **Using XMLHNpRequest or any other JavaScript calls for anything other than calling your own “cloud” backend will lead to a 4-point penalty**. **Do not call the Tiingo Stocks API directly from JavaScript.**

   - If the user clicks on the **Search** buJon without providing a value in the field, an alert should pop up “Please fill out this field”

2. Clear button: clear the result area and the text field



__Resources:__

- https://api.tiingo.com/
  - user name: siqiliang
  - email: liangsiq@usc.edu
  - password: liangsiqi1101
  - API token: ``be37d86b75ad931e483aaab61f620653921a7517``
- https://newsapi.org/docs
  - First name: Siqi
  - email: liangsiq@usc.edu
  - password: liangsiqi1101
  - API token: ``166945ff132b43c2a1a395898628ab48``
- Arrow up: https://csci571.com/hw/hw6/images/GreenArrowUp.jpg
- Arrow down: https://csci571.com/hw/hw6/images/RedArrowDown.jpg



#### Grading

- the homework will be tested on __Firefox__ and __Chrome__
- search form
  - __Clear__ button
  - __Search__ button
- search result
  - **Display company outlook information tab**
  - **Display stock information tab**
  - **Display the stock quote/volume charts tab**
- __Important__
  - Do not call APIs directly from JavaScript!!!!!!
  - Do not use jQuery!!!!!
  - use Python!!!!!
  - use cloud server!!!!
    - will be verified with an additional link in the Table of exercises, showing a sample API call to your “cloud” service and verifying the corresponding JSON result  __<u>what is this...????</u>__



### Homework 8

#### Client-Side

#### Description

- __Client-side__
  - HTML5
  - Angular 10
  - Bootstrap 4 for responsive design
- __Server-side__
  - Node.js, Express.js
  - **All APIs calls should be done through your Node.JS server**
- use AJAX, JSON
- use APIs like Tiingo API and NewsAPI
- __Watchlist__: HTML5 localstorage for 'star' 
- 



#### Routes

1. Homepage/ Search Route`` ['/']`` – It is a default route of this application
2. Watchlist Route ``['/watchlist']`` – It displays the watchlist of the user
3. Portfolio Route ``['/portfolio']`` – It displays the portfolio of the user
4. Details Route`` ['/details/<ticker>']`` – It shows the details of the ``<ticker>``



#### Tiingo API

- https://api.tiingo.com/
  - user name: siqiliang
  - email: liangsiq@usc.edu
  - password: liangsiqi1101
  - API token: ``be37d86b75ad931e483aaab61f620653921a7517``

#### Latest News

- ```python
  # newsAPIkey = '83d88b3f4f9d44ccad89772a6ef0e218'  # zsxx56.12@163.com
  newsAPIkey = '166945ff132b43c2a1a395898628ab48'  # liangsiq@usc.edu
  ```

