$(function(){ 

  var reloadMessages = function(){
    var last_message_id = $('.main_chat_messages_message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
    .done(function(messages){
      if(messages.length !==0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat_messages').append(insertHTML);
        $('.main_chat_messages').animate({ scrollTop: $('.main_chat_messages')[0].scrollHeight});  
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main_chat_messages_message" data-message-id=${message.id}>
         <div class="main_chat_messages_message_users">
           <div class="main_chat_messages_message_users_user-name">
             ${message.user_name}
           </div>
           <div class="main_chat_messages_message_users_day">
             ${message.created_at}
           </div>
         </div>
         <div class="main_chat_messages_message_post">
           <p class="message_post_content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main_chat_messages_message" data-message-id=${message.id}>
         <div class="main_chat_messages_message_users">
           <div class="main_chat_messages_message_users_user-name">
             ${message.user_name}
           </div>
           <div class="main_chat_messages_message_users_day">
             ${message.created_at}
           </div>
         </div>
         <div class="main_chat_messages_message_post">
           <p class="message_post_content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }

  $('#new_message').on('submit', function(e){
   e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action')
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
      $('.main_chat_messages').append(html);
      $('.main_chat_messages').animate({ scrollTop: $('.main_chat_messages')[0].scrollHeight});
      $('form')[0].reset();
    })

    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })

    .always(function(){
      $('.submit-btn').prop('disabled', false);
    })
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});