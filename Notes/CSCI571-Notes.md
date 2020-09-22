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





## Lec4 HTML: Style Sheets

- start from HTML4.x

- style sheets specify:

  - the amount of white space between text or between lines
  - the amount lines are indented
  - the colors for text/backgrounds
  - font size and text style
  - the precise position of text/graphics

- Style sheet language: ``CSS``, ``XSL``

- express style within HTML:

  - ``<style>`` element and ``style`` attribute

  - ``<link>`` to point to external style sheets

    - combining style information from multiple sources, called cascading

      > There is a defined order of precedence where the definitions of a style element conflict

> **Pre-defined color** names
>
> Black="#000000"                   Silver="#C0C0C0" 
>
> Gray="#808080"                    White="#FFFFFF" 
>
> Maroon="#800000"              Red="#FF0000" 
>
> Purple="#800080"                Fuschia="#FF00FF"
>
> Green="#008000"                 Lime="#00FF00" 
>
> Olive="#808000"                   Yellow="#FFFF00" 
>
> Navy="#000080"                   Blue="#0000FF" 
>
> Teal="#008080"                    Aqua="#00FFFF"



#### Use inline stle attribute

```html
<HTML>
   <HEAD>
   <TITLE>Setting Body Attributes</TITLE> 
   </HEAD>
   <BODY style="font-size: 20pt;background: green; color: fuchsia"> 
   The nine planets of the solar system ...
   </BODY>
</HTML>
```



#### Use ``<style>`` element

```html
<HTML>
<HEAD>
  <TITLE>The Solar System</TITLE> 
  <STYLE type="text/css">
    BODY {text-align: center} 
  </STYLE>
</HEAD>
  
<BODY>
  <P>The nine planets of the solar system are <B>mercury, venus, earth, mars, jupiter, saturn, uranus, neptune and pluto.</B></P>
  <P>The very nearest star is about <I>7,000</I> times farther away than pluto is to our sun.</P>
</BODY> 
</HTML>
```

- ``ID`` attribute can only be used once in the entire document
- ``class`` rule preceded by  ``.`` and applied to multiple elements
- Values assigned to ``ID`` and ``class`` are case sensitive



#### Composite Styles

```html
font-family: Verdana, Arial, Helvetica, sans-serif; font-size:small;
font-style:normal;
font-variant:small-caps;
font-weight:bold; 
line-height:2em;
```

is equal to

```html
font: normal small-caps bold small/2em Verdana, Arial, Helvetica, sans-serif;
```



#### ``DOCTYPE`` directive

- Instructs modern browsers to work in ‘standards compliant mode
  - Your web page will look the same in **all** browsers – Browsers turn off their proprietary extensions
  - Fonts are rendered in the same way
    - For example, **font-size: small**, is rendered the same size on all browsers

- **HOWEVER**, if you do not specify a ``!DOCTYPE``, browsers work in ``Quirks`` mode
  - Internet Explorer will display fonts larger than standards mode
  - IE Uses the ‘broken box model’
    - Measures the dimensions of a box using the inner size, not the outer size as in standard mode



#### Style Sheet Media Types

- Enable authors to create documents for different media types:

```html
<HEAD>
<STYLE type=text/css media=projection>
H1 {color:blue}
</STYLE>
<STYLE type=text/css media=print>
H1 {text-align:center} 
</STYLE>
</HEAD>
```

- Used in CSS3 for __media queries__

```html
<style>
@media all and (min-width:500px) { ... } 
@media (min-width:500px) { ... } 
</style>
```

```html
<link rel="stylesheet" type="text/css" media="screen and (max-device- width: 480px)" href="min.css" />
```

- recognized media types:

  ``all``, ``braille``, ``embossed``, ``handheld``, ``print``, ``projection``, ``screen``, ``speech``, ``tty``, ``tv``, ``3d-glasses``



#### Pseudo Elements and Classes

- pseudo-classes

  - **:link** – a normal, un-visited link
  - **:visited** – a link the user has visited
  - **:hover** - a link when the user mouses over it
  - **:active** - a link the moment it is clicked
  - __:lang__ - selects every ``<p>`` element with a lang attribute
  - __:focus__ - selects the input element which has the focus
  - __:first-child__ - select every ``<p>`` elements that is the first child of its parent

- pseudo elements

  - **:first-line**, add a special style to the first line of a text

  - **:first-letter**, add a special style to the first letter of a text
  - **:before**, to insert some content before the content of an element
  - **:after**, to insert some content after the content of an element



### Properties of Style Setting

#### 1. Inheriting Style Properties

__Some CSS property values set on parent elements are _inherited by their child elements_, and some aren’t.__

