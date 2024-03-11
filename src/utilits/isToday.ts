interface Props {
  date: Date;
}

export const isToday = ({ date }: Props) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};
