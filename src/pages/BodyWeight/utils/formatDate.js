export default function formatDate(date) {
  return `${date.getDate()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`

}