--- Create table with fake data : Aaron and miriam are marriage, they have son yossi who married to rebbeca
--- David and sara are parent of ruth

Drop Table Person;

CREATE TABLE Person (
    Person_Id TEXT, 
    Personal_Name TEXT PRIMARY KEY, 
    Family_Name TEXT,
    Gender TEXT,
    Father_Id TEXT, 
    Mother_Id TEXT,
    Spouse_Id TEXT
);

INSERT INTO 
Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES
('P001', 'Yossi', 'Cohen', 'Male', 'P002', 'P003', 'P004'),
('P002', 'Aaron', 'Cohen', 'Male', NULL, NULL, NULL),
('P003', 'Miriam', 'Cohen', 'Female', NULL, NULL, 'P002'),
('P004', 'Rebecca', 'Cohen', 'Female', 'P005', 'P006', NULL),
('P005', 'David', 'Levi', 'Male', NULL, NULL, NULL),
('P006', 'Sarah', 'Levi', 'Female', NULL, NULL, 'P005'),
('P007', 'Ruth', 'Levi', 'Female', 'P005', 'P006', NULL);

--- ex1
---people are brother and sisters if they have the same paren - even just one

create or replace function connections()
returns table (
    Person_Id text,
    Relative_Id text,
    Connection_Type text
)

language plpgsql AS $$
BEGIN
    RETURN QUERY
    select P.Person_Id, P.Father_Id, 'Father'
    from Person as P
    where P.Father_Id is not NULL;

    RETURN QUERY
    select P.Person_Id, P.Mother_Id, 'Mother'
    from Person as P
    where P.Mother_Id is not NULL;

    RETURN QUERY
    select P.Father_Id, P.Person_Id, 'Son'
    from Person as P
    where Gender = 'Male'
    and P.Father_Id is not NULL;

    RETURN QUERY
    select P.Mother_Id, P.Person_Id, 'Son'
    from Person as P
    where Gender = 'Male'
    and P.Mother_Id is not NULL;

    RETURN QUERY
    select P.Father_Id, P.Person_Id, 'Daughter'
    from Person as P
    where Gender = 'Female'
    and P.Father_Id is not NULL;


    RETURN QUERY
    select P.Mother_Id, P.Person_Id, 'Daughter'
    from Person as P
    where Gender = 'Female'
    and P.Mother_Id is not NULL;

    RETURN QUERY
    select P.Person_Id, P.Spouse_Id, 'Female_Spouse'
    from Person as P
    where 'Female' = (select Gender from Person as p1 where P1.Person_Id = P.Spouse_Id);

    RETURN QUERY
    select P.Person_Id, P.Spouse_Id, 'Male_Spouse'
    from Person as P
    where 'Male' = (select Gender from Person as P1 where P1.Person_Id = P.Spouse_Id);

    RETURN QUERY
    select P1.Person_Id, P2.Person_Id, 'Brother'
    from Person as P1
    cross join Person as P2
    where (P1.Father_Id = P2.Father_Id or P1.Mother_Id = P2.Mother_Id)
    and P2.Gender = 'Male'
    and P1.Person_Id != P2.Person_Id;

    RETURN QUERY
    select P1.Person_Id, P2.Person_Id, 'Sister'
    from Person as P1
    cross join Person as P2
    where (P1.Father_Id = P2.Father_Id or P1.Mother_Id = P2.Mother_Id)
    and P2.Gender = 'Female'
    and P1.Person_Id != P2.Person_Id;


END;
$$;


--- ex2

create or replace procedure CompletionOfSpouses()
language plpgsql as $$

declare
    curSpous cursor for (select Person_Id, Spouse_Id from Person where Spouse_Id is not NULL);
    recSpous record;

BEGIN
    open curSpous;
    loop
        fetch curSpous into recSpous;
        exit when not found;
        update Person P
        set Spouse_Id = recSpous.Person_Id
        where P.Person_Id = recSpous.Spouse_Id;
    end loop;
    close curSpous;
end
$$;

select * from connections();
select * from Person;
call CompletionOfSpouses();
select * from Person
order by Person_Id;


