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
