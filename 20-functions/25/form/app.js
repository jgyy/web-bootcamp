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
  username.value && tweet.value && tweetsContainer.append(newTweet);
  username.value = "";
  tweet.value = "";
});

tweetsContainer.addEventListener("click", function (e) {
  e.target.nodeName === "LI" && e.target.remove();
});
