type ContainerProps = React.PropsWithChildren<React.ComponentProps<"div">>;

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div {...props} className={`border-b border-dashed ${className ?? ""}`}>
      <div className="md:border-l md:border-r border-dashed  w-full max-w-4xl mx-auto p-6 md:py-16 md:px-32">
        {children}
      </div>
    </div>
  );
}
