$(document).ready(() => {
  new CreateLink()
})

class CreateLink {
  constructor() {
    $("input[value='Add Link']").on("click", this.addLink.bind(this))
  }

  addLink(e) {
    e.preventDefault();

    const url = $("#link_url:valid").val()
    const title = $("#link_title:valid").val()
    const link = { link: { url: url, title: title} }

    url && title ? this.createLink(link) : this.handleErrors()
  }

  createLink(link) {
    $.ajax({
      url: "api/v1/links",
      method: "POST",
      data: link
    }).done(response => {
      $("#link_url", "#link_title").val("")
      $(".links").prepend(response)
      $(".create-link #link_url, #link_title").val("")
    }).fail(error => console.log(error))
  }

  handleErrors() {
    $(".create-link p").text("")
    const titleContent = $("#link_title")[0].validationMessage
    const urlContent   = $("#link_url")[0].validationMessage

    titleContent && $("#link_title").after(`<p>${titleContent}</p>`)
    urlContent && $("#link_url").after(`<p>${urlContent}</p>`)
  }
}
