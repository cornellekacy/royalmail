<?php include 'header.php'; ?>
<?php include 'sidebar.php'; ?>
<!-- End Left Sidebar  -->
<!-- Page wrapper  -->
<div class="page-wrapper">
    <!-- Bread crumb -->
    <div class="row page-titles">
        <div class="col-md-5 align-self-center">
            <h3 class="text-primary">Dashboard</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-title">
                            <h4>Add New Tracking</h4>
                                            <?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
include 'conn.php';

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
if(isset($_POST['save'])){
     $id1 = mysqli_real_escape_string($link,$_POST['id1']);
 $jname = mysqli_real_escape_string($link,$_POST['jname']);
 $jadd = mysqli_real_escape_string($link,$_POST['jadd']);
 $jcountry = mysqli_real_escape_string($link,$_POST['jcountry']);
 $sname = mysqli_real_escape_string($link,$_POST['sname']);
 $sadd = mysqli_real_escape_string($link,$_POST['sadd']);
 $scountry = mysqli_real_escape_string($link,$_POST['scountry']);
 $prod = mysqli_real_escape_string($link,$_POST['prod']);
 $mode = mysqli_real_escape_string($link,$_POST['mode']);
 $ship_date = mysqli_real_escape_string($link,$_POST['ship_date']);
 $ddate = mysqli_real_escape_string($link,$_POST['ddate']);
  $ship_time = mysqli_real_escape_string($link,$_POST['ship_time']);
 $dtime = mysqli_real_escape_string($link,$_POST['dtime']);
 $currentl = mysqli_real_escape_string($link,$_POST['currentl']);
 $pickupl = mysqli_real_escape_string($link,$_POST['pickupl']);
 $status = mysqli_real_escape_string($link,$_POST['status']);
 $deliverys = mysqli_real_escape_string($link,$_POST['deliverys']);
 $cat = mysqli_real_escape_string($link,$_POST['cat']);
 $weight = mysqli_real_escape_string($link,$_POST['weight']);
 $items = mysqli_real_escape_string($link,$_POST['items']);
 $descrip = mysqli_real_escape_string($link,$_POST['descrip']);
  $lon = mysqli_real_escape_string($link,$_POST['lon']);
 $lat = mysqli_real_escape_string($link,$_POST['lat']);


// Attempt insert query execution
        $sql =  "UPDATE track SET jname='$jname',jadd='$jadd',jcountry='$jcountry',sname='$sname',sadd='$sadd',scountry='$scountry', prod='$prod', mode='$mode', ship_date='$ship_date',ddate='$ddate',ship_time='$ship_time',dtime='$dtime', currentl= '$currentl', pickupl='$pickupl', status='$status', deliverys='$deliverys', items='$items', descrip='$descrip',lon='$lon',lat='$lat'    WHERE track_id='$id1' ";
    if(mysqli_query($link, $sql)){
        echo "<div class='alert alert-success'>
        <strong>Success!</strong> Tracking Successfully Update.
        </div>";
    } else{
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
    }

}
// Close connection
mysqli_close($link);

?>

<?php 
include 'conn.php';
if($_GET['id']) {
    $id = $_GET['id'];

    $sql = "SELECT * FROM track WHERE track_id = {$id}";
    $result = $link->query($sql);

    $data = $result->fetch_assoc();

}

?>

                        </div>
                        <div class="card-body">
                            <div class="basic-form">
                                <form method="post">
                                 <div class="form-group">
                                  <input type="hidden" name="id1" value="<?php echo $data["track_id"];?>" class="form-control" placeholder="Email">
                                </div>
                                 <div class="form-group">
                                    <label>Jk Name</label>
                                    <input type="text" name="jname" value="<?php echo $data["jname"];?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Jk address</label>
                                    <input type="text" name="jadd" value="<?php echo $data["jadd"];?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Jk Country</label>
                                    <input type="text" name="jcountry" value="<?php echo $data["jcountry"];?>" class="form-control" >
                                </div>
                                <div class="form-group">
                                    <label>Seller Name</label>
                                    <input type="text" name="sname" value="<?php echo $data["sname"];?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Seller address</label>
                                    <input type="text" name="sadd" value="<?php echo $data["sadd"];?>" class="form-control" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <label>Seller Country</label>
                                    <input type="text" name="scountry" value="<?php echo $data["scountry"];?>" class="form-control" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label>Product Name</label>
                                    <input type="text" name="prod" class="form-control" value="<?php echo $data["prod"];?>" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label >Transportation Mode</label>

                                    <select class="form-control" name="mode">
                                        <option value="Air">Air</option>
                                        <option value="Road">Road</option>
                                        <option value="Sea">Sea</option>
                                        <option value="Rail">Rail</option>
                                    </select>

                                </div>
                                <div class="form-group">
                                    <label>Shipped Date</label>
                                    <input type="text" name="ship_date" value="<?php echo $data["Ship_date"];?>" class="form-control" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label>Delivery Date</label>
                                    <input type="text" class="form-control" value="<?php echo $data["ddate"];?>" name="ddate" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label>Shipped Time</label>
                                    <input type="text" value="<?php echo $data["Ship_time"];?>" name="ship_time" class="form-control" placeholder="Shipped Time">
                                </div>
                                <div class="form-group">
                                    <label>Delivery Time</label>
                                    <input type="text" class="form-control" value="<?php echo $data["dtime"];?>" name="dtime" placeholder="Delivery Time">
                                </div>
                                <div class="form-group">
                                    <label>Current Location</label>
                                    <input type="text" class="form-control" value="<?php echo $data["currentl"];?>" name="currentl">
                                </div>
                                <div class="form-group">
                                    <label>Pickup Location</label>
                                    <input type="text" class="form-control" value="<?php echo $data["pickupl"];?>" name="pickupl">
                                </div>
                                <div class="form-group">
                                    <label>Shipment Status</label>

                                    <select class="form-control" name="status">
                                        <option value="In Progress">In Progress</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>

                                </div>
                                <div class="form-group">
                                    <label>Delivery Status</label>
                                    <input type="text" class="form-control" name="deliverys" value="<?php echo $data["deliverys"];?>">
                                </div>
                                <div class="form-group">
                                    <label>Shipment Category</label>
                                    <input type="text" class="form-control" name="cat" placeholder="E.g pet" value="<?php echo $data["cat"];?>">
                                </div>
                                <div class="form-group">
                                    <label>Shipment Weight</label>
                                    <input type="text" class="form-control" name="weight" placeholder="e.g 10kg" value="<?php echo $data["weight"];?>">
                                </div>
                                <div class="form-group">
                                    <label>Number Of Item To Ship</label>
                                    <input type="text" class="form-control" name="items" placeholder="e.g 01" value="<?php echo $data["items"];?>">
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea class="textarea_editor form-control" name="descrip" rows="15" placeholder="Enter text ..." style="height:150px"><?php echo $data["descrip"];?></textarea>

                                </div>
                                <!--     <div class="form-group">
                                    <label>From ..</label>
                                    <input type="text" value="<?php echo $data["lon"];?>" class="form-control" name="lon" placeholder="e.g -73.935242">
                                </div>
                                   <div class="form-group">
                                    <label>To ..</label>
                                    <input type="text" class="form-control" value="<?php echo $data["lat"];?>" name="lat" placeholder="e.g 40.730610">
                                </div> -->
             
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox"> Check me out
                                    </label>
                                </div>
                                <button type="submit" name="save" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-md-2">

            </div>
        </div>







        <!-- End PAge Content -->
        <?php include 'footer.php'; ?>