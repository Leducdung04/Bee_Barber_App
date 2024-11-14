export const fomatsDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split("-");
    if (!year || !month || !day) return '';
    const formattedDate = `${day}/${month}`;
    return formattedDate;
  }