fetch("http://localhost:8081/tweets")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div")
      const span = document.createElement("span");
      span.innerText = data[i].tweet;
      const like = document.createElement("button")
      like.innerText = "いいね"
      const likeCount = document.createElement("span")
      likeCount.innerText = data[i].likes
      like.onclick = function() {
      fetch("http://localhost:8081/tweets/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data[i].id }),
      }).then((_) => {
        likeCount.innerText = parseInt(likeCount.innerText) + 1
      })
      }
      div.appendChild(span)
      div.appendChild(like)
      div.appendChild(likeCount)
      document.getElementsByClassName("tweets")[0].appendChild(div);
    }
  });

function onTweet() {
  const tweet = document.getElementsByClassName("tweet")[0].value;
  const username = document.getElementsByClassName("username")[0].value;
  fetch("http://localhost:8081/tweets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tweet: tweet, user: username }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
