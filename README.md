![Adopt a student logo](https://github.com/eliasm307/adopt-a-student/blob/main/packages/web-app/static/assets/logo-with-text.png?raw=true)

# Adopt a Student <!-- omit in toc -->

A project for the [Europe Developer Week 2021 Hackathon](https://www.developerweek.com/europe/hackathon/), see the project [here](https://devpost.com/software/adopt-a-student-nafxvq).

- [1. Inspiration](#1-inspiration)
- [2. What it does](#2-what-it-does)
- [3. How we built it](#3-how-we-built-it)
  - [3.1. Chin Wei’s role](#31-chin-weis-role)
  - [3.2. Elias Mangoro’s role](#32-elias-mangoros-role)
    - [3.2.1. Data Model](#321-data-model)
      - [3.2.1.1. Internationalization (i18n)](#3211-internationalization-i18n)
      - [3.2.1.2. Entity relationships](#3212-entity-relationships)
    - [3.2.2. API](#322-api)
      - [3.2.2.1. Security](#3221-security)
      - [3.2.2.2. Documentation](#3222-documentation)
      - [3.2.2.3. Web App](#3223-web-app)
    - [3.2.3. Team Productivity](#323-team-productivity)
- [4. Challenges we ran into](#4-challenges-we-ran-into)
- [5. What we learned](#5-what-we-learned)
  - [5.1. Chin Wei](#51-chin-wei)
  - [5.2. Elias Mangoro](#52-elias-mangoro)
- [6. What’s next for Adopt a Student](#6-whats-next-for-adopt-a-student)
  - [6.1. Chin Wei](#61-chin-wei)
  - [6.2. Elias Mangoro](#62-elias-mangoro)

# 1. Inspiration

The spread of Covid-19 has forced schools to shut down and move classes online until further notice. There are many challenges students across the globe are facing in virtual learning such as diminishing motivation, isolation, lack of physical interaction, and poor internet connectivity.

# 2. What it does

Adopt a Student is an app that connects students and teachers around the world. It matches students to teachers and vice versa based on categories such as subjects, topics, education level, and location. Students would then be able to ask questions and receive tutorship from the teachers. The app would have a section that caters to the students and another to the teachers.

This platform opens up the responsibility of a teacher to the general public by making it easy for anyone with academic knowledge to teach students.

Adopt a Student does not substitute physical or virtual classes organized by the school. The app acts as a supporting learning platform for students to ask more questions outside of the formal classroom. It enables students to receive one-to-one interaction with tutors which are crucial for learning development. The idea is to give students the extra morale to learn online by giving them access to a big pool of educators who can help them to better understand their subjects.

# 3. How we built it

The idea was suggested by Alexandro Acha to develop a platform to manage volunteers who wish to help students who are not attending physical classes. Information is gathered from students to help identify and match with teaching volunteers.

From the onset, we realized that we had to create a minimal viable product (MVP) in a short timeframe for submission to the hackathon. The project was dubbed as a ‘Tinder-like’ app that matches students and teachers for learning purposes. The MVP was then decided to be a simple process that will allow students to signup, key in information primarily learning subjects and topics, and then view a list of matching teachers.

## 3.1. Chin Wei’s role

My role in this project was primarily as a UI UX designer. I approached the project with a standard progression starting from the discovery and strategy phase followed by developing the information architecture and then designing the UI and visual mockup.

For the discovery and strategy phase, I researched the challenges of virtual learning and looked into existing online platforms for ‘what has been done' and ‘what could be improved’.

I created an affinity map for my research which would then be used for developing user personas, one for students and another for teachers. The user personas helped in gaining a better understanding of their needs and pain points which would then inform our information architecture.

In the information architecture phase, I wrote down all the necessary functions and content to address the needs and pain points of our user personas.

The functions and content were then card-sorted and organized to develop our sitemap. I would place myself in the shoes of our user personas to figure out how they would actually journey through the app. Regrettably, real users were not used for validation due to time constraints.

As I was creating the sitemap, it soon became obvious that the user flows needed to diverge into two from the very beginning of the app. It would require the users to choose either the students' or the teachers' path with each taking them on a separate journey while sharing some similarity. The student’s journey would focus on helping them to find and successfully engage with matching teachers to acquire the needed knowledge. Meanwhile, the teachers' path would focus on creating an appealing environment for the teaching volunteers to share their knowledge easily, intuitively, and hassle-free.

The wireframes were then designed based on the sitemap using simple black and white shapes to avoid making aesthetic decisions which will be tackled in the visual mockup phase. Some revisions were made with regard to the sitemap for example the buttons ‘Ask a question and ‘Lesson request’ were added to the student’s path to streamline communication between students and teachers.

For UI and visual mockups, I did simple research and created a template mood board for reference, a color palette, and a logo design before starting on the UI and visual mockups.

For mood board research I looked at education sites, illustrations, and good UI designs. The UI style that I went for was simple and clean with a little curve on the edges.

As for the color, it was decided that green would be the main color of the app and the brand identity. Green is associated with the color of the chalkboard and also symbolizes learning growth akin to a sprout.

I created several iterations of the Adopt a Student logo in green and arrived at a design with a mortarboard iconography.

As for the usage of green in the UI, I used green shades of teal and turquoise as the primary colors such as for the header; lime green as accent color particularly for the buttons; and white and dark-desaturated blue as the neutral colors.

I picked Open Sans sans-serif typeface for its clean and readable quality. I tried several choices and was quick to eliminate serif fonts because they resonate with ‘institution’ and I wanted the app to be less formal and more approachable to the students. But at the same time, it has to be clean and modern to give confidence to the teaching professionals. Opens sans fulfills all the criteria and as a font for a learning platform, it has great legibility especially for reading.

I originally designed three slides titled ‘Connect’, ‘Learn’ and ‘Explore’ for the onboarding process to explain to the students what this app is about. But then I felt it was not enough to convey the message so I redid the slides in one illustrated story spanning 3 slides about a student’s struggle with learning from home.

My final deliverable is a clickable visual mockup consists of 61 screens following students’ path from signup to submitting lesson requests to a matching teacher. The sitemap, wireframe, UI, and visual mockup were all created in Figma.

## 3.2. Elias Mangoro’s role

My role in this project was to design and implement the data model, data controller/API, and a web application for users. I approached these various tasks in the order described below, based on how they depended on each other, which was defining the data model, then defining and implementing the API which managed interface to the data model, then developing a web app which uses the API to interface with the data model.

I decided to use Firebase for this project as it included all the technology required for the MVP ie built in authentication system, Firestore database for the data model, cloud functions for the API, and hosting for the web app. I am new to Firebase however it is a platform I have been interested in exploring for some time and it seemed like a good fit for this project.

### 3.2.1. Data Model

For the data model, the structure of this would define what functionality could be implemented on the final product that users would interact with, so it had to accommodate any currently known target functionality but also be easily extensible for any possible updates/changes such as adding fields to the information that can be assigned to different aspects.

I based the core structure around collections of entities, which in this case were Students, Teachers, Subjects, and Subject Categories. All the models and their details were defined as Typescript interfaces. For this MVP, the functionality I focused on accommodating as described following.

#### 3.2.1.1. Internationalization (i18n)

The core idea of the project is to connect students and teachers across the world so content should be personalized based on user locations and different languages.

The result is that the subject entities were split into multiple representations based on their language and country, so Maths in Canada in French would be a different subject to Maths in Canada in English. For the subject categories, these did not require separate entities, as they represented a universally recognized grouping of entities, so in this case only the information of the subject category was internationalized e.g. the name would be different based on the user’s language.

#### 3.2.1.2. Entity relationships

Another core idea of the project is “connecting” users so a relationship system between user entities was a requirement. Relationships were also required between other entities such as users relating to subjects, subjects relating to each other for users to discover related content, and those subjects relating to different categories etc.

For this to work with the required structure for i18n of multiple subject representations per locale, it was assumed that relationships were independent to locale/country independent e.g. the fact that physics is related to mathematics is true in any language or country. This meant that the relationships of subjects to other subjects, students, teachers, and subject categories had to be contained in a generic subject entity which represented all the locale/country representations of the same subject, this would allow better consistency as any relationships added by users in any language/country would be visible to all other users, i.e. no synchronisation to other languages would be required.

Some relationships also required data to be associated to them e.g. the relationship between a subject and a student or teacher could have information such as how confident the student/teacher is in that subject.

### 3.2.2. API

The methods available from the API were determined based on requirements by reviewing the wireframes and mockups produced by Chin to understand what data might be required on different screens, which described the queries required, and then also understanding the different actions a user would be able to do, which described the mutation queries required.

From the process above, a list of required API methods was produced and implemented, with the following considerations.

#### 3.2.2.1. Security

The API was made to only allow authenticated users to make requests, and some methods also include logic to prevent users from editing viewing or editing other user’s data.

#### 3.2.2.2. Documentation

The API would be used by the web app and mobile app, where the mobile app was being developed by another team member, Moh, so for usability, I knew documentation would be required. I used [tsoa](https://www.npmjs.com/package/tsoa) to generate an [OpenAPI specification](https://swagger.io/specification/) from the Typescript definitions of the methods and then used [redoc](https://www.npmjs.com/package/redoc) to represent the specification as web page. See the resulting documentation [here](https://us-central1-adopt-a-student.cloudfunctions.net/docs).

#### 3.2.2.3. Web App

This was an attempt to implement the UI design work from Chin as closely as possible. It uses the Gatsby framework and interfaces with the API. This section of the project was underdeveloped due to time constraints however it shows some of the basic functionality such as the sign-up process for students, and showing a filtered list of teachers based on a students preferences.

Note: The Firestore database was populated with fake data to show the MVP.

### 3.2.3. Team Productivity

I also took it upon myself to help the team be more organized and created a project plan comprised of 3 sprints with deadlines during the project, with the various target features to aim for at each stage. This allowed myself and other members of the team to have a clearer understanding of what we were aiming for and the priorities. This project plan was done as a Kanban board in Trello.

# 4. Challenges we ran into

The biggest challenge we ran into was the limited time that we had to create what we had in mind. This was compounded by the fact all team members were from different time zones across four continents.

The time constraint also meant that we had to create an MVP within an MVP and forgo participation from real students and teachers in the research stage and usability testing to validate our product.

# 5. What we learned

## 5.1. Chin Wei

This is my first hackathon and team collaboration as a self-learning UI UX designer so I definitely learned a lot about teamwork and the coding side of things.

## 5.2. Elias Mangoro

This is my first hackathon, where I have used a few different technologies and techniques for the first time to solve a realistic problem. I have learned a lot about the benefits and implementation details of the MVC design pattern. I have also learned more about topics such as:

- Firebase ie Firebase cloud functions, Firestore
- OpenApi/Swagger for API documentation
- NoSQL database design

As an aspiring full stack developer, this project has highlighted some areas I can improve and develop for my further development.

# 6. What’s next for Adopt a Student

## 6.1. Chin Wei

If this project gets to continue in any shape or form, I would like to see the completion of other functions aside from what was developed in the MVP.

The app has the potential to connect a big pool of untapped educators to poor students who have no internet accessibility or the appropriate learning devices such as a computer. It can for example work closely with teachers, parents, and NGOs to organize classes in poor communities. It could also adopt messaging technology such as those used by FireChat to allow students and teachers to communicate without the need for an internet connection.

Chin Wei, UI UX designer
https://dribbble.com/duckycw
https://www.linkedin.com/in/quah-chin-wei-3b58914a

## 6.2. Elias Mangoro

I think the idea and goal of the project has the potential to have a positive effect on some people’s lives so I will try to develop it further to become a usable product.

Elias Mangoro, aspiring Fullstack Developer
https://github.com/eliasm307
