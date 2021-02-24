<?php 
	//first easy
	////<form id="formm" action="send.php" method="post">////
	
	$email = $_POST['email'];
	$purshase_text = $_POST['purshase_text'];

	$email = htmlspecialchars($email);
	$email = urldecode($email);
	$email = trim($email);
	$purshase_text = htmlspecialchars($purshase_text);
	$purshase_text = urldecode($purshase_text);
	$purshase_text = trim($purshase_text);

	echo $email;
	echo "<br>";
	echo $purshase_text;

	$toEmail = "ser-mank19@mail.ru";
	$fromEmail = "penobeton38@mail.ru";
	$mailTitle = "Заявка с сайта Пенобетона";
	$message = "E-mail Заказчика:".$email."\r\n\r\nЗаказ: ".$purshase_text;

	if (mail($toEmail, $mailTitle, $message,'From: Отправитель <'.$fromEmail.'> \r\n'))
	{ 
	  echo "Сообщение успешно отправлено"; 
	} else { 
	  echo "При отправке сообщения возникли ошибки"; 
	}




//habrahabr
	// if((isset($_POST['email'])&&$_POST['email']!="")&&(isset($_POST['purshase_text'])&&$_POST['purshase_text']!=""))
	// { 
 //    $toEmail = "ser-mank19@mail.ru";
 //    $fromEmail = "penobeton38@mail.ru";
 //    $mailTitle = "Заявка с сайта Пенобетона";
 //    $message = 
 //    	'<html>
 //      	<head><title>'.$mailTitle.'</title></head>
 //        <body>
 //          <p>Имя: '.$_POST['email'].'</p>
 //          <p>Телефон: '.$_POST['purshase_text'].'</p>                        
 //        </body>
 //      </html>'; //Текст нащего сообщения можно использовать HTML теги
 //    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
 //    $headers .= 'From: Отправитель <'..'>\r\n'; //Наименование и почта отправителя

 //    mail($toEmail, $mailTitle, $message, $headers); //Отправка письма с помощью функции mail
	// }
?>
