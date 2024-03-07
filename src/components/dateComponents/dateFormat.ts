interface Props {
  date: Date | null;
}

export const dateFormat = ({ date }: Props) => {
  return date?.toLocaleString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
