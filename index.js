//подключение необходимых модулей
var  express = require ('express');
var app = express();
var server = require ('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000); //подключение порма

app.get('/', function(request, respons) { //при заходе на главную страницу, вызовется функция
  respons.sendFile(__dirname + "/index.html"); //которая будет передавать файл в качетсве ответа наш файл с разметкой хтмл
});

users = []; //массив для хранения пользователей
connections = []; //массив для подключений сейчас

io.sockets.on('connection', function(socket) {  //подключение библиотеки ио и  отслеживание подключения к сайту
  console.log("Успешное соединение"); //вывод для нас, чтобы понимать, что все ок
  connections.push(socket); //добавлется в массив
//когда выходим с сайта, то удаляем это подключение
  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1); //сплайт-встроенная функция удаления, удаляем только 1
    console.log("Успешное отключение"); //вывод для нас, чтобы понимать, что все ок
  });

  socket.on('send mess',function(data){    //вызываем событие, которое принимает значение написанного сообщения
    io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className}); //новое событие, которое передает сообщение и имя пользователя
  });

});
