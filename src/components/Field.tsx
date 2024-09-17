type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Field({ title, children }: Props) {
  return (
    <div className="flex flex-column mv2">
      <label className="mb1">{title}</label>
      {children}
    </div>
  );
}
