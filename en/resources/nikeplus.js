(function() {

  var fill_nike_runs = function(data) {
    $.each(data, function(i, run) {
      var startTime = run['startTime'].split('T')[0];
      var duration = run['duration'] / 1000;
      var hour = Math.floor(duration / 3600);
      var minute = Math.floor((duration%3600) / 60);
      if (minute < 10) minute = '0' + minute;
      duration = hour + "'" + minute + "''";
      var distance = parseFloat(run['distance']).toFixed(2);
      var calories = parseInt(run['calories']);
      var run_url = "http://nikerunning.nike.com/nikeos/p/nikeplus/de_DE/" +
                    "plus/#//runs/detail/279218513/" + run['id'] + 
                    "/all/allRuns/";
      $('#nikeplus table').append(
        "<tr><td>" + startTime + "</td><td>" + distance + "km</td><td>" +
        duration + "</td><td>" + calories + "</td><td><a href=\"" + run_url +
        "\"><img src=\"@@/sw.sw83/nikeplus.ico\" /></a></td></tr>");
    });
    $('#nikeplus table tr.ajaxload').remove();
  };

  var fill_nike_summary = function (data) {
    $('#nikeplus p').removeClass('ajaxload');
    $('#nikeplus p').text(data['summary']).fadeIn();
  };

  var parse_nike = function (data) {
    var summary_data = new Object();
    summary_data['runs'] = runs = Math.floor(
      data['runListSummary']['runs']);
    summary_data['distance'] = Math.ceil(
      data['runListSummary']['distance']);
    summary_data['duration'] = Math.ceil(
      data['runListSummary']['duration'] / 3600000)
    summary_data['calories'] = Math.ceil(
      data['runListSummary']['calories'])

    var display_runs = [data['runList'][runs-1],
                        data['runList'][runs-2],
                        data['runList'][runs-3]]

    fill_nike_runs(display_runs);

    $.ajax({url: 'http://www.sw83.de/nikeplus_summary',
            data: summary_data,
            success: fill_nike_summary,
            dataType: 'jsonp'});
  };

  $(document).ready(function() {
    $.ajax({url:'http://www.sw83.de/nikeplus_data',
            success: parse_nike,
            dataType: 'jsonp'});
  });
})()
