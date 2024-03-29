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
- AWS
<br>
Future technologies that may be utilized are Text Editors (e.g. Lexical) to allow users to customize text in comments.
<br>
<br>


___
## Setup Directions:
1. Clone from GitHub repository
   1. Run `pipenv install` in the `RedditClone` directory
   2. Switch to the `react-app` directory and run `npm install`
   3. Run `pipenv shell` to start the virtual environment
2. Run the following commands to create start a local session
   1. In the `RedditClone` directory, run `flask run`
   2. In the `react-app` directory, run `npm start`

___

## Description:
This is a repository of a Readdit clone by Kihong (Samuel) Bae.
<br>
This project implements 2 full CRUD features: Subreddits and Posts and 2 partial CRUD features: Likes and Comments.
<br>
This clone project also implements additional features such as:
1. Allow users to create a new account, or sign in with a Demo User account, as well as logging out
2. Search function to look up posts, communities, or users with a keyword
3. See all the posts and comments made by a particular user by visiting their profile page

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
Future features to add would be the following:
1. Allow users to create Likes/Dislikes on Comments.
2. Allow users to sort through Posts through other options, such as Most Recent, Most Popular, etc.
3. Allow users to edit previously made Comments, making it a full CRUD feature.
4. Implement a text editor to allow for more styling of comments.
<br>
