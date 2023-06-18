# Codelivery

<p align="center"> 
  <a href="https://fullcycle.com.br/" target="_blank">
    <img width="auto" src="https://www.datocms-assets.com/75941/1667506422-technology-vercel-dark-02-cms-view-2.png?fit=crop&fm=webp&h=490&w=734"/>
  </a> 
</p>

<h4 align="center" > 🚀 🟨 Full Cycle Event - 2023 🟨 🚀 </h4>

<h4 align="center">
  Application developed during a Programmer Event, the <a style="color: #8a4af3;" href="https://github.com/search?q=imers%C3%A3o%20full%20cycle&type=repositories" target="_blank">Full Cycle Immersion</a> promoted by <a style="color: #8a4af3;" href="https://fullcycle.com.br/" target="_blank">@FullCycleSchool</a>
</h4>

#

<p align="center">
  |&nbsp;&nbsp;
  <a style="color: #8a4af3;" href="#project">Overview</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a style="color: #8a4af3;" href="#techs">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a style="color: #8a4af3;" href="#app">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
  <a style="color: #8a4af3;" href="#run-project">Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
  <a style="color: #8a4af3;" href="#author">Author</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

#

<br>

<p id="project"/>

<h2>  | :artificial_satellite: About:  </h2>

<p align="justify">
  This project is a application of a complete Full Cycle project, with amazing technologies like NextJS for front-end, NestJS for back-end, PostgreSQL database, GO Lang for microsservice, Docker & Kubernetes for devops, metrics with Elastic Search & Kibana, Message / Event Driven Architeture with Kafka and more.
</p>

<img src="https://github.com/Samuel-Ricardo/travel_simulator/raw/main/readme_files/techs.png"/> 

<p align="justify">
    This is the real time transportation application Codelivery, powered by NextJS that monitoring and trigger travels. You can switch between the different types of travels and follow theys by a colored route and Icons that represent the car and the destiny.
</p>

<p align="justify">
   For all this was used very powerful technologies and platforms, with a complete ecosystem of microsservice, back-end, elastic platform, kafka, kubernetes, GCP all this conected and comunicating in real time with websockets and data stream sustained by the resilience of Kafka on Confluent.
</p>

> <a href="https://samuel-ricardo.github.io/"> <img src="https://github.com/Samuel-Ricardo/travel_simulator/raw/main/readme_files/app_preview.png"> </a>

  <br>
  
- This APP is hosted on [ [Vercel]("https://codelivery-site-git-main-samuel-ricardo.vercel.app/") ]
- Current Version: <b> 1.0.0 </b>

<br/>

- Front-End     : NextJS   | [ [repositories](https://github.com/Samuel-Ricardo/codelivery-site)  ] 
- Back-End      : NestJS   | [ [repositories](https://github.com/Samuel-Ricardo/codelivery_api)  ]
- microsservice : GO Lang  | [ [repositories](https://github.com/Samuel-Ricardo/travel_simulator/tree/main)  ]

#

<br>

<h2 id="techs">
  :building_construction: | Technologies and Concepts Studied:
</h2>

> <a href='https://nextjs.org/'> <img width="128px" src="https://pbs.twimg.com/card_img/1669374288581853186/RoVDMNTV?format=jpg&name=4096x4096" /> </a>

- NextJS
- Websockets
- SocketIO
- MaterialUI
- Typescript
- Google Cloud Platform
- Google Maps 
- Kafka
- Docker
- Mullti Thread and Concurrency
- Perfomance
- Event Driven Architeture
- Scalability
- Real Time

> Among Others...

<br>

#

<h2 id="app">
  💻 | Application:
</h2>


<img src="https://github.com/Samuel-Ricardo/travel_simulator/raw/main/readme_files/scheme.png" />

- Front-End     : NextJS   | [ [repositories](https://github.com/Samuel-Ricardo/codelivery-site)  ] 
- Back-End      : NestJS   | [ [repositories](https://github.com/Samuel-Ricardo/codelivery_api)  ]
- microsservice : GO Lang  | [ [repositories](https://github.com/Samuel-Ricardo/travel_simulator/tree/main)  ]
- Devops        : Kafka | Elastic  - [ [repositories](https://github.com/Samuel-Ricardo/travel_simulator/tree/main)  ]

<br>

<p align="justify">
  In Resume this project have a Microsservice responsible to start and manage a travel returning the travel data in real time by streams, kafka recive this data and garant that all comunications between applications work together without data loses and with scalable Perfomance of Kafka platform.
</p>

<p>
    The Back-End send by kafka a event to microsservice that trigger a start of a route, after that, the route data like position and if is it finished are send to kafka, the back end listen the event by kafka and get data to handle it and send to front end, that render all date with the travel route and real time position, cleaning it when finished.
</p>

<p align="justify">
    All data is tracked and stored in Elastic Search with kafka intermediator that provide by your platform the Kibana that create amazing views to handle with Data Analytics building beautiful graphics for example.
</p>

<br>

- This application is hosted on [Vercel]("https://codelivery-site-git-main-samuel-ricardo.vercel.app/")
- This application infrastructure is hosted on Google Cloud Platform with Kubernetes - [GCP]
- Kafka runs with Confluent

<br>

<h2 id="run-project"> 
   👨‍💻 | How to use
</h2>

<br>

### Open your Git Terminal and clone this repository

```git
  $ git clone "git@github.com:Samuel-Ricardo/codelivery-site.git"
```

### Make Pull

```git
  $ git pull "git@github.com:Samuel-Ricardo/codelivery-site.git"
```

<br>

This application use `Docker` so you dont need to install and cofigurate anything other than docker on your machine.

> <a target="_blank" href="https://www.docker.com/"> <img width="48px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" /> </a>

<br>


Navigate to project folder ` $ cd ./transport_application/ ` and run it using ` docker-compose `


```bash

  # After setup docker environment just run this commmand on root project folder:

  $ docker-compose up --build   # For First Time run this command

  $ docker-compose up           # to run project


```

```bash

  #Apps Running on:

  $ API: http://localhost:3001

  See more: ./transport_application/docker-compose.yaml

```

#

<br>

<h2 id="author">
  :octocat: | Author:  
</h2>

> <a target="_blank" href="https://www.linkedin.com/in/samuel-ricardo/"> <img width="350px" src="https://github.com/Samuel-Ricardo/bolao-da-copa/blob/main/readme_files/IMG_20220904_220148_188.jpg?raw=true"/> <br> <p> <b> - Samuel Ricardo</b> </p></a>

<h1>
  <a herf='https://github.com/Samuel-Ricardo'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel%20Ricardo&color=black&style=for-the-badge&logo=GITHUB'> 
  </a>
  
  <a herf='https://www.instagram.com/samuel_ricardo.ex/'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel.ex&color=black&style=for-the-badge&logo=instagram'> 
  </a>
  
  <a herf='https://twitter.com/SamuelR84144340'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel%20Ricardo&color=black&style=for-the-badge&logo=twitter'> 
  </a>
  
   <a herf='https://www.linkedin.com/in/samuel-ricardo/'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel%20Ricardo&color=black&style=for-the-badge&logo=LinkedIn'> 
  </a>
</h1>
