/*--------------------------------------- Fetch Data from MongoDB ---------------------------------------*/
const tableBody = document.querySelector('.tableBody');
let dataArray;
fetch('/leaderboard/users')
  .then((res) => res.json())
  .then((data) => {
    /* Process Data from Databases 
      data = {users : {data from Mongodb}}
    */
    dataArray = data.users;
    buildTable(data.users);
  });

/*--------------------------------------- Sort Table ---------------------------------------*/
$('th').on('click', function () {
  let column = $(this).data('column');
  let order = $(this).data('order');
  let text = $(this).html();
  text = text.substring(0, text.length - 1);

  if (order == 'desc') {
    $(this).data('order', 'asc');
    dataArray = dataArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    text += '&#9660';
  } else {
    $(this).data('order', 'desc');
    dataArray = dataArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    text += '&#9650';
  }
  $(this).html(text);
  buildTable(dataArray);
});
/*--------------------------------------- Build Table ---------------------------------------*/
function buildTable(users) {
  tableBody.innerHTML = ''; // Empty table then build

  users.forEach((user, index) => {
    const userRow = document.createElement('tr');
    if (index === 0) userRow.id = 'winner';
    else if (index === 1) userRow.id = 'runner-up';
    else if (index === 2) userRow.id = 'second-runner-up';
    for (let i = 1; i < 5; i++) {
      // Add each shell
      let cellText;
      const cell = document.createElement('td');

      // Preserve rank
      user.rank = !user.rank ? index + 1 : user.rank;

      if (i === 1) cellText = document.createTextNode(`${user.rank}`);
      else if (i === 2) cellText = document.createTextNode(`${user.name}`);
      else if (i === 3)
        cellText = document.createTextNode(
          `${user.min} : ${user.sec} : ${user.milsec}`
        );
      else cellText = document.createTextNode(`${user.createdAt}`);
      cell.appendChild(cellText);
      userRow.appendChild(cell);
    }
    tableBody.appendChild(userRow);
  });
}
/*--------------------------------------- Search Table ---------------------------------------*/
document.querySelector('#search').addEventListener('keyup', (event) => {
  let value = document.querySelector('#search').value;
  const data = searchTable(value, dataArray);
  buildTable(data);
});
function searchTable(value, dataArray) {
  const filteredData = [];

  for (let i = 0; i < dataArray.length; i++) {
    value = value.toLowerCase();
    const name = dataArray[i].name.toLowerCase();
    if (name.includes(value)) filteredData.push(dataArray[i]);
  }

  return filteredData;
}
/*--------------------------------------- Swap to About ---------------------------------------*/
// removeAttribute(attrName) vs. setAttribute(name, value)
// Click to hide table and show progress
document.getElementById('hideSearch').addEventListener('click', (event) => {
  document.querySelector('.container').setAttribute('hidden', '');
  document.querySelector('.timeline').removeAttribute('hidden');
});

// window.location.reload();
