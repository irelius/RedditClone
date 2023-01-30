# Readdit Clone Project

Render Link: https://irelius-readdit-project.onrender.com/

GitHub Link: https://github.com/irelius/RedditClone

___
## Technologies/Languages Used:
- JavaScript
- Python
- React / Redux
- Flask
- SQLAlchemy
<br>
Future technologies that may be utilized are Text Editors (e.g. Lexical) and AWS to allow users to post images and videos.
<br>
<br>


___
## Setup Directions:
1. Clone from GitHub repository
   1. Run `pipenv install` in the `RedditClone` directory
   2. Switch to the `react-app` directory and run `npm install`
   3. Run `pipenv shell` to start the virtual environment
2. Run the following command in your terminal to run the migration and seeder files within the `RedditClone` directory
   1. `flask db init && flask db migrate && flask db upgrade && flask seed all`
3. Run the following commands to create start a local session
   1. In the `RedditClone` directory, run `flask run`
   2. In the `react-app` directory, run `npm start`

___

## Description:
This is a repository of a Readdit clone by Kihong (Samuel) Bae.
<br>
This project implements 2 fully CRUD features: Subreddits and Posts.
<br>
This clone project also implements a feature to allow users to create a new account, sign in with a Demo User account, and log out.

___

## Landing/Main Page:
Whether or not the user is logged in, accessing the website will direct the user to the Landing Page (the following image uses a Landing Page assuming the user is logged in):
![Readdit Landing Page](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Landing_Page.png)
If the user is not logged in, there will be an option to "Log In" or "Sign Up" in the right section of the Nav Bar.
![Readdit Login Form](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Login_Form.png)
![Readdit Signup Form](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Signup_Form.png)
After logging in, the user will be redirected back to the Landing Page, which also functions as the Main Page where users will be able to see all of the posts made to this cloned website. Users will also be able to see a list of Subreddits on the right hand side.

___

## Subreddits:

### Create a Subreddit
Users are able to create a new Subreddit with a custom name and an optional description. Names are unique and thus two Subreddits of the same name cannot be created. However, Subreddit names are not case sensitive.
![Readdit Create Subreddit Form](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Create_Subreddit_Form.png)
<br>
<br>

### Read Subreddits:
Redux will load the list of Subreddits in the "Readdit Communities" bar on the right hand side of the Landing/Main page. From there, users are able to click on a specific Subreddit to go to its main page.
![Readdit Read Subreddit Page](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Specific_Subreddit_Page.png)
<br>
<br>

### Updating Subreddits:
If the user is the admin of a Subreddit, there will be an option to edit the Subreddit's description. Currently, this is the only feature of Subreddits that can be updated. In the future, the plan is to allow users to update more features of a Subreddit like Subreddit color scheme, icon image, members, privacy settings, etc.
![Readdit Edit Subreddit Page](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Subreddit_Edit_Form.png)
<br>
<br>

### Deleting Subreddit:
If the user is the admin of a Subreddit, there will be an option in the Subreddit Bar named `Delete Subreddit`. This will delete the Subreddit for everyone and will also subsequently delete all posts made to the Subreddit. Currently, only the user that created the Subreddit will have authorization to delete a Subreddit.
![Readdit Delete Subreddit Page](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Subreddit_Specific_Bar.png)
<br>
<br>

___

## Posts:

### Create Posts:
Users are able to create Posts to Subreddits. Other users and even individuals who are not logged in will be able to see the Post. In the future, if/when the privacy setting is implemented to Subreddits, this will change so that only users part of a Subreddit will be able to see Posts made to it.
![Readdit Create Post Form](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Create_Post_Form.png)
<br>
<br>

### Read Posts:
Posts will load via Redux on the Landing/Main Page or a Subreddit's main page, either loading all of the posts made or only the posts made to a particular subreddit respectively.
<br>
<br>

### Edit Posts:
Users are able to update their post's body. They are unable to update a post's title, this is not a function that will be implemented as it is not a function Readdit allows for.
![Readdit Edit Post Form](https://raw.githubusercontent.com/irelius/RedditClone/main/assets/Reddit_Post_Edit_Form.png)
<br>
<br>

### Delete Posts:
Users are able to delete their posts. As posts can only be made to Subreddit pages, the admins of a particular Subreddit will also have permission to `Remove` a post, which also functions the same as deletion.

<br>
<br>

___

## Future Features:
Future features to add would be to allow users to add Comments and Likes/Dislikes on Posts. Comments would also be a full CRUD feature whereas Likes/Dislikes would be a partial CRUD features.
Other bonus features that could be added is the ability for users to upload photos/files for Posts and Subreddit icons as well as implementing a search bar to allow users to search for a particular Subreddit by name, instead of having to rely on the Subreddit bar on the Landing/Main page.
<br>
