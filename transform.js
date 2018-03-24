
module.exports = function (data){
  for (var item in data) {
    if (item == '_id'){
      delete data[item];
    }
    if (data[item] instanceof Array && data[item].length == 0){
      delete data[item];
    }
    data.bio = data.bio.replace(/[^a-zA-Z0-9 ]+/g, "");
  }
  return data;
}
