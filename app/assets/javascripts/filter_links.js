$(document).ready(() => {
  new FilterLinks()
})

class FilterLinks {
  constructor() {
    $("#content-filter").on("keyup", this.contentFilter.bind(this))
    $("#show-unread").on("click", this.showRead.bind(this))
    $("#show-read").on("click", this.showUnread.bind(this))
  }

  contentFilter(e) {
		const search = $("#content-filter").val()

		$(".links article").hide()

		const matches = $(".links article").filter(article => {
			const title = $(".links article")[article].querySelector("h3").innerText.toLowerCase()
			const url = $(".links article")[article].querySelector("a").innerText.toLowerCase()
			return title.includes(search) || url.includes(search)
		})

		matches.show()
  }

  showRead(e) {
    const articles = $("article")
    articles.hide()
    articles.filter(".read").show()
  }

  showUnread(e) {
    const articles = $("article")
    articles.show()
    articles.filter(".read").hide()
  }
}
