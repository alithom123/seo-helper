var data = [];

$( document ).ready( function() {

  console.log("document ready to run some javascript!");

  // If csv file is selected, then update the table with the data.
  $( "#csvFile" ).change(function(event) {

    console.log("CSV file changed.");
    // var filename = e.target.files[0].name;
    var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {

            var csvData = event.target.result;
            data = $.csv.toArrays(csvData);  // <-- .csv is a function from a library that I installed. 
            console.log("Here is your csv data converted to arrays: ");

            // if there is data then log how many rows and probably should put it on-screen somewhere.
            if (data && data.length > 0) {
              $('#info').text('Imported -' + data.length + '- rows successfully!');
              // alert('Imported -' + data.length + '- rows successfully!');
            } else {
              // alert('No data to import!');
              $('#info').text('No data to import!');
            }




            // turn data into html table.
            var tableHtml = csvArrayToTable(data);  // This type of table is bare, and does not use bootstrap-tables.

            // append table html into body.
            $('body').append(tableHtml);

            // give table an id that can be used later.
            $('table').attr('id', 'csvInTable');
        };
        reader.onerror = function() {
            // alert('Unable to read ' + file.fileName);
            $('#info').text('Unable to read ' + file.fileName);
        };
});

  /* I don't think this is the right way to do it anymore. Use a library instead? Maybe this is the library? */
  /*
  $('#table').bootstrapTable({
    // url: 'data1.json',
    pagination: true,
    search: true,
    columns: [{
      field: 'id',
      title: 'Item ID'
    }, {
      field: 'name',
      title: 'Item Name'
    }, {
      field: 'price',
      title: 'Item Price'
    }],
    data: [{
      id: 1,
      name: 'Item 1',
      price: '$1'
    }, {
      id: 2,
      name: 'Item 2',
      price: '$2'
    }]
  });
  */


 var columns = [
   {
    field: 'url',
    title: 'Url'
   },
   {
     field: 'title',
     title: 'Title'
   },
   {
    field: 'meta',
    title: 'Meta'
   }];

  // var data = [];
  // for (let i = 0; i < r.length; i++) {
  //   var dataObj = {
  //     url: i,
  //     title: [i],
  //     meta: [i],
  //   };
  // }

 $('#table').bootstrapTable({
  columns: [{
    field: 'id',
    title: 'Item ID'
  }, {
    field: 'name',
    title: 'Item Name'
  }, {
    field: 'price',
    title: 'Item Price'
  }],
  data: [{
    id: 1,
    name: 'Item 1',
    price: '$1'
  }, {
    id: 2,
    name: 'Item 2',
    price: '$2'
  }]
})


    




      // This must be a hyperlink
  // $(".export").on('click', function(event) {
  $("#exportRankTracker").on('click', function(event) {
    console.log("firing on export click.  Try to convert table to csv and check export.csv probably in project folder");
    // CSV
    // var args = [$('#dvData>table'), 'export.csv'];
    var args = [$('#csvInTable'), 'export.csv'];

    exportTableToCSV.apply(this, args);

    // If CSV, don't do event.preventDefault() or return false
    // We actually need this to be a typical hyperlink
  });

  $(function () {
    $('#testTable').bootstrapTable({
        data: data,
        showExport: true,
        exportOptions: {
            fileName: 'custom_file_name'
        }
    });
  });

});


/* The bootstrap-table from bootstrap-table.com uses a specific format that we'll have to get the data into */
function convertDataToBootstrapTableFormat(data) {

  // Format data to something that bootstrap tables can use.
  /*
  var dataForBootstrapTables = [];
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {

      var url = ;
      var title = ;
      var meta = ;

      var value = data[row][col];
      var dataObject = {
        url: i,
        title: [i],
        meta: [i],
      };

    }
  }
  */


  var columnHeadings = collectColumnHeadings(data);

}


/*
readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {
        document.getElementById('out').innerHTML = reader.result;
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
};
*/


