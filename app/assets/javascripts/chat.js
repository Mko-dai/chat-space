$(function(){
  function buildHTML(chat){
    var addImage = (chat.image_url !== null) ? `<img src="${chat.image_url}">` : '';
    var html = `<div id="sounyu" class="contents-right__chats-space__message">
                <b>${chat.name}</b>
                <a>${chat.created_at}</a>
                <br>
                ${chat.text}
                </br>
                ${addImage}
                </div>`
return html;
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
});
