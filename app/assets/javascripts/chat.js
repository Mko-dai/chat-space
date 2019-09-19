$(function(){
  function buildHTML(chat){
    var addImage = (chat.image !== null) ? `<img src="${chat.image}">` : '';
    var html = `<div id="sounyu" class="contents-right__chats-space__message" data-id="${chat.id}">
                <b>${chat.name}</b>
                <a>${chat.created_at}</a>
                <br>
                ${chat.text}
                </br>
                ${addImage}
                </div>`
return html;
  };
    if(document.URL.match(/chats/)) {
  var reloadchats = function() {
    last_chat_id = $('.contents-right__chats-space__message:last').data('id');
    $.ajax({
      url: 'api/chats',
      type: 'GET',
      dataType: 'json',
      data: {id: last_chat_id}
    })
    .done(function(chats) {
      var insertHTML = '';
      chats.forEach(function(chat){
      var num = buildHTML(chat) + insertHTML;
      $('.contents-right__chats-space').append(num)
      $('html,body').animate({scrollTop: $('html,body')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function() {
    });
  };
    };
  $('#chat').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents-right__chats-space').append(html)
      $('#chat_text').val('')
      $('.hidden-file-field').val('')
      $('html,body').animate({scrollTop: $('html,body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error')
    });
    return false;
  });
  setInterval(reloadchats, 5000);
});
