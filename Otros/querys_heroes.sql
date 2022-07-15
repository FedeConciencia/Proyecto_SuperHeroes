use heroes;

SET SQL_SAFE_UPDATES = 0;

#Restablecer auto_incremento de columna =>
alter table heroe auto_increment = 1;

select * from heroe;

update heroe set estado = "activo" where nombre = "Sauron";

#Restablecer auto_incremento de columna =>
alter table poderes auto_increment = 1;

select * from poderes;

insert into poderes (nombre, fechaAlta, fechaBaja, estado) values ("Agilidad", "2022-06-08", "1900-01-01", "activo");

#Restablecer auto_incremento de columna =>
alter table union_heroe_poderes auto_increment = 1;

select * from union_heroe_poderes;

insert into union_heroe_poderes (idHeroe, idPoderes, fechaAlta, fechaBaja, estado) values (2, 4, "2022-06-08", "1900-01-01", "activo");

update union_heroe_poderes set idHeroe = 1, idPoderes = 2 where idUnion = 1;

#Obtener los poderes asociados al heroe =>
select p.nombre from poderes as p inner join union_heroe_poderes as u on p.idPoderes = u.idPoderes
inner join heroe as h on h.idHeroe = u.idHeroe where h.idHeroe = 1;