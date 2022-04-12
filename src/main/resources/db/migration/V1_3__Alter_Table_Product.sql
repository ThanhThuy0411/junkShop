ALTER TABLE `junk_shop`.`product`
CHANGE COLUMN `type` `type` ENUM('books', 'houseWare', 'other') NULL DEFAULT 'books' ,
CHANGE COLUMN `status` `status` ENUM('stocking', 'sold') NULL DEFAULT 'stocking' ;
