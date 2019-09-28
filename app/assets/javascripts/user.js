$(function() {
  
function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`
    return html;
};

function appendUserInput(user) {
    var html = `
    <div class='chat-group-user'>
    <input name='group[user_ids][]' type='hidden' value='${user.id}'>
    <p class='chat-group-user__name'>${user.name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  return html;
}

function appendErrMsgToHTML(msg) {
  var html = `<div class="chat-group-user__name">${msg}</div>`
            return html;
            };

var usersname = [];

$("input#user-search-field.chat-group-form__input").keyup(function(e){
    e.preventDefault();
    var input = $("input#user-search-field.chat-group-form__input").val();
    var group_id = $('.chat__group_id').val(); 
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input,groupId: group_id},
      dataType: 'json',
      contentType: false
    })
  
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var htmlnew = appendUser(user);
          if(usersname.indexOf(user.name) === -1){
          $("#user-search-result").append(htmlnew);
        }});
        if (input.length === 0) {
          $(".chat-group-user.clearfix").remove();
        };
      }
      else {
        var htmler = appendErrMsgToHTML("一致するメンバーはいません");  
        $("#user-search-result").append(htmler);
      }
    })
    .fail(function() {
      alert('error');
    });


    return false;  
  });
  
$(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(e){
    e.preventDefault();
    $(this).parent().remove();
    var name = this.getAttribute("data-user-name");
    var id = this.getAttribute("data-user-id");
    $.ajax({
      type: 'GET',
      url: '/users/new',
      data: { key:{name: name, id: id} },
      dataType: 'json',
      contentType: false
    })

    .done(function(user){
      usersname.push(user.name)
      var htmlnew = appendUserInput(user);
      $("#chat-group-user").append(htmlnew);
      
  })
    .fail(function() {
      alert('error');
    });
    return false;  
  });
  
  $(document).on("click",".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function(e){
    e.preventDefault();
    var name = $(this).prev().text();
    for(i=0; i<usersname.length; i++){
      if(usersname[i] == name){
      usersname.splice(i,1);
      }
    }
    $(this).parent().remove();
    
  });  
});
