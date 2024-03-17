fx_version 'cerulean';
game 'gta5'; 
lua54 'yes'

author 'notjawad'
description 'A simple notification system.'
repository 'https://github.com/notjawad/ch_notify'
version '0.1.0'


client_scripts {'src/client/*.lua'}
shared_scripts {'configuration/*.lua'}

ui_page 'html/index.html'
files {'html/index.html', 'html/app.js', 'html/style.css', 'html/*.mp3'}

escrow_ignore {'src/**/*.lua', 'configuration/*.lua'}