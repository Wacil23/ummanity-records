export const getSalaryByPerson = (
  totalSales: number,
  totalMetaSpend: number
) => {
  const formula = (totalSales * 0.58 - totalMetaSpend) * 0.17;
  const agencySalary = formula;
  const personSalary = formula / 3;
  const previsionalSalary = getPrevisionalSalary(personSalary);
  return { agencySalary, personSalary, previsionalSalary };
};

export const getPrevisionalSalary = (personSalary: number) => {
  const today = new Date();
  const currentDay = today.getDate();
  const totalDaysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const dailySalary = personSalary / currentDay;
  const previsionalSalary = dailySalary * totalDaysInMonth;
  return previsionalSalary;
};
