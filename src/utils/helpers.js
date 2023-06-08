import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function DateHumanizerFormat(date) {
  const dateTime = new Date(date);
  return dayjs(dateTime).fromNow();
}