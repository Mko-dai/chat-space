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
  $("input#user-search-field.chat-group-form__input").keyup(function(e){
    e.preventDefault();
    var input = $("input#user-search-field.chat-group-form__input").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
      contentType: false
    })
  
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var htmlnew = appendUser(user);
          $("#user-search-result").append(htmlnew);
        });
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
    console.log(this);
    $.ajax({
      type: 'GET',
      url: '/users/new',
      data: { key:{name: name, id: id} },
      dataType: 'json',
      contentType: false
    })

    .done(function(user){
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
    $(this).parent().remove();
  });  
});