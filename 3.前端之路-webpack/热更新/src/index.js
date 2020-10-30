import './index.css'; //引入css文件

var el = document.createElement('div'),
  text = document.createTextNode(
    'Welcome to my app!'
  );

el.appendChild(text);
el.id = 'app';
document.body.appendChild(el);