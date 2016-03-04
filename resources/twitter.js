(function() {
  $(document).ready(function() {
    $("#twitter_list").tweet({
      avatar_size: 32,
      count: 4,
      username: "sweh2",
      loading_text: "<p class='ajaxload'></p>"
    });
  });
})()