- ``<DIV>`` and ``<SPAN>`` tags have no initial presentation properties
  - **exception**, line break before and after a ``<DIV>`` tag – ``<SPAN>`` applies to **inline** elements (example: ``<b>``)
  - ``<DIV>`` applies to **block** elements (example: ``<p>``)
- With CSS, properties such as text-align are “inherited” from the parent element

#### 2. Precedence (specificity)

__Specificity is how the browser decides which rule applies _if multiple rules have different selectors_ but could still apply to the same element.__

- The more precise a specification is, the higher the precedence
- a style for tag.class has higher precedence than one for .class, which has higher precedence than a style for the tag itself
- styles defined using a ``style`` attribute (inline) have highest precedence
- styles defined using ``<STYLE>`` element have next highest precedence
- styles defined in a separate file, e.g. special.css, have lowest precedence

#### 3. Cascade

__At a very simple level this means that the _order of CSS rules matter_; when two rules apply that have equal specificity the one that comes _last_ in the CSS is the one that will be used.__



### Box Model

Each box has a **content** *area* (e.g., text, an image, etc.) and optional surrounding **padding**, **border**, and **margin** areas.![boxmodel](/Users/liangsiqi/Desktop/CSCI-571/Notes/boxmodel.png)

```css
margin: 10px 5px 15px 20px;
```

means:

top margin is 10px
right margin is 5px
bottom margin is 15px
left margin is 20px



### CSS Vendor Prefixes

The CSS browser prefixes are:

- –  Android: -webkit-
- –  Chrome: -webkit-
- –  Firefox: -moz-
- –  Internet Explorer: -ms-
- –  iOS: -webkit-
- –  Opera: -o-
- –  Safari: -webkit-



### Reset CSS

- A **CSS Reset** is a short, often compressed (minified) set of CSS rules that *resets* the styling of all HTML elements to a consistent baseline.
- The goal of a reset stylesheet is to reduce browser inconsistencies in things like default line heights, margins and font sizes of headings, and so on.



## Lec5 JavaScript Basics

- JavaScript has 2 distinct systems
  - server-side JavaScript runs on Web servers
  - client-side JavaScript runs on Web browsers\
- JavaScript syntax resembles C, C++, and Java
- Developed in 10 days by **Brendan Eich**, in __May 1995__
- originally named as __Mocha__
- renamed as __LiveScript__, then __JavaScript__



JavaScript is embedded in HTML:

- in the body

  ```html
  <HTML>
  <HEAD>
  </HEAD>
  <BODY>
  <SCRIPT LANGUAGE="JavaScript">
  document.write("Last updated on " + document.lastModified + ". ")
  </SCRIPT>
  </BODY>
  </HTML>
  ```

- in the ``<head>`` as a deferred script

  ```html
  <HTML>
  <HEAD>
  <SCRIPT LANGUAGE="JavaScript">
  //the Javascript here creates functions for later use </SCRIPT>
  </HEAD>
  <BODY>
  </BODY>
  </HTML>
  ```



#### Event Handlers

- Mouse events
  - ``onclick``
  - ``onblclick``
  - ``onmouseover``
  - ``onmouseout``
- Keyboard events
  - ``onkeydown``
  - ``onkeyup``
- Object events
  - ``onload``
  - ``onunload``
  - ``onresize``
  - ``onscroll``



#### What JavaScript can do?

Designed for __manipulating web pages__, but can also be general-purpose language.

- Control Web page appearance and content (intended)
- Control the Web browser, open windows, test for browser properties
- Interact with document content
- Retrieve and manipulate all hyperlinks
- Interact with the user, sensing mouse clicks, mouse moves, keyboard actions
- Read/write client state with cookies



__Limitations of Client-side JavaScript:__

- __was__ difficult to draw graphics
  - <u>has been dramatically improved in the latest versions</u>
- No access to the underlying file system or operating system
- Unable to open and use arbitrary network connections
- No support for multithreading
- __was__ not suitable for computationally intensive applications
  - <u>has been improved in the latest versions</u>



### JavaScript

#### Basics of the Language

- __case-sensitive__ (HTML is not case-sensitive)
- __ignores__ spaces, tabs, newlines (can be __minified__)
- Semicolon is optional
- C and C++ style comments are supported



#### Literals

- __numbers__

- __boolean__

- __strings__: <u>immutable</u> (cannot be changed after created)
  - string properties: ``str.length``, ``str.tolowerCase``, ``str.toupperCase``, ``str.indexOf``, ``str.charAt``, ``str.substring``



#### Variables

- __scope__: 
  - Any variable outside a function is a **global** variable and can be referenced by any statement in the document
  - Variables declared in a function as “var” are **local** to the function
    - if var is omitted, the variable becomes global



#### Arrays

