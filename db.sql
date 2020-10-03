CREATE TABLE IF NOT EXISTS `royaltrack` (
  `royaltrack_id` INT NOT NULL AUTO_INCREMENT,
  `ship_id` varchar(255) NOT NULL,

  `d1` varchar(255) NOT NULL,
  `t1` varchar(255) NOT NULL,
  `s1` varchar(255) NOT NULL,
  `c1` varchar(255) NOT NULL,

  `d2` varchar(255) NOT NULL,
  `t2` varchar(255) NOT NULL,
  `s2` varchar(255) NOT NULL,
  `c2` varchar(255) NOT NULL,

  `d3` varchar(255) NOT NULL,
  `t3` varchar(255) NOT NULL,
  `s3` varchar(255) NOT NULL,
  `c3` varchar(255) NOT NULL,

  `d4` varchar(255) NOT NULL,
  `t4` varchar(255) NOT NULL,
  `s4` varchar(255) NOT NULL,
  `c4` varchar(255) NOT NULL,

  `d5` varchar(255) NOT NULL,
  `t5` varchar(255) NOT NULL,
  `s5` varchar(255) NOT NULL,
  `c5` varchar(255) NOT NULL,


  PRIMARY KEY (`royaltrack_id`))
ENGINE = InnoDB;
