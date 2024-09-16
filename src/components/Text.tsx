type Props = {
  children: string;
};

const Text = ({ children }: Props) => <>{children.toUpperCase()}</>;

export default Text;
