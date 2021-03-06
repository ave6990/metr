# Shell 
Библиотеки для выполенния метрологических расчетов и модуль shell
для удобства исользования их в repl nodejs.

## Версии

### v1.7.0
* Добавлены функции округления `round(val, precision)` до определенного порядка и 
`discrete(val, discrete_val)` - округления до определенного шага дискретизации.

### v1.6.0
* v1.3.0 gs2000.js - реализован алгоритм поиска оптимального решения.

### v1.5.3
* v1.2.0 gs2000.js добавлена дополнительная функция вычисления результата. Есть
баг: в результат вычисления ни при каких исходных данных не включается 1 коэффициент
разбавления.

### v1.5.2
* v1.1.2 Доработано визуальное оформление переключателей клапанов ГС-2000.
### v1.5.1
* v1.1.1 gs2000.html исправлена валидация формы.

### v1.5.0
* v1.1.0 gs2000.html. Добавлены проверки исходных данных, конвертация единиц
величин, сообщения об ошибках.

### v1.4.0
* Добавлена html-страница калькулятора режимов работы ГС-2000.

### v1.4.0
* Добавлен расчет режимов работы исходя из включенных клапанов.
Функции `r_calculate()` и `r_calc()`

### v1.3.1
* Исправлена индексация клапанов (индексируются с 1)

### v1.3.0
* Добавлена библиотека расчета режимов работы генератора ГС-2000.

### v1.2.1
* Пераработана структура папок проекта.

### v1.2.0
* Добавлена библиотека расчета концентраций.

### v1.1.0
* Добавлены условия микроклимата.
* Добавлен модуль `report.js`.

### v1.0.0
* Добавлен модуль shell для запуска repl nodejs в контексте метрологических 
библиотек.

### v0.2.1
* Исправлен баг с `precision`.

### v0.2.0
* Добавлен расчет ОСКО.
