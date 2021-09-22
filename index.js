function parseHeadlessTable(sel){
  let rows = $(sel).find('table').find('tbody > tr ').toArray()
  let values = rows.map(row=>{
    return $(row).find('td').toArray().reduce((record,val,i)=>{
      if(!$(val).text().trim()) return record;
      record.push(trimmer($(val)))
      return record
    },[])
  })
  return values
}
