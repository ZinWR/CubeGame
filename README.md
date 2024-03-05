# **Cube Game**

Solo Project by - [@Quan Nguyen](https://github.com/ZinWR) 

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/quan-nguyen27/) 

**Problem:** Developers are too stressed about learning, thinking, and building full-stack projects

**Solution:** A fun entertaining survival game to help them relax and bond with the cohort members while competing in a friendly competition.

## Tech Stack

**Client:** Three.js, Vanilla Javascript - DOM

**Server:** Node, Express

**Database:** NoSQL - MongoDB

**Others:** Webpack, Nodemon, Mongoose

## Demo

<div align="center">
    <p>Gameplay:</p>
    <img alt="Gameplay" src="public\assets\demo-1.gif" width="fit" height="auto">
    <p>Leaderboard:</p>
    <img alt="Leaderboard" src="public\assets\demo-2.gif" width="fit" height="auto">
    <p>About The Project - Technical Difficulties:</p>
    <img alt="About The Project - Technical Difficulties" src="public\assets\demo-3.gif" width="fit" height="auto">
</div>

## Lessons Learned

- Mastery of `lighting, shading, and materials` in a 3D environment.
- Understanding of `3D coordinate systems` and `transformations`.
- Proficiency in handling user input for interactive experiences in both front-end and back-end development.
- Improved problem-solving skills through overcoming challenges in 3D rendering and interaction.
- Practice `DOM Manipulation` to consolidate Javascript knowledge.

## Game Features

- 3D Animation Game with Basic Controls
  
`Fun Feature`: Press the `e` key to `cycle through spin mode` on yourself (neutral ➤ vertically ➤ horizontally ➤ both ➤ stop)

- 5 Levels of Difficulties: Easy, Medium, Hard, Super Hard, Impossible

`Impossible mode`: *Automatically speed up difficulties when clicking on the animated cube on the left of the slide bar*

- Different Textures of Cohort Instructors & Members
- Live Leaderboard
- Hype Background Music

## Installation and Play

Fork, Clone & Install dependencies

```bash
  git clone https://link-to-forked-page.git
  cd CubeGame
  npm install
  npm build
```
To play on `localhost:3000`

```bash
  npm start
```  
To run in the `Dev Environment`

*Disclaimer: Three.js canvas sometimes will displace the screen when you press jump!*

```bash
  npm run dev
```    

## Stretched Features & Bug Fix for Iteration

- Fix the `MIME Restriction in Chrome` to render the Three.js file from the `'error404' folder` instead of just showing the HTML file.

- Add logic to jumping where you can `only jump once or twice not infinitely` like Kirby in Smash.

- Reorder Three.js files into `React components`.

- Integrate `React-Three-Fiber (R3F)` for reusable and self-contained Three.js components that `react to state` in React's ecosystem.


## Related Projects

[**Tech Tango**](https://github.com/63-Pink-Fairy-Armadillo/TechTango) - `Scratch Project` ➤ Social Media-like App to connect new and existing Cohort members (Junior and Senior Developers)

[**Foor Forager App V2**](https://github.com/63-Cat-Snake/Food-Forager-App-V2) - `Iteration Project` ➤ An App to search restaurants near you using geolocation coordinates 

- Restructured and Organized React components & application files.
- Added more stylings for the front end.
- Added database to keep track of **API calls**.
- Wrote and Conducted **Jest/Supertest testings** for server endpoints.
