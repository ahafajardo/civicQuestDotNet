# CivicQuest .NET

CivicQuest is a community service logging application that is targeted toward student volunteers, volunteer orginantions, and school staff. While assignment submission, school notifications, and even test administration have their own digital counterparts, mandated community service has lagged behind, usually being tracked by pen and paper, without so much as a shred of true accountability. To cover this gap, CivicQuest is planned to offer the following features:

* Visibility of tracked hours to volunteer, school staff, and the organization they volunteer for
* Approval of organizations to work for in volunteers' local area
* Revoking of invalid or falsely reported service hours.

This is a version of CivicQuest that uses .NET Core as a back-end.

## Installation

To run this project, you'll need the following tools:
* NodeJS
* Node Package Manager
* ASP .NET Core

You can use any text editor or IDE you like, but Visual Studio Code is reccomended.

After cloning the repository, here are the steps to get this application functioning:

1. Navigate to the `CivicQuestApi/` folder.
```
cd CivicQuestApi/
```
2. Run an Node Package Manager install to collect the required packages from `package.json`.
```
npm install
```
3. Run the project in dev mode to create a `build/` folder of the application's JavaScript, HTML, and CSS from the `src/` folder.
```
npm run dev
```
4. Build the C# project.
```
dotnet build CivicQuestApi.csproj
```
5. Run the C# project.
```
dotnet run CivicQuestApi.csproj
```

If you navigate to the link specified in the CLI output, you should be able to see CivicQuest's login page. The default login credentials are:

Username: `bird` Password: `bureau`

Currently, CRUD functionality for the Timesheets page and Login Validation are the only features implemented. If you would like to make a contribution, follow the guidelines below.

## Contribution

If you want to make contributions, great! Here are a few things to consider before you make those pull requests.

### Coding Conventions

There are a few conventions I'm following for the sake of consistency and readability. The linter included in the project should take care of indentation, missing semicolons, etc.

#### HTML

Please comment the name of a container element's main class underneath its ending tag. This makes the end of a large tag easier to discern.

#### JavaScript

Please follow this sequence when writing scripts for each page in the application's front-end:

1. Constant Declaration 
  * URI Strings (for routing)
  * DOM Elements
  * Etc.
2. Variable Declaration
  * URI Strings (for routing)
  * DOM Elements
  * Etc.
3. Bind DOM Events
4. Function Declaration

#### CSS

Please follow the [BEM conventions](http://getbem.com/) when writing new style rules. Also, do not get carried away with using SASS's `&` operator. Modifiers with a small number of styling rules are an ideal case for using `&`. Nesting `&`'s  should be avoided outright, and elements within blocks should generally be defined without the use of `&`.

### Git Commits

When you commit your changes to your branch, please make a habit of cataloging a summary of your most significant changes. You don't need to write more than a sentence or two, but it helps all the same.

## Final Words

Well, that's all. Thank you for reading the README, and I look forward to seeing what other people can do with this idea!
