/**
 * ************************************
 *
 * @module  utils.js
 * @description Utility Functions
 *
 * ************************************
 */
/*--------------------------------------- Setting Name via Cookie ---------------------------------------*/
addEventListener('beforeunload', (event) => {
  console.log('Cookie is ', document.cookie);
});

/*--------------------------------------- Save Button ---------------------------------------*/
document.getElementById('score').addEventListener('click', (event) => {
  /* Array of time [min, sec, milsec] */
  const [min, sec, milsec] = document
    .querySelector('#timer')
    .innerText.split(' : ')
    .map((el) => Number(el));
  const name = document.querySelector('#username').value;
  const body = { name, min, sec, milsec };

  /* Send Score to backend */
  fetch('/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      // Got response from server
      console.log('response data is ', data);
    })
    .catch((err) => console.log('SaveButton fetch /leaderboard: ERROR: ', err));
});

document.getElementById('leaderboard').addEventListener('click', (event) => {
  window.location.href = './leaderboard';
});
