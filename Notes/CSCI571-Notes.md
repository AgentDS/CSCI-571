# CSCI 571 Lecture Notes

[TOC]

## Lec1 Course Introduction

### Prof. Marco Papa

- E-mail: papa@usc.edu 

- Office hours: Online Only on **Zoom**: 

  – **Wednesdays 5:00PM-6:00PM PDT (9/2-11/18)** 

  – **Meeting ID: 981 2147 6613** 

  – **Passcode: 188837** 

  – **Calendar available on D2L** 

- Online course is  __Session 3__

- Exam time (PST):

  Exam #1: October 6
  Exam #2: November 24
  Final Mobile Project: December 3



### Course objectives

__Core technologies__

- HTML and CSS
- HTTP
- Web servers
- Server-Side programming using JavaScript and Python 
- Client-side programming using JavaScript and JS Frameworks 
- Ajax Development Style 



__New technologies:__

- Responsive Website Design (Bootstrap, etc.)

- JS Frameworks (Angular, React and Node.js)

- Web Services (REST)

- Web security, TOR, Dark web

- Native Mobile frameworks (Java / Android and Swift / iOS) 
- React (native)
- Cloud computing (AWS, GCP, Azure)

- Serverless Applications, Containers, Docker

- AWS Lambda, Google Cloud Functions, Azure Functions 



### Sample Web Sites

1. Modest Size:

   www.fogdog.com: 

   - Online sale of sporting goods

   Solution:

   - Commodity hardware
   - Linux server running Apache 2.0 web servers
   - Using MySQL data base
   - Move to www.ebay.com/str/fogdog:
     - F5 BIG-IP OS, Apache 2.0.64 web server

2. Medium Size:

   www.autobytel.com:

   - New/used car sale (now AutoWeb)

   Original Microsoft solution:

   - Microsoft Windows Server

   - Microsoft IIS 7.5 web server 
   - Microsoft SQL server database 
   - Akamai CDN

   Today:

   - Windows Server
   - Microsoft IIS/7.5 web server 

3. Large Size:

   www.etrade.com

   - online investing services and resources

   Solution:

   - IBM 90 xSeries running Linux/**Citrix Netscaler**, **Apache** and Tomcat web servers, AWS Route 53 (DNS)
   - Hardware facility for load balancing and redundancy 
   - Oracle database system 
   - Proprietary programming systems 



### Web server farms

- Recently all serious web sites were maintained using web __server farms__:
  - A group of computers acting as servers and housed in a single location; 
  - Internet Service Providers (ISP’s) provide web hosting services using a web server farm 
- Hardware and software is used to load balance requests across the machines 
- Other issues  addressed:
  - Redundancy
    - Eliminate single point of failure
    - Backup and failover strategy
  - Security: secure areas behind firewalls which monitor web traffic, network address translation, port translation, SSL



__Popular Web Hosting Services:__

- For individuals and small business:
  - 1 & 1
  - GoDaddy.com
  - Yahoo
- For companies willing to pay MUCH higher cosets:
  - Rackspace
  - Network Solutions
- Reviews and price comparisons:



### Cloud Computing

- **Cloud computing** is Internet-based computing, shared resources, software, and information are provided to computers and other devices **on demand**, like the electricity grid

- User does not need to be expert in the infrastructure

- Cloud computing providers applications online that are accessed from another Web service/software

  - software and data are stored on servers

- Major cloud service provider:

  - Amazon
  - Google
  - Microsoft
  - Salesforce
  - Skytap
  - HP
  - IBM
  - Apple iCloud

  

#### Example: Amazon's Elastic Compute Cloud

- A web service providing resizable compute capacity 

- __elastic:__ the service instantly scales to meet demand with no up-front investment
- user need to create Amazon Machine Image (AMI)
- Amazon’s Simple Storage Service (S3): large- scale, persistent storage 



#### Example: Google Cloud Platform

- Basic compute, storage, big data services, massively scalable gaming solutions, mobile application backend, and Apache Hadoop
- App Engine: A platform for building scalable web applications and mobile backend, scales automatically in amount of traffic it receives
- Compute Engine: Offers predefined virtual machine configurations 
- Google uses <u>software-defined networking</u> technology to route packets across the globe and enable fast <u>edge-caching</u> so that data is where it needs to be to serve users





### Serverless Architecture

- Internet based systems, application development noes not use the usual server process
- rely on combination of:
  - 3-party services, or Backend as a Service (BaaS)
  - Client-side logic
  - Service hosted remote procedure calls, or Function as a Service (FaaS)
- __AWS Lambda__ is implementations of FaaS 



### Web Browsers Use Standard Layout Engines

- __WebKit:__ used to render web pages, open source
  - used by Chrome and Safari web browsers
- __Gecko:__ layout engine of Firefox web browser
  - used to display web pages and application's user interface
  - provide rich programming API
  - Originated with Netscape Communications Corporation
- Some web kits and the browsers that use them 
  - **Gecko-based**: FireFox (Mozilla), Flock, Netscape 
  - **Trident-shells**: Internet Explorer (Microsoft) 
  - **EdgeHTML**: Edge (Microsoft), fork of Trident 7 <u>Jan 2020 moves to Chromium</u>
  - **WebKit-based**: Chrome and Android (Google), Midori, Safari and Mobile Safari (Apple), Symbian$^3$ (Nokia) and many others 
  - __Chromium:__ Chrome
  - **Presto-based**: Opera, Nintendo DS, Opera Mini, Opera Mobile 
  - **Java-based**: HotJava, Lobo 



__Web Browsers__ can:

1. Mouse-driven graphical user interface
2. Display of
   - Hypertext documents (HTML standard)
   - Text with fonts/styles/point_size
   - Foreign-language character sets (ISO-8859)
   - Forms composed of edit boxes, check boxes, radio boxes, lists, text areas 
   - Graphics in different formats 
3. Invoke helper applications and plug-ins <u>(Obsoleted in HTML5)</u>:
   - _Adobe Acrobat_ (pdf files)
   - _Windows Media Player_ (digital sound files)
   - _Adobe Flash Player_ (video) <u>Retired in 2020</u>
4. Communicate over a secure channel (SSL)
5. Maintain/Exchange digital certificates 
6. Run scripts in JavaScript
7. run Java applets and Active X components (**also** **obsoleted in HTML5**)  



__Browser rank:__ Chrome > Firefox > Edge/IE > Safari > Opera

85% of browsers use __WebKit__ !!!!!



__Internet Explorer Browser Caching:__

- <u>History:</u> Links/URLs accessed before
- <u>Disk cache:</u> Temporary internet files
- <u>Memory cache:</u> Session-based information that is cached during the session
- <u>Offline content:</u> Web content is downloaded when online and viewed offline



### Evolution of Web Sites

- 1st gen (1991):
  - Client-centric, Static
  - HTML, Scripts, CGI
- 2nd gen (1997):
  - Server Applications, Databases, Dynamic web pages
  - ODBC, JDBC ASP, Applets, ActiveX
- 3rd gen (2000):
  - Web services Multiple layers, Business and service Integration
  - XML, WML, SQL, .NET, COM+, Beans
- 4th gen (2005):
  - Service Oriented Arch (SOA), Client-centric
  - Ajax, Web 2.0, JSON 
- 5th gen (2008):
  - Multi-platform (desktop, tablet, phone), Client-centric 
  - HTML5, CSS3, JS, gestures navigation
- 6th gen (2014):
  - IoT, Wearables, Cloud computing, Serverless Arch (Baas, Faas)
  - JS Frameworks, AWS, GCP, Azure, Microservices containers

