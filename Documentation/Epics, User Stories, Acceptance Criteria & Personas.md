Epics, User Stories, Acceptance Criteria & Personas.  

Tutorial  

User Stories  

A user story is a snippet of what the user wants or how the solution might impact them that is captured to form a requirement. Basically, they detail the features of the solution and they are based on the personas of the users.  

This can be displayed like so:  

As a *Persona*  

I want to *perform an action using the service/website*  

So that *I can solve this problem/fulfil this motivation/gain this benefit*  

  

Stories are:  

Written from the user’s perspective (and for the benefit of the user)  

Independent from other stories  

Not concrete (subject to clarification)  

Purposeful (have value)  

Testable (know when it is done)  

Abstract (nothing concrete)  

  

Acceptance Criteria  

This defines the scope of the story and when it has been finished.  

These can provide the foundations for tests and are just yes or no questions.  

They are usually in the form of:  

Given: a certain pre-condition/context  

When: a user carries out an action  

Then: a certain outcome occurs  

You can provide multiple points for each.  

They should only focus on behaviour.  

  

NFRs  

Acceptance criteria can also be captured through questions that can be asked by the user and are specific. Use of any quantitative measures are good (e.g. can support 1000 users, page loads in 2 seconds). Avoid any words too vague.  

When thinking of questions, you can use these as reference:  

Performance  

Availability  

Usability  

Maintainability  

Reliability  

Portability  

Security  

Accessibility  

These can be subject to change or added at any time.  

Breaking Down Stories  

From user stories you should be able to form specific tasks that can be estimated and completed during a sprint. User stories that are too large or non-specific are called Epics.   

Anything to large or vague need to be broken down into user stories small enough (but not too small) that you can make tasks from them. Tasks that can feasibly be completed in a sprint.  

  

Any other information you should need on this (including how to break down stories) can be found in this canvas pdf:  

  

  

GitHub  

Don’t commit directly to the main branch. Every commit to the main branch should be done through a pull request from a branch or a fork.  

Reference the issue your pull request relates to in the description (#*issue number*)  

PRs should be checked by someone other than you before merge  

  

Alex's Narrative 

Alex is a first-year student ready to explore and be active in multiple societies, looking for a streamlined, convenient way to stay informed about events and activities, as well as browse potential societies he might be interested in. The problem is, Alex is pretty tech-illiterate and has trouble keeping up to date with university ongoings. Using UniSphere, Alex has all his society related needs easily condensed in a digestible format.  

  

Epic 1: Engagement and Discovery 

User Story 1: Staying Informed About Society Events 

As Alex, 

I want to stay informed about events happening in societies I'm a part of, 

So that I can participate in the events I'm interested in. 

Acceptance Criteria 	 

Given: Alex is a member of a society, 

When: Alex navigates to the events page, 

Then: Alex sees information about upcoming events from the society. 

NFRs 

Availability: Can Alex view event details even after the event has occurred? 

Accessibility: Can Alex access event information without advanced technical knowledge? 

Portability: Can Alex access event information on his phone? 

User Story 2: Discovering New Societies 

As Alex, 

I want to be able to find and explore new societies, 

So that I can join societies that match my interests. 

Acceptance Criteria 

Given: Alex has created an account on UniSphere, 

When: Alex navigates to the societies page, 

Then: Alex is presented with a list of societies to explore and potentially join. 

  

NFRs 

Accessibility: Can Alex browse through society information before deciding to join? 

Availability: Can Alex explore other societies even if he is already a member of one?Top of Form 

Sam's Narrative  

Sam is a second-year student with a interest in developing leadership skills and making contributions to university societies. Despite having a vision for enhancing society activities and fostering a vibrant community, Sam often finds it challenging to identify and take leadership opportunities within these groups. The current systems in place are fragmented and do not provide a centralized platform for managing or applying for roles that match his skills. With UniSphere, Sam envisions a sleek way to connect with societies seeking leaders, apply for positions, and manage his involvement in various activities. The platform's user-friendly interface and comprehensive features would empower him to easily explore opportunities, engage with society members, and contribute to the society life.  

Epic 1: Account and Access Management  

User Story: Basic Account Creation  

As a new user,  

I want to easily create an account on UniSphere,  

So that I can join and interact with societies.  

Acceptance Criteria  

Given: A user is on the UniSphere homepage,  

When: The user clicks on "Sign Up" and completes the registration form,  

Then: The user's account is created, and they are logged into UniSphere.  

NFRs  

Usability: Is the sign-up process intuitive and straightforward?  

Performance: Does the account creation process complete within 5 seconds?  

User Story: Secure Login Mechanism  

As a registered user,  

I want to securely log in to my UniSphere account,  

So that I can access my profile and society information.  

Acceptance Criteria  

Given: A user has a registered account,  

When: The user enters their credentials on the login page,  

Then: The user is granted access to their UniSphere account if the credentials are correct.  

NFRs  

Security: Is the login process secure against common cyber threats?  

Reliability: Can users consistently log in without encountering errors?  

  

Epic 2: User Experience Fundamentals  

User Story: User Profile Customization  

As Sam,  

I want to customize my profile,  

So that I can express my personality and interests to the community.  

Acceptance Criteria  

Given: Alex is logged in,  

When: Alex navigates to his profile settings to add a profile picture and personal interests,  

Then: His profile is updated with the new information.  

NFRs  

Usability: Can users easily find and use the profile customization options?  

Performance: Do changes to the profile update in real-time?  

User Story: Responsive Design for Mobile Users  

As Sam,  

I want to use UniSphere on my smartphone without issues,  

So that I can manage my society's activities on-the-go.  

Acceptance Criteria  

Given: Jackie accesses UniSphere on her smartphone,  

When: She navigates through different sections of the app,  

Then: The app provides a seamless experience, adapting to her device's screen size.  

NFRs  

Portability: Does the app provide a consistent experience across different devices?  

Usability: Are the app's features easily accessible on a smaller screen?  

  

  

  

User signup  

Users can create an account with a unique username. This account will be created with basic user information (i.e. username, display name, interests(?), bio(?))  

Users can create an account with a secure password.  

  

User login & Authentication  

Users can log in with their unique username and password.  

Users can access and modify their account information.  

Users cannot login or modify data without secure password.  

  

Viewing Main Feed  

Users can view feed of posts from all societies.  

Users can interact with posts on main feed.  

Users can navigate website and access to and from main feed.  

  

Following Societies  

Users can search for and find societies.  

Users can register interest and join societies.  

Users can view necessary information about the societies they want to join.  

  

Communicating with society (member)  

Users can interact with posts on society pages.  

Users can contact committee members through the society page.  

  

Communicating with society (committee)  

Society admins can create posts on their society page.  

Society admins can view metrics on society posts, such as engagement.  

Society admins can respond to messages from members.  

  

Managing a society  

Society admins can invite users to the “committee” to give them admin privileges.  

Society admins can create posts and events to be sent out publicly, or privately (to society members)  

Society admins can modify society information.  

  

Creating a society (?)  

Users can request to create a society.  

Users can fill out a form with required information for their society.  

Users can allocate committee members to their society upon creation (at least 3 must be present).  

  

  

Creating a post / event (committee)  

Society admins can use a form system to write messages to the society.  

Events created must contain valid fields (i.e. time, location, duration, description).  

Society admins can modify event information.  

  

Interacting to a post / event (member)  

Users can register interest, accept or decline events.  

Users can comment on posts or events.  

Users can add events to external calendars (?).   
