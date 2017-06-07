$(document).ready(() => {
  new MarkLinks()
})

class MarkLinks {
  constructor() {
    $("body").on("click", "input[value='Mark as Read']", this.markAsRead.bind(this))
    $("body").on("click", "input[value='Mark as Unread']", this.markAsUnread.bind(this))
    this.checkHotLinks()
  }

  checkHotLinks(){
    $.ajax({
      url: "https://whispering-brushlands-58561.herokuapp.com/api/v1/hot_links",
      method: "GET"
    }).done(this.updateHotLinks).fail(error => console.log(error))
  }

  updateHotLinks(response) {
    $(".hot, .top").remove()
    $(".links article").find(`a:contains(${response.url})`)
    .parents("article")
    .prepend(`<p class='top'>hottest link</p>`)

    response.forEach(link => {
      $(".links article").find(`a:contains(${link.url})`)
      .parents("article")
      .prepend(`<p class="hot">hot link</p>`)
    })
  }

  createHotLinks(url) {
    const link = { link: { url: url } }

    $.ajax({
      url: "https://whispering-brushlands-58561.herokuapp.com/api/v1/links",
      method: "POST",
      data: link
    }).done(response => console.log(response)).fail(error => console.log(error))
  }

  displayFailure(failureData){
    console.log("FAILED attempt to update Link: " + failureData.responseText);
  }

  markAsUnread(e) {
    e.preventDefault();

    const linkId = $(e.target).attr("data_id")
    const link = { link: { read: false } }

    this.updateReadStatus(link, linkId)
  }

  markAsRead(e) {
    e.preventDefault();

    const linkId = $(e.target).attr("data_id")
    const link = { link: { read: true } }

    this.updateReadStatus(link, linkId)
  }

  updateReadStatus(link, linkId) {
    $.ajax({
      type: "PATCH",
      url: "/api/v1/links/" + linkId,
      data: link,
    })
    .done(this.updateLinkStatus.bind(this))
    .fail(this.displayFailure);
  }

  updateLinkStatus(link) {
    this.checkHotLinks()
    link.read && this.createHotLinks(link.url)
    const buttonSwitch = link.read ? "Mark as Unread" : "Mark as Read"
    const wrapper = $(`#link${link.id}`)
    link.read ? wrapper.addClass("unread") : wrapper.removeClass("read")
    wrapper.find('p').text(`Read? ${link.read}`)
    wrapper.find('.switch').val(buttonSwitch)
  }
}
