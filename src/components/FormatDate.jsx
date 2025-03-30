export default function FormatDate(isoDateString) {
    if (!isoDateString) return "";
    const [year, month, day] = isoDateString.split("-");
    return `${day}-${month}-${year}`;
}
