fs = require('fs')

fs.readFile('./../books.json', 'utf8', (error, json) => {
  if (error) {
    console.log(error)
  }

  var books = JSON.parse(json).data
  var newJSON = JSON.stringify({data: formatJSON(books)}, null, 2);

  fs.writeFile('./../prettyBooks.json', newJSON, (error) => {
    if (error) {
      console.log(error)
    }
  })
})

function formatJSON(data) {
  return data.reduce(function(preVal, curVal, curIdx, arr) {
    for (var i = 0; i < preVal.length; i++) {
      if (preVal[i].book_id === curVal.book_id) {
        preVal[i].authors.push({
          author_id: curVal.author_id,
          first_name: curVal.first_name,
          last_name: curVal.last_name,
          biography: curVal.biography,
          portrait: curVal.portrait
        })
        return preVal
      }
    }

    preVal.push({
      book_id: curVal.book_id,
      title: curVal.title,
      genre: curVal.genre,
      description: curVal.description,
      cover: curVal.cover,
      authors: [{
        author_id: curVal.author_id,
        first_name: curVal.first_name,
        last_name: curVal.last_name,
        biography: curVal.biography,
        portrait: curVal.portrait
      }]
    })
    return preVal
  }, [])
}
