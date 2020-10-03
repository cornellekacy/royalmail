
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
        <link rel="icon" type="image/png" sizes="16x16" href="../img/fav1.png">
    <title>ROYAL LOGISTICS - Admin Panel - Home</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->

    <link href="css/lib/calendar2/semantic.ui.min.css" rel="stylesheet">
    <link href="css/lib/calendar2/pignose.calendar.min.css" rel="stylesheet">
    <link href="css/lib/owl.carousel.min.css" rel="stylesheet" />
    <link href="css/lib/owl.theme.default.min.css" rel="stylesheet" />
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
     <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
     <link rel="stylesheet" href="css/lib/html5-editor/bootstrap-wysihtml5.css" />
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
    <!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
    <style media="screen">

.blinking{
  animation:blinkingText 1.5s infinite;
}
@keyframes blinkingText{
  0%{   color: #F00;  }
  49%{  color: transparent; }
  50%{  color: transparent; }
  99%{  color:transparent;  }
  100%{ color: #F00;  }
}
</style>
</head>

<body class="fix-header fix-sidebar">
    <!-- Preloader - style you can find in spinners.css -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
        <!-- header header  -->
        <div class="header">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- Logo -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.html">
                        <!-- Logo icon -->
                        <b><img src="images/logo.png" alt="homepage" class="dark-logo" /></b>
                        <!--End Logo icon -->
                        <!-- Logo text -->
                        <span><img src="images/logo-text.png" alt="homepage" class="dark-logo" /></span>
                    </a>
                </div>
                <!-- End Logo -->
                <div class="navbar-collapse">
                    <!-- toggle and nav items -->
            
                    <!-- User profile and search -->
                    <ul class="navbar-nav my-lg-0">
  
                        <!-- Search -->
                 
                        <!-- Comment -->
               

                        <!-- End Messages -->

                        <!-- Profile -->
                        <li><a href="logout.php"><i class="fa fa-power-off"></i> Logout</a></li>
                        <li style="margin-left: 20px"><a href="../track.php"> Track Package</a></li>
                        <li style="margin-left: 20px"><a href="../index.php"> Back To Homepage</a></li>
             
                    </ul>

                </div>
            </nav>
        </div>