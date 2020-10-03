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
                            <?php 
include 'conn.php';
if($_GET['id']) {
    $id = $_GET['id'];

    $sql = "SELECT * FROM royaltrack WHERE royaltrack_id = {$id}";
    $result = $link->query($sql);

    $data = $result->fetch_assoc();

}

?>
                                            <?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
include 'conn.php';

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
if(isset($_POST['save'])){
     // $id1 = mysqli_real_escape_string($link,$_POST['id1']);
 $d1 = mysqli_real_escape_string($link,$_POST['d1']);
 $t1 = mysqli_real_escape_string($link,$_POST['t1']);
  $s1 = mysqli_real_escape_string($link,$_POST['s1']);
 $c1 = mysqli_real_escape_string($link,$_POST['c1']);

  $d2 = mysqli_real_escape_string($link,$_POST['d2']);
 $t2 = mysqli_real_escape_string($link,$_POST['t2']);
  $s2 = mysqli_real_escape_string($link,$_POST['s2']);
 $c2 = mysqli_real_escape_string($link,$_POST['c2']);

  $d3 = mysqli_real_escape_string($link,$_POST['d3']);
 $t3 = mysqli_real_escape_string($link,$_POST['t3']);
  $s3 = mysqli_real_escape_string($link,$_POST['s3']);
 $c3 = mysqli_real_escape_string($link,$_POST['c3']);

  $d4 = mysqli_real_escape_string($link,$_POST['d4']);
 $t4 = mysqli_real_escape_string($link,$_POST['t4']);
  $s4 = mysqli_real_escape_string($link,$_POST['s4']);
 $c4 = mysqli_real_escape_string($link,$_POST['c4']);

  $d5 = mysqli_real_escape_string($link,$_POST['d5']);
 $t5 = mysqli_real_escape_string($link,$_POST['t5']);
  $s5 = mysqli_real_escape_string($link,$_POST['s5']);
 $c5 = mysqli_real_escape_string($link,$_POST['c5']);



  $sql =  "UPDATE royaltrack SET d1='$d1',t1='$t1',s1='$s1',c1='$c1', d2='$d2',t2='$t2',s2='$s2',c2='$c2', d3='$d3',t3='$t3',s3='$s3',c3='$c3', d4='$d4',t4='$t4',s4='$s4',c4='$c4', d5='$d5',t5='$t5',s5='$s5',c5='$c5'   WHERE royaltrack_id={$id} ";
// Attempt insert query execution
       
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




                        </div>
                        <div class="basic-form">
                            <h3>Edit Package Location On Tracking</h3>
                            <div class="basic-form">
                           
                                <form action="" method="post" action="">
                                      <div class="form-group">
                                  <input type="hidden" name="id1" value="<?php echo $data["royaltrack_id"];?>" class="form-control" placeholder="Email">
                                </div>
                                <h3>First</h3>
                                <div class="row">
                                    <div class="col-md-3">
                                            <div class="form-group">
                                    <label><b>date</b></label>
                                    <input type="date" name="d1" value="<?php echo $data["d1"];?>" class="form-control" placeholder="" required="">
                                </div>
                                    </div>
                                     <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>time</b></label>
                                    <input type="time" value="<?php echo $data["t1"];?>" name="t1" class="form-control" placeholder="" >
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Status</b></label>
                                   <textarea class="form-control" rows="4" name="s1" id="comment"><?php echo $data["s1"];?></textarea>
                                    
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Track Point</b></label>
                                   <textarea class="form-control" rows="4" name="c1" id="comment"><?php echo $data["c1"];?></textarea>
                                    
                                </div>
                                     </div>
                                </div>

                                <h3>Second </h3>

                                  <div class="row">
                                    <div class="col-md-3">
                                            <div class="form-group">
                                    <label><b>date</b></label>
                                    <input type="date" name="d2" value="<?php echo $data["d2"];?>" class="form-control" placeholder="" >
                                </div>
                                    </div>
                                     <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>time</b></label>
                                    <input type="time" value="<?php echo $data["t2"];?>" name="t2" class="form-control" placeholder="" >
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Status</b></label>
                                   <textarea class="form-control" rows="4" name="s2" id="comment"><?php echo $data["s2"];?></textarea>
                                    
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Track Point</b></label>
                                   <textarea class="form-control" rows="4" name="c2" id="comment"><?php echo $data["c2"];?></textarea>
                                    
                                </div>
                                     </div>
                                </div>

                                <h3>Third</h3>
                           
                                     <div class="row">
                                    <div class="col-md-3">
                                            <div class="form-group">
                                    <label><b>date</b></label>
                                    <input type="date" name="d3" value="<?php echo $data["d3"];?>" class="form-control" placeholder="" >
                                </div>
                                    </div>
                                     <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>time</b></label>
                                    <input type="time" value="<?php echo $data["t3"];?>" name="t3" class="form-control" placeholder="" >
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Status</b></label>
                                   <textarea class="form-control" rows="4" name="s3" id="comment"><?php echo $data["s3"];?></textarea>
                                    
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Track Point</b></label>
                                   <textarea class="form-control" rows="4" name="c4" id="comment"><?php echo $data["c4"];?></textarea>
                                    
                                </div>
                                     </div>
                                </div>
                                
                                <h3>Fourth</h3>

                                <div class="row">
                                    <div class="col-md-3">
                                            <div class="form-group">
                                    <label><b>date</b></label>
                                    <input type="date" name="d5" value="<?php echo $data["d5"];?>" class="form-control" placeholder="" >
                                </div>
                                    </div>
                                     <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>time</b></label>
                                    <input type="time" value="<?php echo $data["t5"];?>" name="t5" class="form-control" placeholder="" >
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Status</b></label>
                                   <textarea class="form-control" rows="4" name="s5" id="comment"><?php echo $data["s5"];?></textarea>
                                    
                                </div>
                                     </div>
                                        <div class="col-md-3">
                                             <div class="form-group">
                                    <label><b>Track Point</b></label>
                                   <textarea class="form-control" rows="4" name="c5" id="comment"><?php echo $data["c5"];?></textarea>
                                    
                                </div>
                                     </div>
                                </div>
                          
                            
                              
                                <button type="submit" name="save" class="btn btn-primary">Add Location</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-2">
         
        </div>
    </div>
       <?php include 'footer.php'; ?>