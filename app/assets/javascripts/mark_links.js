$(document).ready(() => {
  new MarkLinks()
})

class MarkLinks {
  constructor() {
    $("body").on("click", "input[value='Mark as Read']", this.markAsRead.bind(this))
    $("body").on("click", "input[value='Mark as Unread']", this.markAsUnread.bind(this))
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
    const buttonSwitch = link.read ? "Mark as Unread" : "Mark as Read"
    const wrapper = $(`#link${link.id}`)
    link.read ? wrapper.addClass("unread") : wrapper.removeClass("read")
    wrapper.find('p').text(`Read? ${link.read}`)
    wrapper.find('.switch').val(buttonSwitch)
  }
}
