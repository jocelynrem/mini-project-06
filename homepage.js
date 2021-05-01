var userFormEl = document.querySelector('#user-form');
//var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#topic');
var resultsContainerEl = document.querySelector('#results-container');
var resultSearchTerm = document.querySelector('#search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    resultsContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please search something!');
  }
};

/*
var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};
*/

var getUserRepos = function (user) {
  var apiUrl = `https://www.loc.gov/search/?q=${user}&fo=json`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(user); 
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find what you are looking for!');
    });
};

/*
var getFeaturedRepos = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};
*/
var displayRepos = function (repos, searchTerm) {
    console.log(repos)
    console.log(searchTerm)
  if (repos.length === 0) {
    resultsContainerEl.textContent = 'No repositories found.';
    return;
  }

  resultSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', `./search/?q=${repoName}`);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';
    /*
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    */

    repoEl.appendChild(statusEl);

    resultsContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
//languageButtonsEl.addEventListener('click', buttonClickHandler);
