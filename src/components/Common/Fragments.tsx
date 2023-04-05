interface IProps {
  children: React.ReactNode;
}

export const CenteredText = ({ children }: IProps) => {
  return (
    <p className="font-serif text-base text-primary font-normal text-center">
      {children}
    </p>
  );
};

export const CraftedBy = () => {
  return (
    <div className="mt-auto flex justify-between items-center flex-none">
      <p className="text-xs text-secondary">
        Forked by{" "}
        <a
          href="https://dave.levine.org/"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-primary"
        >
          Dave
        </a>
      </p>
      <a
        href="https://github.com/davelevine/hckrnws"
        target="_blank"
        rel="noreferrer noopener"
        className="text-xs text-secondary hover:text-primary"
      >
        Source Code
      </a>
    </div>
  );
};
