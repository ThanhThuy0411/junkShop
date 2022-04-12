DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `junk_shop`.`file` (
  `fileId` VARCHAR(36) NOT NULL,
  `name` VARCHAR(1024) NULL DEFAULT NULL,
  `type` ENUM('Image', 'Audio', 'Video', 'Document') NULL DEFAULT 'Image',
  `productId` VARCHAR(36) NULL DEFAULT NULL,
  `url` VARCHAR(2048) NULL DEFAULT NULL,
  PRIMARY KEY (`fileId`),
  UNIQUE INDEX `fileId_UNIQUE` (`fileId` ASC) VISIBLE,
  INDEX `productId_idx` (`productId` ASC) VISIBLE,
  CONSTRAINT `productId0`
    FOREIGN KEY (`productId`)
    REFERENCES `junk_shop`.`product` (`productId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;