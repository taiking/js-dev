fetch("http://localhost:8081/tweets")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div")
      const span = document.createElement("span");
      span.innerText = data[i].tweet;
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "削除"
      deleteButton.onclick = function() {
        fetch("http://localhost:8081/tweets/" + data[i].id, {
          method: "DELETE"
        }).then((_) => {
          div.remove()
        })
      }
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
      div.appendChild(deleteButton)
      div.appendChild(like)
      div.appendChild(likeCount)
      document.getElementsByClassName("tweets")[0].appendChild(div);
    }
  });

function onTweet() {
  const tweet = document.getElementsByClassName("tweet")[0].value
  const username = document.getElementsByClassName("username")[0].value
  if (tweet.length === 0 || username === 0) {
    alert('ツイート内容とユーザー名は1文字以上入力してください。')
    return
  }
  fetch("http://localhost:8081/tweets", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet: tweet, user: username }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  });
}