/* Build table from array (that came from csv data). Code from: https://code.tutsplus.com/tutorials/parsing-a-csv-file-with-javascript--cms-25626 */
function csvArrayToTable(csvArray) {
    // var allRows = data.split(/\r?\n|\r/);
    var table = '<table>';
    for (var rowNum = 0; rowNum < csvArray.length; rowNum++) {
      if (rowNum === 0) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }
    //   var rowCells = allRows[singleRow].split(',');
      var row = csvArray[rowNum];
      for (var colNum = 0; colNum < row.length; colNum++) {
        if (rowNum === 0) {
          table += '<th>';
          table += row[colNum];
          table += '</th>';
        } else {
          table += '<td>';
          table += row[colNum];
          table += '</td>';
        }
      }
      if (rowNum === 0) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    } 
    table += '</tbody>';
    table += '</table>';
    // $('body').append(table);
    return table;
  }


  function removeStopWords(keyword) {
      console.log("in removeStopWords");

      // Convert to lowercase.
      
      // Parse text into words.
      // var input = $('#input').val();

      // Break input into words array.
      // wordsArray = input.match(/\b(\w+)\b/g);

      // If you remove words you'll have to replace instances of two spaces in a row with one space.


      // alert( '12-34-56'.replace( /-/g, ":" ) );  // 12:34:56
      // https://javascript.info/regexp-methods
      // What do I do with punctuation?



      // Empty buttons before replacing them.
      // $('.word-button').remove();

      // var keyword2 = "Manta rays live in for for forfor for Fort Worth, TX for";
      // var stopword = "for";

      // var stopreg = new RegExp("\\b" + stopword + "\\b", "ig");
      // alert(collapseWhiteSpace(keyword2.replace(stopreg, '')));

    var stopwords = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];
    for(var i = 0; i < stopwords.length; i++) {
        // var expression = "^[" + $(this).html() + "].*$";
        var stopwordRegEx = new RegExp("\\b" + stopwords[i] + "\\b", "ig");
        // var regex = new RegExp(regex, 'ig');
    
        // console.log(rx, 'expression');
        keyword = keyword.replace(stopwordRegEx);
    }

    keyword = collapseWhiteSpace(keyword);

    // Because you removed by matching words, you'll have to replace instances of two spaces with one.
    keyword = keyword.replace(/ +(?= )/g,'');

    return keyword;
  }

  function screamingFrogCsvArrayToKeywordArray(csvArray) {

    // Use title tag as a basis for keywords. ( Convert to lowercase. Remove stop words. )


    // Convert Arrays back into CSV.
    
  }

  function testStopKeywordRemoval() {
      console.log(removeStopWords("Ricochet a A about Great in"));
  }


  /* STRING UTILITIES */
  function collapseWhiteSpace(text) {
    return text.replace(/ +(?= )/g,'');
  }

  /* CSV UTILITES */
  function exportTableToCSV($table, filename) {

    console.log("in exportTableToCSV");
    console.log("$table = ");
    console.log($table);
    console.log("filename");
    console.log(filename);


    var $rows = $table.find('tr:has(td)'),

      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      // Grab text from table into CSV formatted string
      csv = '"' + $rows.map(function(i, row) {
        var $row = $(row),
          $cols = $row.find('td');

        return $cols.map(function(j, col) {
          var $col = $(col),
            text = $col.text();

          return text.replace(/"/g, '""'); // escape double quotes

        }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"';

    console.log("csv:");console.log(csv); // Seems to be working! But how come the file's not being made???

    // Deliberate 'false', see comment below
    // if (false && window.navigator.msSaveBlob) {
    if (true && window.navigator.msSaveBlob) {

      var blob = new Blob([decodeURIComponent(csv)], {
        type: 'text/csv;charset=utf8'
      });

      // Crashes in IE 10, IE 11 and Microsoft Edge
      // See MS Edge Issue #10396033
      // Hence, the deliberate 'false'
      // This is here just for completeness
      // Remove the 'false' at your own risk
      window.navigator.msSaveBlob(blob, filename);

    } else if (window.Blob && window.URL) {
      // HTML5 Blob        
      var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      var csvUrl = URL.createObjectURL(blob);

      $(this)
        .attr({
          'download': filename,
          'href': csvUrl
        });
    } else {
      // Data URI
      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

      $(this)
        .attr({
          'download': filename,
          'href': csvData,
          'target': '_blank'
        });
    }
  }


// UNNEEDED 
// testStopKeywordRemoval();

var data = [
  {
      "name": "bootstrap-table",
      "stargazers_count": "526",
      "forks_count": "122",
      "description": "An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3) \n        "
  },
  {
      "name": "multiple-select",
      "stargazers_count": "288",
      "forks_count": "150",
      "description": "A jQuery plugin to select multiple elements with checkboxes :)\n        "
  },
  {
      "name": "bootstrap-show-password",
      "stargazers_count": "32",
      "forks_count": "11",
      "description": "Show/hide password plugin for twitter bootstrap.\n        "
  },
  {
      "name": "blog",
      "stargazers_count": "13",
      "forks_count": "4",
      "description": "my blog"
  },
  {
      "name": "scutech-redmine",
      "stargazers_count": "6",
      "forks_count": "3",
      "description": "Redmine notification tools for chrome extension."
  }
];

// Right now this function is useless.
function collectColumnHeadings(data) {

  const headingRow = 1;
  return data[headingRow];

}