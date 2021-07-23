const tweetForm = document.querySelector("#tweetForm");
const tweetsContainer = document.querySelector("#tweets");

tweetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = tweetForm.elements.username;
  const tweet = tweetForm.elements.tweet;
  const newTweet = document.createElement("li");
  const bTag = document.createElement("b");
  bTag.append(username.value);
  newTweet.append(bTag);
  newTweet.append(`- ${tweet.value}`);
  if (username.value && tweet.value) {
    tweetsContainer.append(newTweet);
  } else {
    alert("Please enter username and tweet message");
  }
  username.value = "";
  tweet.value = "";
});
