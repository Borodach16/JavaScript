Без индексации:

SELECT * FROM data_set where name =
	(SELECT name FROM data_set WHERE count =
		(SELECT max(count) FROM `data_set`))
ORDER BY day

Запрос занял 0.0340 сек
rows 13868
filtered 10.00

С индексацией:

Запрос занял 0.0184 сек.
rows 100
filtered 100.00
Индексация по полям name и count.