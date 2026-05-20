export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-[84px]">{children}</div>;
}
