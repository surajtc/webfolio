type ContainerProps = React.PropsWithChildren<React.ComponentProps<"div">>;

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div {...props} className={`border-b border-dashed ${className ?? ""}`}>
      <div className="border-l border-r border-dashed  w-full max-w-6xl mx-auto p-32">
        {children}
      </div>
    </div>
  );
}
