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

<p align="center">
Gameplay:

![CubeGame demo gif](https://github.com/ZinWR/CubeGame/assets/97579692/b6bd63e4-9180-4460-8b09-cee546d09e29)

Leaderboard:

![CubeGame demoGIF 2](https://github.com/ZinWR/CubeGame/assets/97579692/ddedb236-2a11-43a4-b455-a2e095812537)

About The Project - Technical Difficulties:

![CubeGame demoGIF 3](https://github.com/ZinWR/CubeGame/assets/97579692/88dfbb54-f7ba-484e-a592-6e451ac3123a)
</p>


## Lessons Learned

- Mastery of lighting, shading, and materials in a 3D environment.
- Understanding of 3D coordinate systems and transformations.
- Proficiency in handling user input for interactive experiences in both front-end and back-end development.
- Improved problem-solving skills through overcoming challenges in 3D rendering and interaction.
- Practice DOM Manipulation to consolidate Javascript knowledge.

## Game Features

- 3D Animation Game with Basic Controls
- 5 Level of Difficulties: Easy, Medium, Hard, Super Hard, Impossible (*Automatic*)
- Different Textures of Cohort Instructors & Members
- Live Leaderboard
- Hype Background Music

## Installation and Play

Fork, Clone & Install dependencies

```bash
  git clone https://link-to-forked-page.git
  cd "Cube Game"
  npm install
  npm build
```
To play the game:

```bash
  npm start
```  
To run in the Dev Environment 

*Disclaimer:* Three.js canvas sometimes will displace the screen when you press jump!

```bash
  npm run dev
```    

## Roadmap for Iteration

- Fix the **MIME Restriction in Chrome** to render the Three.js file from the 'error404' folder instead of just showing the HTML file.

- Add logic to jumping where you can **only jump once or twice not infinitely** like Kirby in Smash.

- Reorder Three.js files into **React components**.

- Integrate **React-Three-Fiber (R3F)** for reusable and self-contained Three.js components that react to state in React's ecosystem.


## Related Projects

[**Tech Tango**](https://github.com/63-Pink-Fairy-Armadillo/TechTango) - [**Scratch Project**] ➤ Social Media-like App to connect new and existing Cohort members (Junior and Senior Developers)

[**Foor Forager App V2**](https://github.com/63-Cat-Snake/Food-Forager-App-V2) - [**Iteration Project**] ➤ An App to search restaurants near you using geolocation coordinates 

- Restructured and Organized React components & application files.
- Added more stylings for the front end.
- Added database to keep track of **API calls**.
- Wrote and Conducted **Jest/Supertest testings** for server endpoints.
