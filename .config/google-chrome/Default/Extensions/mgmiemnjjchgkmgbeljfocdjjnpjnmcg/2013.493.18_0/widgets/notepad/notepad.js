if(localStorage.getItem("StockNotepad") === null) {
  localStorage.setItem("StockNotepad", "This widget has been deprecated. Please install Bigger Notes if you'd like to take notes on ANTP: https://chrome.google.com/webstore/detail/bigger-notes-antp/lohbonfeioofpgpcmebnncnmiobojbgk" );
}

$(document).ready(function($) {
  if (localStorage.getItem("StockNotepad")) {
    $("#notepad").val( "This widget has been deprecated. Please install Bigger Notes if you'd like to take notes on ANTP: https://chrome.google.com/webstore/detail/bigger-notes-antp/lohbonfeioofpgpcmebnncnmiobojbgk\n\nPlease save your notes!\n\n" + localStorage.getItem("StockNotepad") );
  }
});
