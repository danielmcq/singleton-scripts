DELIMITER $$
DROP PROCEDURE IF EXISTS removeColumnFromTable $$
CREATE PROCEDURE removeColumnFromTable(
    IN pSchema VARCHAR(256),
    IN pTable VARCHAR(256),
    IN pColumn VARCHAR(256)
) BEGIN
    DECLARE s VARCHAR(1024);

    IF EXISTS(
        SELECT *
        FROM `INFORMATION_SCHEMA`.`COLUMNS`
        WHERE `COLUMN_NAME` = pColumn
            AND `TABLE_NAME` = pTable
            AND `TABLE_SCHEMA` = pSchema
    ) THEN
        SET @s = CONCAT('ALTER TABLE `',pSchema,'`.`',pTable,'` DROP COLUMN `',pColumn,'`');
        PREPARE stmt FROM @s;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END$$
DELIMITER ;
CALL removeColumnFromTable();
DROP PROCEDURE removeColumnFromTable;