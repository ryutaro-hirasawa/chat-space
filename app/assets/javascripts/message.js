$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main_chat_messages_message">
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
      `<div class="main_chat_messages_message">
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
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.submit-btn').prop('disabled', false);
    })
  })
});