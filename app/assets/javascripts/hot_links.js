$(document).ready(() => {
  new HotLinks()
})

class HotLinks {
  constructor() {
    this.checkHotLinks()
  }

  function checkHotLinks(){
    $.ajax({
      url: "https://hot-reads-cews.herokuapp.com/api/v1/hot_links",
      method: "GET"
    }).done(this.updateHotLinks).fail(error => console.log(error))
  }

  function updateHotLinks(response) {
    $(".hot, .top").remove()
    $(".links article").find(`a:contains(${response[0].url})`)
    .parents("article")
    .prepend(`<p class='top'>hottest link</p>`)

    response.forEach(link => {
      $(".links article").find(`a:contains(${link.url})`)
      .parents("article")
      .prepend(`<p class="hot">hot link</p>`)
    })
  }

  function createHotLinks(url) {
    const link = { link: { url: url } }

    $.ajax({
      url: "https://hot-reads-cews.herokuapp.com/api/v1/links",
      method: "POST",
      data: link
    }).done(response => console.log(response)).fail(error => console.log(error))
  }
}
