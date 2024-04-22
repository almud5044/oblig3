CREATE TABLE tickets
(
    id          IDENTITY     NOT NULL PRIMARY KEY,
    film        VARCHAR(50)  NOT NULL,
    antall      INT          NOT NULL CHECK (antall >= 0),
    fornavn     VARCHAR(50)  NOT NULL,
    etternavn   VARCHAR(50)  NOT NULL,
    telefonnr   VARCHAR(20)  NOT NULL,
    epost       VARCHAR(100) NOT NULL
);