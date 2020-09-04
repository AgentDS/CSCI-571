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



## Lec2 Internet Trends and Web Basics

### Internet Trends

- Internet:__ a global digital infrastructurethat connects computers

- __WWW:__ a mechanism that unifies the retrieval and display of a subset of data on the Internet

- __Intranet:__ a local/global information structure that connects an organization internally. (also use Web technologies now)
- __Extranet:__ a private network that uses the public telecommunication system to securely share part of a business's information/operations



__Recent trends in Internet Development:__

- Growth:
  - number of users connected 
  - Smartphone use (iOS/Android)
  - digital data (photo/video)
  - Social media
  - Internet use from Mobile/tablet (平板和移动端) over desktop/laptop
  - use of cloud
- Derease: dominance of Microsoft Windows



Host counts in 2019 > 1,012 million



### IoT

__IoT:__ the Internet of Things

#### IoT Protocols

- Device/thing to Gateway:
  - ZigBee: Wireless sensors
  - BLE: Wireless sensors
  - ModBus (Serial or TCP)
- Gateway to Server:
  - ModBus TCP: common
  - OPC: common for industrial assets
  - HTTP: JSON over HTTP
  - MQTT: Consumer oriented, promising



#### IoT platforms

- Amazon IoT
  - Physical/Shadow Device (Persisted JSON State)
  - MQTT Endpoint
  - Rules
  - AWS Connectivity
- GE Predix 2.0 (PaaS)
  - CloudFoundry, HDP
  - Asset Model, Machine Connectivity, Time Series DB, Analystics Plugin (BPMN)
- PTC ThingWorx
  - Originally HMI for TCP-connected devices
- Xively
  - Device connectivity, time series database, connectivity to applications
  - Popular with Arduino developers



### Domain Name System (DNS)

__DNS resolution:__

- when visit a website, the computer need to perform DNS lookup
- Complex pages require multiple DNS lookups before loading 
- DNS latency mainly from:
  - round-trip time to make the request and get the response, due to network congestion, overloaded servers, denial-of-service attacks 
  - Cache misses which cause recursive querying of other name servers 
- Google has introduced **Google Public DNS** 
  - use 8.8.8.8 and 8.8.4.4 
  - handles more than 70 billion requests ***a day!*** 
  - Google also has IPv6 addresses 
- Another alternative is **opendns.com**
  - a global network of DNS resolvers to speed resolution
  - Free for basic service, but upgrades cost





### Internet Domain Names

- DNS is a mapping to/from IP addresses to domain names
  - Defined in RFC 1034, 1035
- 13 top level root name services
- founded in 1998, ICANN is the organization in charge of maintaining the DNS system



#### Top Level Domain Names (TLDs)

- __In 1984__, __originally__ divided into __6__ logical categories
  - com
  - edu
  - gov
  - mil
  - net
  - org
- __In 2001__ new top level domain added:
  - biz, info, name, musem, coop, aero, pro, xxx 
- __In 2009__ ICANN agreed to accept internationalized domain names, encoded as Unicode
- __In 2011__ ICANN announced expansion of TLDs, giving requirements for anyone wanting to establish one

<u>In 2019 ``.com``, ``.net`` are the most popular top name domain.</u>



### World Wide Web

Define:

- A wide-area hypertext, multimedia information retrieval system that provides access to a large universe of documents 
- A uniform way of accessing and viewing some information on the Internet 
- WWW subsumes the capabilities of ftp, gopher, wars, and news

<img src='./graphWWW.png' height=250>

#### Major Technology Components

- Client/server architecture: client programs interact with web
  servers
- Network protocol: HTTP understood by browsers and web servers
- Addressing system (Uniform Resource Locators)
- Markup Language: support HyperText and multimedia



#### WWW server

- Web browsers/servers communicate according to a protocol (HTTP)
  - current HTTP is version 1.1
- The Web server is a software system running on a machine often called the Web server 
- A web server __can__

  - receive/reply to HTTP requests

  - retrieve documents from specified directories 
  - run programs in specified directories

  - handle limited forms of security 
