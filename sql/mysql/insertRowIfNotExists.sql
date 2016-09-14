# Doesn't actually work as is, but provides example of how to do this

DELIMITER $$
DROP PROCEDURE IF EXISTS insertRowIfNotExists $$
CREATE PROCEDURE insertRowIfNotExists(
    IN pSchema VARCHAR(256),
    IN pTable VARCHAR(256),
    IN pColumn1 VARCHAR(256)
    IN pColumn2 VARCHAR(256)
    IN pValue1 VARCHAR(256)
    IN pValue2 VARCHAR(256)
) BEGIN
    INSERT INTO `@pSchema`.`@pTable` (`@pColumn1`, `@pColumn2`)
    SELECT @pValue1, @pValue2
    FROM DUAL
    WHERE NOT EXISTS (
        SELECT *
        FROM `@pSchema`.`@pTable`
        WHERE `@pColumn1` = @pValue1
            AND `@pColumn2C` = @pValue2
    ) OR NOT EXISTS (
        SELECT *
        FROM `@pSchema`.`@pTable`
    )
    LIMIT 1;
END$$
DELIMITER ;
CALL insertRowIfNotExists();
DROP PROCEDURE insertRowIfNotExists;
