function trimmer(el) {
  try {
    return $(el).text().trim().replace(/\n|\r/gm,' ').replace(/\s\s+/g, ' ');
  } catch (error) {
    return '';
  }
}

function parseHeadlessTable(sel){
  let rows = $(sel).find('table').find('tbody > tr ').toArray()
  let values = rows.map(row=>{
    return $(row).find('td').toArray().reduce((record,val,i)=>{
      if(!$(val).text().trim()) return record;
      record.push(trimmer($(val)))
      return record
    },[])
  })
  return new Map(values)
}
function isCheerio(e) {
    try {
        return e.cheerio === '[cheerio object]'
    } catch (error) { }
}


function is_elements_contains(elements_selector, search_text) {
    const arr = $(elements_selector).toArray()
    return !!find_item_in(arr).equal(search_text)
}


verify_requests(r => {
    if (r.error!='net::ERR_ABORTED' && 
      reqs_wl.some(w => w.test(r.url)) &&
      (!r.response || r.response.status != 404))
    {
      throw new Error();
    }
});

function searchJsonPath(source, name, f, path = '$') {
if (!source) return { [path]: false }
//console.log(path)
if (!Array.isArray(source)) {
  let results = Object.keys(source).map(key => {
    if (key == name) {

      f({ [path]: source[key] })
      if (typeof source[key] == 'string') {

      } else {
        return searchJsonPath(source[key], name, f, path + '.' + key)
      }
    } else if (typeof source[key] == 'object') {
      return searchJsonPath(source[key], name, f, path + '.' + key)
    } else {
      return { [path]: false }
    }
  })
  return results
} else {
  let arr = source.map((item, i) => {
    return searchJsonPath(item, name, f, `${path}[${i}]`)
  })
  return { [path]: arr }
}

}