- A web server __does not__
  - know about the contents of a document, links in a document, images in a document or whether a particular file, e.g. a *.gif file, is in the correct format



#### Uniform Resource Locator (URL)

- A mechanism whereby an Internet resource can be specified in a single line of ASCII text
- RFC 1738



__General description of URL:__

1. Scheme
   - http:, ftp:, news:, wais:
2. Double dash //
3. Internet domain name: usc.edu
4. Port number (optimal)
5. Path



#### Markup Languages

- HTML: hypertext markup language, specifies document layout and the specification of hypertext links to text, graphics and other objects 
- Browsers display text and graphics using the markup as guidance 

> HyperText: Regular text, with the additional feature of links to related documents





## Lec3 HTML

#### What is HTML?

- hypertext markup language (HTML) can describe:
  - The display and format of text
  - The display of graphics
  - Pointers to other html files
  - Pointers to files containing graphics, digitized video and sound
  - Forms that capture information from the viewer
- HTML: by __Tim Berners-Lee__ of CERN around 1990
- understand by WWW browsers



#### Version of HTML

- 1990 V0: original one
- V1: highlighting & images
- 1995 V2: V0 + V1 + forms
- 1997 V3.2: released by W3CW, tables
- 1999 HTML4.01
- 2014 HTML5: vocabulary & APIs
- 2017 HTML5.2
- 2019: __HTML Living Standard__ 
- W3C & WHATWG agreement



#### HTML General Structure

- HTML documents have a __head__ and __body__

- A leading line indicates the version of HTML

  ```html
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">
  ```

- __comments in HTML:__ ``<!--this is comment-->``, cannot be nested

> IE/Firefox are tolerant browsers:
>
> - not insist that the HTML document begin and end with ``<HTML>``
> -  ``<HEAD>`` and/or ``<BODY>`` tags are not required

- HTML chracter set

  - HTML uses __Universal Character Set (UCS)__, defined in ISO10646
  - Character references:
    - __numeric__
    - character __entity__

- HTML anchor

  - to designate a **link to another document** or to a specific place in the **same document**
  - anchor ``name``: __Unique__ & __String matching__
  - anchor using ``id`` attribute: use ``href=#id`` where ``id`` is from other tag
  - ``id`` and ``name`` attributes share the same name space (cannot use same as each other)

- Universal Resource Identifier (__URI__): 

  - **scheme** of the mechanism used to access the resource
  - name of the machine **hosting** the resource
  - name of the **resource** itself, given as a **path**

  > - *Fragment identifiers* are URIs that refer to a location within a resource
  >
  >   e.g. http://www.usc.edu/dept/cs/index.html**#section2**

- ``link`` element in ``<head>`` part: provide a variety of information to search engines

  - Links to **alternate versions** of a document, written in another human language
  - Links to alternate versions of a document, designed for **different media**
  - Links to the starting page of a collection of documents
  - Links to style sheets and “**media queries**” used in Responsive Web Design

- Create graphic:

  - image source:
    - digital camera/phone
    - graphic editor
    - scanner
  - image format:
    - __x-pixelmaps__: 256 colors
    - __GIP__
    - __JPEG__: includes image compression; for photographic images
    - __PNG__ (portable network graphics): lossless compression; patent-free compared with GIF & TIFF
  - why ``alt`` attribute in ``<img>`` tag? replace an image with text, if the image is unavailable or a text browser is used
  - active image: with a border around it and the cursor changes shape when passed over
  - ``usemap`` attribute in ``<img>`` tag

- ``<meta>`` element: insert Name/Value pairs describing document properties

  - ``<meta>`` & robotic exclusion: ``<meta name="robots" content="[no]index,[no]follow">``
    - index: whether the search engine can index the page
    - follow: whether the web crawler can follow links contained by the page

- Why validate HTML?

  - Browsers display HTML differently
  - Browsers treat HTML errors differently