- **array properties**: 1 dimensional, indexed from zero
- ``arr.length``
- Arrays are **sparse**: most elements are not allocated after initiation
- loop
  - ``for (i=0; i<len; i++) {}``
  - ``for (x in person) {}``
  -  ``while (condition) {}``
- built-in methods:
  - ``concat()``
  - ``indexOf()``
  - ``pop()``
  - ``push()``
  - ``reverse()``

#### Object

- Objects can be nested within objects
- predefined object:
  - ``Array object``
  - ``Date object``
  - ``Function object``
  - ``Math object``
  - ``RegExp object``
  - ``String object``

#### Popup Boxes

- ``alert()``, ``confirm()``, ``prompt()``



### Common mistakes 

- **Undefined may not be null** : use ``!==`` to test, will fail if use ``!=`` 
-  **cannot overload a function**: the latest-defined version of function will be used
- **Undeclared variables are global** : if a variable is NOT declared using ``var``, then it is global



### ECMAScript

- JavaScript now controlled by the ECMA standard body
- **ECMA** stands for **European Computer Manufacturers**
- First language specification, ECMA-262, a.k.a. ECMAScript, approved in 1997, closely resembles Netscape JavaScript 1.1
- Current language specification is **ECMA-262, 10****th** **Edition, June 2019, ECMAScript © 2019**



## Lec6 JavaScript Object Notation （JSON）

#### What is JSON?

- **JSON**, short for **JavaScript Object Notation**, is a lightweight data interchange format
- JSON format is often used for transmitting structured data over a network connection in a process called __serialization__



#### Brief History

- JSON was based on a subset of the JavaScript programming language



#### How to use the JSON format?

A JSON file allows one to load data from the server or to send data to it.

Working with JSON involves three steps: 

1. the browser processing: the content of a JSON file or the definition of JSON data is assigned variavle, and this variable becomes an object of the program

2. the server processing: a JSON file on the server can be operate upon by various programming languages, and may even convert it into classes and attributes of the language

3. the data exchange between them: 

   - loading JSON file from the server may be accomplished in JavaScript in several  ways:
     - directly including the file into the HTML page, as a JavaScript .json external file
     - loading by a JavaScript command
     - using XMLHttpRequest

   - To convert JSON into an object, it can be passed to the JavaScript eval() function
   - Sending the file to the server may be accomplished by XMLHttpRequest. The file is sent as a text file and processed by the parser of the programming language that uses it



### JSON Basic Data Types

- String
- Numbers
- Booleans
- Object: __unordered__ containers of __key/value__ pairs
- Array: __ordered__ sequences of values, indexing is not mentioned in JSON (an implementation can start array indexing at 0 or 1)
- Null

> __Array vs Object__
>
> - Use objects when the key names are <u>arbitrary</u> strings
> - Use arrays when the key names are <u>sequential</u> integers

<u>__JSON is Not XML !!!__</u>

<u>JSON uses less data to represent the same information than XML!!</u>

#### Rules for JSON Parsers

- the decoder must accept all well-formed JSON text
- the decoder may also accept non-JSON text
- the encoder must only produce well-formed JSON text



### Same  Origin Policy

- ``same protocol`` + ``same host`` + ``same port``
- Same origin policy is a security feature that browsers apply to client-side scripts
- It prevents a document or script loaded from one “origin” from getting or setting properties of a document from a different “origin”



### JSON: the Cross-Domain Hack

- JSON and the ``<script>`` tag provide a way to get around the Same Origin Policy
- The src attribute of a script tag can be set to a URL from any server, and every browser will go and retrieve it, and read it into your page
- So a script tag can be set to point at a URL on another server with JSON data in it, and that JSON will become a global variable in the webpage
- So JSON can be used to grab data from other servers, without the use of a server-side proxy
- available in HTML since 1994



#### XMLHttpRequest Compared to the Dynamic Script Tag

<img src="./XMLHttpRequest-DynamicScriptTag.png">



### Arguments against JSON

- JSON doesn't have namespaces
- JSON has no validator
  - Every application is responsible for validating its inputs
- JSON is not extensible
- JSON is not XML
  - but a JavaScript compiler is a JSON decoder



<u>``Eval()`` is fast but very dangerous!</u>

To help guard the browser from insecure JSON input, use **JSON.parse()** instead of ``eval`` ; e.g.  ``JSON.parse()``  is used this way

`````json
var myObject = JSON.parse(JSONtext [, reviver]);
`````

``eval()`` will execute the string content but ``json.parse()`` will not.



### JSONP

- "JSON with padding", a JSON extension wherein the name of a callback function is specified as an input argument of the call  itself
- It is now used by many Web 2.0 applications such as Dojo Toolkit Applications or Google Toolkit Applications
- JSONP may be inappropriate to carry sensitive data (make use of script tags, and open to the world)
- supported by jQuery

